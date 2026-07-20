const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedin, isAuthor} = require("../middleware.js");
const reviewController = require('../controllers/review.js');

//post review
router.post("/",isLoggedin, validateReview, wrapAsync(reviewController.postReview));

//destroy review 
router.delete("/:reviewid", isLoggedin,isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;