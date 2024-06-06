import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Sequelize, DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const app = express();
const port = 4000;

const sequelize = new Sequelize('UniVerse', 'postgres', '123', {
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

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(error => {
  console.error('Database synchronization error:', error);
});

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
    const token = jwt.sign({ username, email, password: hashedPassword }, 'my$3cr3tK3y@123!', { expiresIn: '1h' });

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
      from: 'kambleadity946@gmail.com',
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
    const decodedToken = jwt.verify(token, 'my$3cr3tK3y@123!');
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


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
