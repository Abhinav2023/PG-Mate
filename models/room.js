var mongoose=require("mongoose")
var roomSchema=new mongoose.Schema({
    name: String,
    price: String,
	address: String,
    image: String,
	type: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    author:{
      id: {
          type: mongoose.Schema.Types.ObjectId,
            ref: "User"
      },
      username:String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

module.exports=mongoose.model("Room", roomSchema);