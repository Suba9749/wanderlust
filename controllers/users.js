const User=require("../models/user");

module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
 };

module.exports.signup=async(req,res)=>{
    try{
       let {username,email,password}=req.body;
       const newUser=new User({email,username});
       const registerUser=await User.register(newUser,password);
       req.login(registerUser,(err)=>{
          if(err){
             return next(err);
          }
 console.log(registerUser);
       req.flash("success","Welcome to wanderlust !");
       res.redirect("/listings");
       })
       
    }catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");
    }
 };


 module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
 };


 module.exports.logIn= async(req,res)=>{
    req.flash("success","Welcome Back to  wanderlust!");
    let redirectUrl=res.locals.redirectUrl|| "/listings";
    res.redirect(redirectUrl);
 };


 module.exports.logOut=(req,res,next)=>{
    req.logout((err)=>{
       if(err){
         return next(err);
       }
       req.flash("success","you are logged out!");
       res.redirect("/listings");
    })
 };