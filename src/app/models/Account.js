const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    name: { type: String },
    role: { type: String, required: true },
    avatar: { type: String },
    category: { type: Array }
});

module.exports = mongoose.model('Account', Account);