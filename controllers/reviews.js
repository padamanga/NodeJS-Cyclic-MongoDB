const Campground = require("../models/campground");
const Review = require("../models/review");


module.exports.createReview = async (req, res)=>
{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);

    //campground.reviews.shift();         // Remove first review

    review.author = req.user._id;       // Current authenticated User ID
    campground.reviews.push(review);    // Display a new review
    await review.save();                // Save the current review
    await campground.save();
    req.flash('success', 'Created a new review');
    res.redirect(`/campgrounds/${campground._id}`);
};


module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted a review');
    res.redirect(`/campgrounds/${id}`);
};