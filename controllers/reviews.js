const review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const find = await listing.findById(id);
    const newReview = new review(req.body.review);
    newReview.author = req.user._id;

    find.reviews.push(newReview);
    await newReview.save();
    await find.save();
    req.flash("success","new review created");


    res.redirect(`/listings/${id}`);
  }

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted");

  res.redirect(`/listings/${id}`);
};  