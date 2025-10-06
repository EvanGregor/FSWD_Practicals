const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/tuitionDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/", studentRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
