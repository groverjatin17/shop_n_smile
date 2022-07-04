import express from "express";
import mongoose from "mongoose";

import Orders from "../models/orderModel.js";

const router = express.Router();

export const allOrders = async (req, res) => {

    try {
        const allOrders = await Orders.find({}).exec();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    const { customerId } = req.query;

    try {
        const orders = await Orders.find({ customerId: customerId }).exec();
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createOrder = async (req, res) => {
    console.log("Creating Order");
    const {
        orderId,
        address1,
        address2,
        billingAddress1,
        billingAddress2,
        billingCountry,
        billingName,
        billingProvince,
        billingZip,
        cardNumber,
        country,
        cvv,
        email,
        expirationMonth,
        expirationYear,
        name,
        nameOnCard,
        phone,
        province,
        sameShipping,
        zip,
        products,
        customerId,
    } = req.body;

    const newOrder = new Orders({
        orderId,
        address1,
        address2,
        billingAddress1,
        billingAddress2,
        billingCountry,
        billingName,
        billingProvince,
        billingZip,
        cardNumber,
        country,
        cvv,
        email,
        expirationMonth,
        expirationYear,
        name,
        nameOnCard,
        phone,
        province,
        sameShipping,
        zip,
        products,
        customerId,
    });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
        // res.status(409).json({ message: error.message });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export default router;
