// var mongoose = require("mongoose");
// var Room = require("./models/room");
// var Comment   = require("./models/comments");
// var User =require("./models/user");

// var data = [
//     {
// 		username: "admin",
// 		password: "admin",
// 		avatar: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
// 		firstName: "Admin",
// 		LastName: "",
// 		email: "admin@gmail.com",
// 		phoneNo: "1234567890"
//     }
// ]
// User.create(data, function(e) {
//     if (e) {
//         throw e;
//     }
// });


// module.exports = seedDB;


const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const User = require('./models/user')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        // We'll add this later
      }
    }
  ],
})

module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro);