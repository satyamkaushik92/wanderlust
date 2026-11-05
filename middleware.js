const listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema} = require("./schema.js");
const {  reviewSchema } = require("./schema.js");
//const Review = require("./models/review.js"); // Ensure Review is imported

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  // Check if review exists
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  // Check ownership
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
module.exports.isloggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
       req.session.redirectUrl=req.originalUrl;
       req.flash("error","you must be logged in to create listings");
       return res.redirect("/login");
  } 
  next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const find = await listing.findById(id);

  if (!find) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  // Check ownership
  if (!find.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not owner ");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};

const Review = require("./models/review"); // Ensure Review is imported

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  // Check if review exists
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  // Check ownership
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};