import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import pdf from "html-pdf";
import pdfTemplate from "./documents/index.js";
import path from 'path';
import dotenv from "dotenv";


// const pdf = require('html-pdf');
// const pdfTemplate = require('./documents');
const __dirname = path.resolve();
dotenv.config();

import userRoutes from "./routes/users.js";
import productsRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";

const app = express();

// common middleware to add data limit and cross origin
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//middleware for posts routes
app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);

//mongoDB Atlas
const CONNECTION_URL=process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

// useNewUrlParser and useUnifiedTopology are used to prevent warnings in browser console.
mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server connected to Database. Running on ${PORT}`)
        )
    )
    .catch((e) => console.log(e));

app.post("/create-pdf", (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
        if (err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get("/fetch-pdf", (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
});

//default settings that the creator asked to avoid warnings in the console.
// mongoose.set("useFindAndModify", false);
