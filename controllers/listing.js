const Listing = require('../models/listing.js');
const cloudinary = require('../cloudinary.js');
const fs = require('fs');
const ExpressError = require('../utils/ExpressError.js');

module.exports.index = async (req, res, next) => {
    const listings = await Listing.find({});
    res.render("index.ejs", { listings });
};

module.exports.newListingForm = (req, res) => {
    res.render('new.ejs');
};

module.exports.showListingData = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: 'author' } }).populate("owner");
    if (!listing) {
        req.flash('error', 'Listing does not exist');
        return res.redirect("/listings");
    }
    res.render("show.ejs", { listing});
};

module.exports.postNewListing = async (req, res, next) => {
    // if(!req.file){
    //     return next(new ExpressError(400, "file required"));  // this was conflicting with mongoose default logic of not uploading an image and getting a default one, 
    // } 
    // console.log(req.body);
    const newListing = new Listing({ ...req.body });
    let listingLocation = req.body.location;
    let geoapify_key = process.env.GEOAPIFY_API_KEY;
    try {
        let response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${listingLocation}&format=json&apiKey=${geoapify_key}`);
        let parsedGeocoding = await response.json();
        console.log(parsedGeocoding.results[0]);
        if(parsedGeocoding.results[0] === undefined || parsedGeocoding.results[0].rank.confidence < 0.38){
            req.flash('error', 'Use the autocomplete locations');
            return res.redirect('/listings/new');
        }
        const geoJson = { type: "Point", coordinates: [parsedGeocoding.results[0].lon, parsedGeocoding.results[0].lat]};
        newListing.geometry = {...geoJson};
    } catch (err) {
        return next(new ExpressError(400, 'Some error occurred while converting you location data into coordinates'));
    }
    if (req.file) {
        try {
            let result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'listingimage',
                allowed_formats: ['jpg', 'jpeg', 'png'],
            });
            newListing.image.url = result.secure_url;
            newListing.image.filename = result.public_id;
            await fs.promises.unlink(req.file.path);
        } catch (err) {
            return next(new ExpressError(500, 'upload failed'));
        }
    }

    newListing.owner = req.user._id;
    let l = await newListing.save();
    console.log(l);
    req.flash("success", "New listing created");
    console.log("Listed data");
    res.redirect("/listings");
};

module.exports.listingEditForm = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing does not exist');
        return res.redirect('/listings');
    }
    imageUrl = listing.image.url.replace('/upload', '/upload/c_fill,h_250,w_300/e_blur:150');
    res.render("edit.ejs", { listing , imageUrl});
};

module.exports.patchEditedListing = async (req, res, next) => {
    let { id } = req.params;
    let updateVal = {...req.body};
    if(typeof req.file !== 'undefined'){
        try {
            let result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'listingimage',
                allowed_formats: ['jpg', 'jpeg', 'png'],
            });
            updateVal.image = {url:result.secure_url, filename: result.public_id};
            await fs.promises.unlink(req.file.path);
        } catch (err) {
            return next(new ExpressError(500, 'upload failed'));
        }
    }
    await Listing.findByIdAndUpdate(id, updateVal);
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
};