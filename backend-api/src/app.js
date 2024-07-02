import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './route/authRoutes.js';
import loanRoutes from './route/loanRoutes.js';


dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(cors());


// Routes
app.use('/auth', authRoutes);
app.use('/loans', loanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});