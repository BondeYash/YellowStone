import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from '../backend/db/db.js';
import userRoute from '../backend/routes/user.route.js';
import projectRoute from '../backend/routes/project.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

dotenv.config();


app.use(cookieParser());

app.use(cors())

// ✅ Connect to database
connectDB();

// ✅ Middleware to parse incoming JSON
app.use(express.json());

// ✅ Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ✅ Logger middleware (morgan)
app.use(morgan('dev'));

// ✅ Register all routes
app.use('/api/users', userRoute);
app.use('/api/projects', projectRoute);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
