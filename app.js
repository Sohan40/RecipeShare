if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const ExpError = require('./utils/ExpError');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes')

const sessionConfig = {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge : 1000*60*60*24*7
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.session());
app.use(passport.initialize());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.engine('ejs',ejsmate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))


const mongoose = require('mongoose');   

mongoose.connect('mongodb://127.0.0.1:27017/recipeShare')
.then(()=>{
    console.log("connection open");
})
.catch((err)=>{
    console.log(err);
})

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})



app.get('/',(req,res)=>{
    res.render('home');
})


app.use('/recipes',recipeRoutes);
app.use('/recipes/:id/reviews',reviewRoutes);
app.use('/',userRoutes);

app.all('*',(req,res,next)=>{
    next(new ExpError('Page Not Found'),404)
});

app.use((err,req,res,next)=>{
    const {statusCode=500} = err;
    if(!err.message) err.message = 'something went wrong';
    // console.log(err);
    res.status(statusCode).render('error',{err});
})


app.listen(3000,()=>{
    console.log("Server started on 3000");
})
