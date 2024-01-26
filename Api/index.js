const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require ("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const serviceRoute = require("./routes/services");

dotenv.config();
//Connect database
mongoose.connect(process.env.MONGODB_URL)
    .then(() =>{
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

app.use("/v1/services", serviceRoute);

app.listen(8000, ()=> {
    console.log("Server is running...");
});

process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    }
});