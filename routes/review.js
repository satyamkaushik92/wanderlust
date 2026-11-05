const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
//const review = require("../models/review.js");
//const listing = require("../models/listing.js");
const { isloggedIn,validateReview,isReviewAuthor} = require("../middleware.js");

const reviewController=require("../controllers/reviews.js");




router.post(
  "/",
  isloggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete review route
router.delete("/:reviewId",isloggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview)
);

module.exports=router;