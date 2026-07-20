const Review = require("../models/review.js");
const Listing = require('../models/listing.js');
module.exports.postReview = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let review = new Review(req.body);
    review.author = req.user._id;
    await review.save();
    listing.reviews.push(review._id);
    await listing.save();
    req.flash("success", "Review added");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res, next) => {
    let { id, reviewid } = req.params;
    await Review.findByIdAndDelete(reviewid);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } }, { new: true });
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
};
