const mongoose = require('mongoose');

const {MONGO_URI} = process.env;

exports.connect = () =>{
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connect to database")
    }).catch((err) => {
        console.log("Error connecting");
        console.log(err);
        process.exit(1);
    });

};
