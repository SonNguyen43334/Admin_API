const express = require("express"); 
const app = express();
const mongoose = require("mongoose") ; 
const morgan = require("morgan"); 
var bodyParser = require("body-parser"); 
const url = 'mongodb://localhost:27017/API'; 
const connected = mongoose.connect(url);
const commentRoute = require("./routes/comment");
const likeRoute = require("./routes/like");
const cartRoute = require("./routes/cart");
const searchRoute = require("./routes/search");

connected.then((db) => {
    console.log("Connected to server!");
}, (err) => {console.log(err);}); 

app.use(bodyParser.json({limit: "1000mb"})); 
app.use(morgan("common")); 

app.use("/comment", commentRoute);
app.use("/like", likeRoute);
app.use("/cart", cartRoute);
app.use("/search", searchRoute); 


app.listen(5000, () => {
    console.log("Server is running..."); 
}); 