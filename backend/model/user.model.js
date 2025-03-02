const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        minlength: [ 2, 'Full name must be at least 2 characters long' ],
    },
    email : {
        type: String,
        required: true,
        unique: true,
        minlength: [ 3, 'Email must be at least 3 characters long' ],
    },
    password : {
        type: String,
        required : true,
        select: false
    }
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.generateAuthToken =  async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (enteredPassword) { 
    return await bcrypt.compare(enteredPassword, this.password); 
};

const userModel = mongoose.model('user', userSchema);


module.exports = userModel;