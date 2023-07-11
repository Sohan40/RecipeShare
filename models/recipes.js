const mongoose = require('mongoose');   
const Schema = mongoose.Schema;
const Review = require('./reviews');

const imageSchema = new Schema({
    url:String,
        filename:String
})

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');

})
const recipeSchema = new Schema({
    title:String,
    images:[imageSchema],
    instructions: { type: String, required: true },
    description:String,
    ingredients:String,
    user:{
            type:Schema.Types.ObjectId,
            ref:'User'
    },
    reviews:[
       { 
            type:Schema.Types.ObjectId,
            ref:'Review'
       }
    ]
});


// Category Schema
// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now }
// });

// const Category = mongoose.model('Category', categorySchema);

// // RecipeCategory Schema (Many-to-Many Relationship)
// const recipeCategorySchema = new mongoose.Schema({
//   recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
// });

// const RecipeCategory = mongoose.model('RecipeCategory', recipeCategorySchema);


recipeSchema.post('findOneAndDelete',async(doc)=>{
    if(doc){
        await Review.deleteMany({_id:{$in : doc.reviews}});
    }
})
module.exports=mongoose.model('Recipe',recipeSchema);