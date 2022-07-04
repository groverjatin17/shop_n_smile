import express from "express";
import Products from "../models/productModel.js";

const router = express.Router();

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const createProduct = async (req, res) => {
    const products = await Products.find();
    const productId = products.length + 1;
    const { category, name, img, price, originPrice, discountPrice, discountPercentage, isProductNew, isHot, star, isFreeShipping, inStock, soldBy, description, link } = req.body;

    const newProduct = new Products({ productId, category, name, img, price, originPrice, discountPrice, discountPercentage, isProductNew, isHot, star, isFreeShipping, inStock, soldBy, description, link });

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateProducts = async (req, res) => {
    const { productId, quantity } = req.body;
    const filter = { productId: productId };
    const update = {$inc : {'remainingInventory' : quantity}};

    try {
        let doc = await Products.findOneAndUpdate(filter, update, {
            new: true,
        });
        res.status(200).json(doc);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateInventory = async (req, res) => {
    const { productId, quantity } = req.body;
    const filter = { productId: productId };
    const update = {'remainingInventory' : quantity};

    try {
        let doc = await Products.findOneAndUpdate(filter, update, {
            new: true,
        });
        res.status(200).json(doc);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export default router;
