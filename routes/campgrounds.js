var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middlewareObj=require("../middleware")

router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

router.post("/",middlewareObj.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc= req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name,price: price, image: image, description: desc,author: author}
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success","Room Successfully Added")
            res.redirect("/rooms");
        }
    })
});

router.get("/new",middlewareObj.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error","Room not found")
            res.redirect("back")
        }
        else{
            res.render("campgrounds/show",{campground: foundCampground});
        }
    })
})

router.get("/:id/edit",middlewareObj.campgroundLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
    })
})

router.put("/:id",middlewareObj.campgroundLoggedIn,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
        if(err){
            console.log(err)
        }else{
            req.flash("success","Room Successfully Updated")
            res.redirect("/rooms/" + req.params.id)
        }
    })
})

router.delete("/:id/",middlewareObj.campgroundLoggedIn,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/rooms")
        }else{
            req.flash("success","Room Successfully Deleted")
            res.redirect("/rooms")
        }
    })
})
module.exports=router;