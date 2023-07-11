const Recipe = require("./models/recipes");
const Review = require("./models/reviews");
const ExpError = require('./utils/ExpError')
const {recipeSchema,reviewSchema} = require('./schemas');

module.exports.validateReview=(req,res,next)=>{

    const {error} = reviewSchema.validate(req.body);
    if(error){
        console.log('error'+error);
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpError(msg,400);
    }
    else
   { next();}
}

module.exports.isLoggedIn = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','You must be logged in')
        return res.redirect('/login')
    }
    next();

}

module.exports.storeReturnTo = (req,res,next)=>{

    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


module.exports.isOwner = async(req,res,next)=>{
    const{id} = req.params;
    const recipe = await Recipe.findById(id);
    if(!recipe.user.equals(req.user._id)){
        req.flash('error','You donot have permission')
       return res.redirect(`/reviews/${id}`)
    }
    next();
}

module.exports.validateRecipe = (req,res,next)=>{
    console.log(req.body.recipe);
    const {error} = recipeSchema.validate(req.body);

    if(error){
        console.log('error undi ra ep')
        console.log(error);
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpError(msg,400);
    }
    else
   { next();}
    
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    const{id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.user.equals(req.user._id)){
        req.flash('error','you donot have permission');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}