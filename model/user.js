const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {type:String, default:null},
    email: {type: String, unique: true},
    password:{type: String},
    token: {type:String}

});

module.exports = mongoose.model("user", userSchema);
