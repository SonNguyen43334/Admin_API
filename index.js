const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const artworkRoute = require("./routes/artwork");
const authenRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");

const port = 5678;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

//Route
app.use("/v1/user", userRoute);
app.use("/v1/artwork", artworkRoute);
app.use("/v1/auth", authenRoute);
mongoose
  .connect("mongodb://localhost:27017/SND_Ass")
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
