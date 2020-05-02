var express=require("express");
var router=express.Router();
var Room=require("../models/room");
var middlewareObj=require("../middleware")

const escapeRegex = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

router.get("/", (req, res) => {
  let noMatch = null;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Room.find({address: regex}, function(err, allRooms) {
      if (err) { console.log(err); }
      else {
        if (allRooms.length < 1) {
          noMatch = "No rooms found, please try again.";
        }
        res.render("rooms/index", { rooms: allRooms, page: "rooms", noMatch: noMatch });  
      }
    });
  } else {
    // Get all camgrounds from DB
    Room.find({}, function(err, allRooms) {
      if (err) { console.log(err); }
      else {
        res.render("rooms/index", { rooms: allRooms, page: "rooms", noMatch: noMatch });  
      }
    }); 
  }
});

router.post("/",middlewareObj.isLoggedIn, function(req, res){
    // get data from form and add to rooms array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
	var address=req.body.address;
    var desc= req.body.description;
	var type= req.body.type;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var newRoom = {name: name,price: price,address: address, image: image, description: desc,author: author, type: type}
    
    Room.create(newRoom, function(err, newlyCreated){
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
   res.render("rooms/new"); 
});

router.get("/:id",function(req,res){
    Room.findById(req.params.id).populate("comments").exec(function(err, foundRoom){
        if(err || !foundRoom){
            req.flash("error","Room not found")
            res.redirect("back")
        }
        else{
            res.render("rooms/show",{room: foundRoom});
        }
    })
})

router.get("/:id/edit",middlewareObj.roomLoggedIn,function(req,res){
    Room.findById(req.params.id,function(err,foundRoom){
        res.render("rooms/edit",{room:foundRoom});
    })
})

router.put("/:id",middlewareObj.roomLoggedIn,function(req,res){
    Room.findByIdAndUpdate(req.params.id,req.body.room,function(err,updateRoom){
        if(err){
            console.log(err)
        }else{
            req.flash("success","Room Successfully Updated")
            res.redirect("/rooms/" + req.params.id)
        }
    })
})

router.delete("/:id/",middlewareObj.roomLoggedIn,function(req,res){
    Room.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/rooms")
        }else{
            req.flash("success","Room Successfully Deleted")
            res.redirect("/rooms")
        }
    })
})
module.exports=router;