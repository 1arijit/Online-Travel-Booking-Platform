const Listing = require("./models/listing");
const Review = require("./models/review.js");
const {listingSchema, reviewSchema, signupSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedin = (req,res,next) => {
    if (!req.isAuthenticated()) {   // checks if the stored user details is loggedin or not in the session
        req.session.requestedUrl = req.originalUrl;
        req.flash("error", "You have to login first");
        return res.redirect('/login');
    }
    return next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    res.locals.redirectUrl = req.session.requestedUrl;
    return next();
}

module.exports.isOwner = async (req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("error", "You don't have permission to delete the listing");
        return res.redirect(`/listings/${id}`);
    }
    return next();
}

module.exports.isAuthor = async (req,res, next)=>{
    let {id,reviewid} = req.params;
    let review = await Review.findById(reviewid);
    if(!review.author.equals(req.user._id)){
        req.flash("error", "You don't have permission to delete the review");
        return res.redirect(`/listings/${id}`);
    }
    return next();
}

// middleware to validate listing with Joi
module.exports.validateListing = (req, res, next) => {
    console.log(req.body);
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


//middleware to validate review posting with Joi
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//middleware for validation of signup credential
module.exports.validateSignup = (req, res, next)=>{
    let {error} = signupSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        return next();
    }
}