// if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
// }
const port = 8080;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const flash = require("connect-flash");
const passport = require("passport");
const ExpressError = require('./utils/ExpressError.js');
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const mapRouter = require("./routes/map.js");

const dbURL = process.env.MONGODB_URI;

main().then(res=>{console.log("connected to database");}).catch(err=>{console.log(err);});
async function main(){
    await mongoose.connect(dbURL);
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "/views/listings"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(session({
    store: MongoStore.create({
        mongoUrl: dbURL,
        touchAfter: 24 * 3600,
        autoRemove: 'native'
    }),
    secret: process.env.SESSION_SECRET || "keyboard car",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); //This middleware tells Passport to use persistent login sessions. so that user does not have to login every reload
passport.use(new LocalStrategy(User.authenticate())); // tells to use authentication for user
passport.serializeUser(User.serializeUser()); // serializes user in session(adds that user is authenticated in the session) so that user does not have to authenticate again and again in one session
passport.deserializeUser(User.deserializeUser()); // deserializes user


app.get("/",(req, res)=>{
    res.send("You are connected to the server");
});

//flash
app.use((req, res, next)=>{
    res.locals.success = req.flash("success");  //flash will always contain an empty array so that no error occur while compiling ejs
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/geoapify", mapRouter);
app.use("/", userRouter);
app.use((req, res, next)=>{
    return next(new ExpressError(404, "page not found"));
});

// error handling middleware
app.use((err,req, res, next)=>{
    let {status=500, message= "There is an error"} = err;
    res.status(status).render("error.ejs",{err});
});

app.listen(port, () => {
    console.log("server listening at port 8080");
}); 