import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Sequelize, DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 4000;
// if any error occurs might be due to .env
const jwtkey = process.env.JWT_SECRET;
const dbowner = process.env.DB_USER;
const dbpass = process.env.DB_PASSWORD;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']; // if error  remove the part from the ?
  if (!token) {
    return res.sendStatus(403);
  }
  jwt.verify(token, jwtkey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const sequelize = new Sequelize('UniVerse', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Post = sequelize.define('Post', {
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const Comment = sequelize.define('Comment', {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'id',
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });  
Comment.belongsTo(Post, { foreignKey: 'postId' });


sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(error => {
  console.error('Database synchronization error:', error);
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Debugging log statements
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ username, email, password: hashedPassword }, jwtkey, { expiresIn: '1h' });

    const url = `http://localhost:4000/verify/${token}`;
    const passw = process.env.SERVER_MAIL_PASSWORD;
    const owner = process.env.SERVER_MAIL;
    const transporter = nodemailer.createTransport({
      smtp: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      secure: false,
      auth: {
        user: owner,
        pass: passw,
      }
    });

    const mailOptions = {
      from: 'kambleaditya946@gmail.com',
      to: email,
      subject: 'Verify your email',
      text: `Click on this link to verify your email: ${url}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email', error: error.message });
      }
      res.status(200).json({ message: 'Verification email sent' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration', error });
  }
});

app.get('/verify/:token', (req, res) => {
  const token = req.params.token;
 
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username, email, password } = decodedToken;

    User.create({ username, email, password })
      .then(() => {
        res.send('Verification successful');
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error adding user to database', error });
      });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token', error });
  }
  
});

app.post('/login', async (req, res) => {  
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ username }, jwtkey, { expiresIn: '1h' });
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'Strict', 
      maxAge: 3600000, // 1 hour in milliseconds
    });
    res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, }});
  } catch (error) { 
    res.status(500).json({ message: 'Error logging in', error });
  }   
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});


app.get('/', (req, res) => {
  res.send('Hello World');
});


app.post('/posts', async(req, res) => {
  const {userId ,title, content} = req.body;
  console.log(userId);
  console.log(title);
  console.log(content);
  if (!title || !userId || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const post = await Post.create({userId, title, content});
    // Fetch updated list of posts
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: { model: User, attributes: ['id', 'username'] }
        }
      ],
      order: [
        ['createdAt', 'ASC'],
        [{ model: Comment }, 'createdAt', 'ASC']
      ]
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
    console.log(error);
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { 
          model: Comment,
          include: { model: User, attributes: ['id', 'username'] }
        }
      ],
      order: [
        ['createdAt', 'ASC'],
        [{ model: Comment }, 'createdAt', 'ASC']
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error); // Log the error
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

app.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.user.username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});
app.post('/comments', async(req, res) => {
  const {postId, userId, body} = req.body;

  if (!postId || !userId || !body) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const comment = await Comment.create({postId, userId, body});
    const user = await User.findByPk(userId);
    res.status(201).json({
      id: comment.id,
      postId: comment.postId,
      userId: comment.userId,
      body: comment.body,
      username: user.username, 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error });
  }
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});