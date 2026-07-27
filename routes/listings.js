const express = require('express');
const router = express.Router({mergeParams:true}); // preserves the req.params values from the parent router
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(wrapAsync(listingController.index))   // all listing
    .post(isLoggedin, upload.single('image'),validateListing, wrapAsync(listingController.postNewListing));   //create new listing

//request for new listing 
router.get("/new", isLoggedin,  listingController.newListingForm);

router.route('/:id')
    .get( wrapAsync(listingController.showListingData))   //show listing
    .patch( isLoggedin, isOwner,upload.single('image'), validateListing, wrapAsync(listingController.patchEditedListing))  //update listing
    .delete ( isLoggedin, isOwner, wrapAsync(listingController.deleteListing));    //delete listing

//edit route request
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.listingEditForm));

module.exports = router;

/*
router.route('/path') . method() .method() -  this approach helps us define different methods for same path. 
this helps reduce code complexity and define different methods for a single path at a place
*/