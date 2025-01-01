import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // {} means all data no filter is applied
        res.status(200).json({ success: true, data: products});
    } catch (error) {
        console.log("error in fetching products : ", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) { 
        return res.status(400).json({ success: false, message: "Please provide all fields"});    
        // 400 the server would not process the request due to something the server considered to be a client error
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});    // 201 something created
    } catch (error) {
        console.log("Error in creating product : ", error.message);
        res.status(500).json({success: false, message: "Server error"});   // 500 internal server error
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const { name, price, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id"})
    }

    if (typeof price !== 'number' || isNaN(price)) {
        return res.status(400).json({ success: false, message: "Price must be a number" });
    }
    
    const product = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id"})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error"}); // server could not find a client-requested webpage
    }
}