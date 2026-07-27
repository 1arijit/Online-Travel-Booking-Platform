const express = require('express');
const router = express.Router({mergeParams:true}); // preserves the req.params values from the parent router
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin} = require("../middleware.js");
const geoapifyControls = require("../controllers/map.js");

router.get("/autocomplete/location" , isLoggedin, wrapAsync(geoapifyControls.autocompleteLocationData));
router.get("/geocode", isLoggedin, wrapAsync(geoapifyControls.geocode));
// use router .route only when there is more than one request types to same url othewise use the request tyype directly
module.exports = router;