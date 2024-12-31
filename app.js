const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");
const shopRoutes = require("./routes/shop.routes");


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");


app.use("/api", blogRoutes);
app.use("/api", userRoutes);
app.use("/api", shopRoutes);


module.exports = app;
