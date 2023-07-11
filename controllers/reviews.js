const Review = require('../models/reviews')
const Recipe = require('../models/recipes')

module.exports.createReview =async(req,res)=>{

    const recipe = await Recipe.findById(req.params.id);
    const review = new Review(req.body.review);
    review.user = req.user._id;
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
    req.flash('success','Successfully created a new review');
    res.redirect(`/recipes/${recipe._id}`)

}

module.exports.deleteReview = async(req,res)=>{
    const{id,reviewId} = req.params;
    await Recipe.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted review');
    res.redirect(`/recipes/${id}`);
}