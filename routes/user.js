const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedin, validateSignup } = require("../middleware.js");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require('../controllers/user.js');
const listingController = require('../controllers/listing.js');


router.get("/" , listingController.index );

router.get("/signup", userController.renderSignupForm );

router.post("/signup",validateSignup, wrapAsync(userController.postSignupForm));

router.get("/login" , userController.renderLoginForm);

router.post('/login', saveRedirectUrl, passport.authenticate('local',{failureFlash:true, failureRedirect:"/login"} ), wrapAsync(userController.loginUser));
 // passport uses an authenticate() function that which is a middleware to authenticate requests like login

router.get("/logout",isLoggedin, userController.logoutUser);

module.exports = router;