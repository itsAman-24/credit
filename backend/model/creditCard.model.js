const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const creditCardSchema = new mongoose.Schema({
    cardNumber : {
        type : String,
        required : true,
        minlength: [ 10, 'Card number must be at least 10 characters long' ],
    },
    cardHolder : {
        type: String,
        required: true,
        minlength: [ 2, 'Card holder must be at least 2 characters long' ],
    },
    cvv: {
        type: String,
        required: true,
        minlength: [ 3, 'CVV must be at least 3 characters long' ],
    },
});
   
const creditCardModel = mongoose.model('creditCard', creditCardSchema);

module.exports = creditCardModel;
