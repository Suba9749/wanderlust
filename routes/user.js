const express=require("express");
const router=express.Router();
const warpAsync=require("../utils/warpAsync.js");
const User=require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");


//User Router alls
 
router.get("/signup",userController.renderSignup);

router.post("/signup",warpAsync(userController.signup));

router.get("/login",userController.renderLoginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.logIn);

router.get("/logout",userController.logOut);

module.exports=router;