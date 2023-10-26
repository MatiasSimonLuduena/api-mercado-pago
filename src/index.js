import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from "cors";

import payments from "./routes/payments.routes.js";

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/", payments);

app.listen(5000, () => console.log("API funcionando en puerto 5000"));