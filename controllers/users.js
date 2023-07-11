const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('users/register');
}

module.exports.userRegister = async(req,res)=>{
    try{
        
        const {email,username,password} = req.body;

        const user = new User({email,username});

        const regUser = await User.register(user,password);
        req.login(regUser,err=>{
            if(err) return next(err);
            req.flash('success','welcome to Yelp Camp');
            res.redirect('/recipes')
         })
    
    }
    catch(e){
    req.flash('error',e.message);
    res.redirect('/register')
    }

}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login')
}

module.exports.userLogin = (req,res)=>{
    req.flash('success','welcome back!!');
    const redirectUrl = res.locals.returnTo || '/recipes';
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res)=>{
    req.logOut((e)=>{
        if(e) return next(e);
        req.flash('success','logged out!');
        res.redirect('/recipes');
    });
    
}