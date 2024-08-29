const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const warpAsync=require("../utils/warpAsync.js")
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");


const reviewController=require("../controllers/reviews.js");
 


//REVIEV =POST ROUTE

router.post("/",validateReview,isLoggedIn,warpAsync(reviewController.createReview));
 
 //Delete review route
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,warpAsync(reviewController.destroyReview));

 module.exports=router;
 
 