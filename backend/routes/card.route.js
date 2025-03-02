const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const cardController = require('../controller/card.controller');

router.post("/add", [
    body('cardHolder').isLength({ min: 2 }).withMessage('Card holder must be at least 2 characters long'),
    // body('expirationDate')
    //     .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/)
    //     .withMessage('Expiration date must be in MM/YY or MM/YYYY format'),
], cardController.addCardController);

module.exports = router;
