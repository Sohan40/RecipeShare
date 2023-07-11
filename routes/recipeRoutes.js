const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');

const recipes  = require('../controllers/recipes');

const {isLoggedIn} = require('../middleware');
const {isOwner} = require('../middleware');
const {validateRecipe} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});


router.get('/',catchAsync(recipes.index))

router.get('/new',isLoggedIn,recipes.renderForm)

router.post('/',isLoggedIn,upload.array('image'),validateRecipe,catchAsync(recipes.createRecipe))

router.get('/:id',catchAsync(recipes.showRecipe))

router.get('/:id/edit',isLoggedIn,isOwner,catchAsync(recipes.editForm))

router.put('/:id',isLoggedIn,isOwner,upload.array('image'),validateRecipe,catchAsync(recipes.editRecipe))

router.delete('/:id',isLoggedIn,isOwner,catchAsync(recipes.deleteRecipe))


module.exports =router;