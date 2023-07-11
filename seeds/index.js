const mongoose = require('mongoose');
const {recipes}=require('./seedhelpers');
const Recipe = require('../models/recipes.js');
const User = require('../models/user.js');

mongoose.connect('mongodb://127.0.0.1:27017/recipeShare')
.then(()=>{
    console.log("connection open");
})
.catch((err)=>{
    console.log(err);
})

const sample=(array)=>array[Math.floor(Math.random()*array.length)];

const users = [
    {
      username: "John Doe",
      email: "johndoe@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Jane Smith",
      email: "janesmith@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "David Johnson",
      email: "davidjohnson@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Sarah Wilson",
      email: "sarahwilson@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Michael Brown",
      email: "michaelbrown@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Emily Davis",
      email: "emilydavis@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Christopher Martinez",
      email: "christophermartinez@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Jennifer Thompson",
      email: "jenniferthompson@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Daniel White",
      email: "danielwhite@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Jessica Lee",
      email: "jessicalee@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Matthew Harris",
      email: "matthewharris@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Olivia Clark",
      email: "oliviaclark@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Andrew Lewis",
      email: "andrewwlewis@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Ava Turner",
      email: "avaturner@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "William Walker",
      email: "williamwalker@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Sophia Green",
      email: "sophiagreen@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Joseph Adams",
      email: "josephadams@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Chloe Evans",
      email: "chloeevans@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Christopher Mitchell",
      email: "christophermitchell@example.com",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      username: "Mia Turner",
      email: "miaturner@example.com",
      created_at: new Date(),
      updated_at: new Date()
    }
  ];


async function assignUserIdsToRecipes() {
    try {
      const users = await User.find(); // Fetch the first 15 users
      const recipes = await Recipe.find().limit(20); // Fetch the first 20 recipes
  
      for (let i = 0; i < recipes.length; i++) {
        const randomUserIndex = Math.floor(Math.random() * users.length); // Get a random index within the users array
        const randomUser = users[randomUserIndex]; // Get a random user
  
        recipes[i].user = randomUser._id; // Assign the user's _id to the recipe's user field
        await recipes[i].save(); // Save the modified recipe
      }

      mongoose.disconnect(); // Disconnect from MongoDB
    } catch (error) {
      console.error('Error assigning user ids to recipes:', error);
    }
  }
  

assignUserIdsToRecipes().then(()=>{
    mongoose.connection.close();
})

// const seedDb = async()=>{
//         await User.deleteMany({});
//         await User.insertMany(users);
// }

// seedDb().then(()=>{
//     mongoose.connection.close();
// })