if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const port = 8080;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const ExpressError = require('./utils/ExpressError.js');
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

main().then(res=>{console.log("connected to database");}).catch(err=>{console.log(err);});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "/views/listings"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(session({
    secret:"secretcode",
    resave:false,
    saveUninitialized:true,
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
app.use("/",userRouter);
app.get('/autocomplete/location',async (req, res, next)=>{
    let map_api_key = `${process.env.GEOAPIFY_API_KEY}`;
    let {text} = req.query;
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&lang=en&limit=3&format=json&apiKey=${map_api_key}`);
    const data = await response.json();
    res.json(data);
});
app.get('/geoapify/geocode',async(req, res, next)=>{
    let map_api_key = `${process.env.GEOAPIFY_API_KEY}`;// bad request problem with invalid text needs to be taken care of here
    let {text} = req.query;
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${text}&lang=en&limit=1&format=json&apiKey=${map_api_key}`);
    const data = await response.json();
    res.json(data);
})
 
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