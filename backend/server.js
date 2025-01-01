import express from "express";
import dotenv from "dotenv";
import path from "path"; // build in node module

import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve(); // path to current directory

app.use(express.json());

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    // make the frontend folder is the static assets
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server run on port " + PORT)
})