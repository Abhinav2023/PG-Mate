var express=require("express");
var router=express.Router({mergeParams: true});
var Room=require("../models/room");
var Comment=require("../models/comments")
var middlewareObj=require("../middleware")

router.get("/new", middlewareObj.isLoggedIn,function(req,res){
    Room.findById(req.params.id, function(err,room){
        if(err){
            req.flash("error","Comment Not Find")
            console.log(err)
        }else{
          res.render("comments/new",{room: room})  
        }
    })
})
router.post("/", middlewareObj.isLoggedIn,function(req,res){
    Room.findById(req.params.id, function(err, room){
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
                    room.comments.push(comment);
                    room.save();
                    req.flash("success","Successfully Added Comment")
                    res.redirect("/rooms/" + room._id)
                }
            })
        }
    })
})

router.get("/:idd/edit", middlewareObj.commentLoggedIn,function(req,res){
    Room.findById(req.params.id, function(err,foundRoom){
        if(err || !foundRoom){
            req.flash("error","Room Not found")
            res.redirect("back")
        }else{
            Comment.findById(req.params.idd,function(err,comment){
                res.render("comments/edit",{room: req.params.id,comment:comment})
            })
        }
    })
    
})

router.put("/:idd",middlewareObj.commentLoggedIn,function(req,res){
    Comment.findByIdAndUpdate(req.params.idd,req.body.comment,function(err,updatedComment){
        req.flash("success","Successfully Updated Comment")
        res.redirect("/rooms/" + req.params.id )
    })
})

router.delete("/:idd",middlewareObj.commentLoggedIn,function(req,res){
    Comment.findByIdAndRemove(req.params.idd,function(err){
        if(err){
            res.redirect("/rooms")
        }
        else{
            req.flash("success","Successfuly Deleted Comment")
                res.redirect("/rooms/" + req.params.id)
        }
    })
})

module.exports=router;