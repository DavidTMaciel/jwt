const express = require('express')
require('dotenv').config();
require("./config/database").connect();
const User = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const app = express();

app.use(express.json());


app.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!(name && email && password)){
            res.status(404).send("All input is required");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
          });
        
        const token = jwt.sign(
            {user_id: user.id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        user.token = token;

        res.status(200).json(user)
    }catch(err){
        
        console.log(err);
    }
});
app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({
                user_id: user._id, email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            })
        };

        user.token = token;

        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
});
module.exports = app;