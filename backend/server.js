import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pg from 'pg';
import { Sequelize, DataTypes} from 'sequelize';

const app = express();
const port = 4000;

const sequelize = new Sequelize('UniVerse','postgres','123',{
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

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
  }
));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(4000, () => {});