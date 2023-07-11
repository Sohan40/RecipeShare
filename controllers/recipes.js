const Recipe = require('../models/recipes')
const {cloudinary} = require('../cloudinary')
module.exports.index = async(req,res)=>{
    const recipes = await Recipe.find({});
    res.render('recipes/index',{recipes});
}

module.exports.renderForm = (req,res)=>{
    res.render('recipes/new');
}

module.exports.createRecipe = async(req,res,next)=>{
    
    const recipe = new Recipe(req.body.recipe);
    recipe.images = req.files.map(f=>({url:f.path,filename:f.filename}))
    recipe.user = req.user._id;
    // console.log(recipe)
    await recipe.save();
    req.flash('success','Successfully made a new recipe');
    res.redirect(`/recipes/${recipe._id}`);
}

module.exports.showRecipe = async(req,res)=>{
    const {id} = req.params;
    const recipe = await Recipe.findById(id).populate({
        path:'reviews',
        populate:{
            path:'user'
        }
    }).populate('user');
    // console.log(recipe);
    if(!recipe) {
        req.flash('error','recipe not found')
        return res.redirect('/recipes');
    }
    res.render('recipes/show',{recipe});
}


module.exports.editForm=async(req,res)=>{
    const {id} = req.params;
    
    const recipe = await Recipe.findById(id);
    if(!recipe) {
        req.flash('error','recipe not found')
        return res.redirect('/recipes');
    }
  
    res.render('recipes/edit',{recipe});
}

module.exports.editRecipe = async(req,res)=>{
    
    const {id} = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id,{...req.body.recipe});
    console.log(recipe)
    if(!recipe) {
        req.flash('error','recipe not found')
        return res.redirect('/recipes');
    }
    
    const imgs = req.files.map(f=>({url:f.path, filename:f.filename}))
    recipe.images.push(...imgs);
    await recipe.save();

    if(req.body.deleteImg){
        for(let filename of req.body.deleteImg){
            await cloudinary.uploader.destroy(filename);
        }
        await recipe.updateOne({$pull : {images: {filename:{$in:req.body.deleteImg}}}})
    }
    req.flash('success','Successfully updated recipe');
    res.redirect(`/recipes/${recipe._id}`);
}

module.exports.deleteRecipe = async(req,res)=>{
    const {id} = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    if(!recipe) {
        req.flash('error','recipe not found')
        return res.redirect('/recipes');
    }
    req.flash('success','Successfully deleted recipe');
    res.redirect(`/recipes`);
}