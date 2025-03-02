const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/user.controller");

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerController);

router.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginController);

module.exports = router; 