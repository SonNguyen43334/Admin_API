const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const complainRoute = require("./routes/complain");
const managementRoute = require("./routes/management");

const app = express();

// CONNECT DATABASE
mongoose.connect("mongodb://localhost:27017/artwork_sdn")
     .then(()=> {
        console.log("Connected to MongoDB");

        app.listen(3000, () =>{
            console.log("Server is running");
        });
     })
     .catch(error => {
        console.error("Error connecting to MongoDB", error)
     });

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

app.use("/v1/complain", complainRoute);
app.use("/v1/management", managementRoute);

