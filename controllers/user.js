const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("../users/signup.ejs");
};

module.exports.postSignupForm = async(req,res, next)=>{
    try{
        let { username, password, email } = req.body;
        let newUser = new User({ email: email, username: username });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to airbnb");
            return res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = async (req, res) => {
    res.render("../users/login.ejs");
};

module.exports.loginUser = async (req, res)=>{
    req.flash("success", `${req.user.username} logged in`);
    let redirectUrl = res.locals.redirectUrl || "listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", `User logged out`);
        res.redirect("/listings");
    });
};