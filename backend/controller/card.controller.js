const cardModel  = require('../model/creditCard.model.js');
const { validationResult } = require('express-validator');
const generateCreditCard  = require('../utils/generateNumber');
const bcrypt = require('bcrypt');

module.exports.addCardController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { brand, cardHolder } = req.body;  

        const cardNumber = generateCreditCard(brand);

        const cvv = await bcrypt.hash(cardNumber.slice(-3), 10);


        const card = await cardModel.create({
            cardNumber,
            cardHolder,
            cvv
        });

        res.status(201).json({ message: "Card added successfully", card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}