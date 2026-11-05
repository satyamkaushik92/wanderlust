const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const listing = require("../models/listing.js");
//const {isloggedIn}=require("../middleware.js");
const { isloggedIn, isOwner,validateListing} = require("../middleware.js");

const {storage}= require("../cloudConfig.js");

const multer  = require('multer')
const upload = multer({ storage })
 const listingController=require("../controllers/listings.js");
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isloggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingController.createListing));



// New route
router
.route("/new")
.get(isloggedIn,listingController.renderNewForm);



router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isloggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isloggedIn,isOwner,wrapAsync(listingController.deleteListing));




// Edit route (यहाँ से validateListing हटा दिया गया है क्योंकि GET रिक्वेस्ट में body नहीं होती)
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);




module.exports = router;