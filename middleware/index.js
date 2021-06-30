var Room=require("../models/room")
var Comment=require("../models/comments")

var middlewareObj={};

middlewareObj.roomLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        Room.findById(req.params.id,function(err,foundRoom){
        if(err || !foundRoom){
            req.flash("error","Room Not Found")
            res.redirect("back")
        }
        else{
            if(foundRoom.author.id.equals(req.user._id) || req.user.isAdmin){
                next()
            }
            else{
                req.flash("error","You Didn't Have That Permission To Do That")
                res.redirect("back")
            }
        }
    })}
    else{
        req.flash("error","Get ready to be Logged In")
        res.redirect("back")
    }
}

middlewareObj.commentLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.idd,function(err,foundComment){
        if(err || !foundComment){
            req.flash("error","Comment Not found")
            res.redirect("back")
        }
        else{
            if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                next()
            }
            else{
                req.flash("error","You Didn't Have That Permission To Do That")
                res.redirect("back")
            }
        }
    })}
    else{
        req.flash("error","You Need To Be Logged In")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error","You must be logged in first")
    res.redirect("/login")
}


module.exports=middlewareObj;
