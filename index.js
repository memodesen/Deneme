const express = require("express");
const session = require('express-session');
const app = express();
const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(session({
    secret: 'your secret key', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000
    }
}));
app.use(userRoutes);
app.use("/admin", adminRoutes);
app.listen(3000, function() {
    console.log("Listening");
});
