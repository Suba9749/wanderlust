const express=require("express");
const router=express.Router();
const warpAsync=require("../utils/warpAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listing.js");




const multer  = require('multer')

const {storage}=require("../cloudConfig.js");


const upload = multer({ storage });



//router.Route /
router.route("/")
.get(warpAsync(listingController.index))
.post(isLoggedIn,validateListing,upload.single('listing[image]'),warpAsync(listingController.createListing)
);



//New route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//router.Route /:id
router.route("/:id")
.get(validateListing,warpAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,upload.single('listing[image]'),warpAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,warpAsync(listingController.destroyListing ));




//index route

// router.get("/",warpAsync(listingController.index));





//show route  CRUD =READ
// router.get("/:id",validateListing,warpAsync(listingController.showListing));

//create route
// router.post("/",isLoggedIn,validateListing,warpAsync(listingController.createListing)
// );

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,warpAsync(listingController.renderEditForm));

//update route

// router.put("/:id",isLoggedIn,isOwner,validateListing,warpAsync(listingController.updateListing));


//Delete route


// router.delete("listings/:id",async(req,res)=>{
//     let {id}=req.params;
//     let deletetListing=await Listing.findByIdAndDelete(id);
//     console.log(deletetListing);
//     res.redirect("/listings");
// });


// router.delete('/:id',isLoggedIn,isOwner,warpAsync(listingController.destroyListing ));

module.exports=router;
