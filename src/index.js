import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from 'mongoose';

// routes imports
import payments from "./routes/payments.routes.js";

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB funcionando correctamente');
})
.catch((error) => {
    console.error('Error al conectar con MongoDB:', error);
});

// routes
app.use("/", payments);

app.listen(5000, () => console.log("API funcionando en puerto 5000"));