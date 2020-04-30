var express=require("express");
var router=express.Router({mergeParams: true});
var Campground=require("../models/campground");
var Comment=require("../models/comments")
var middlewareObj=require("../middleware")

router.get("/new", middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            req.flash("error","Comment Not Find")
            console.log(err)
        }else{
          res.render("comments/new",{campground: campground})  
        }
    })
})
router.post("/", middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully Added Comment")
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

router.get("/:idd/edit", middlewareObj.commentLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground Not found")
            res.redirect("back")
        }else{
            Comment.findById(req.params.idd,function(err,comment){
                res.render("comments/edit",{campground: req.params.id,comment:comment})
            })
        }
    })
    
})

router.put("/:idd",middlewareObj.commentLoggedIn,function(req,res){
    Comment.findByIdAndUpdate(req.params.idd,req.body.comment,function(err,updatedComment){
        req.flash("success","Successfully Updated Comment")
        res.redirect("/campgrounds/" + req.params.id )
    })
})

router.delete("/:idd",middlewareObj.commentLoggedIn,function(req,res){
    Comment.findByIdAndRemove(req.params.idd,function(err){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            req.flash("success","Successfuly Deleted Comment")
                res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

module.exports=router;