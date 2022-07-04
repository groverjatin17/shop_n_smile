import express from "express";
import mongoose from "mongoose";

import Users from "../models/userModel.js";

const router = express.Router();

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await Users.findOne({ userEmail: email }).exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { userName, userEmail, password, role, userId } = req.body;

    const newUser = new Users({ userName, userEmail, password, role, userId });

    try {
        await newUser.save();
        res.status(201).json(newUser);
        // res.status(409).json({ message: error.message });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export default router;
