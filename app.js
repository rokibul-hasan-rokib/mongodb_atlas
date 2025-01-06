const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");
const shopRoutes = require("./routes/shop.routes");
const settingRoutes = require("./routes/setting.routes");


app.use(express.json());
app.use(bodyParser.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");
 

app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', layout: 'app' })
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page', layout: 'app' })
});


app.use("/api", blogRoutes);
app.use("/api", userRoutes);
app.use("/api", shopRoutes);
app.use("/api", settingRoutes);



module.exports = app;
