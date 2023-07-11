const Joi = require('joi');


module.exports.recipeSchema = Joi.object({
    recipe:Joi.object({
        title: Joi.string().required(),
        ingredients: Joi.string().required(),
        description: Joi.string().required(),
        instructions: Joi.string().required()
    }).required(),
    deleteImg:Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        body: Joi.string().required(),
        rating:Joi.number().required().min(0).max(5)
    }).required()
})