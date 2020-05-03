# PG-Mate


> A Node.js web application project developed by JaiHindCoders Team in Software Development Project in Semester IV.

## Live Demo

To see the app in action, go to [https://pg-mate.herokuapp.com//](https://pg-mate.herokuapp.com/)

## Features

* Authentication:
  
  * User login with username and password

  * Admin sign-up with admin code

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

  * Admin can manage all posts and comments
  
  * Admin can also manage all the users and can delete any user.

* Manage room posts with basic functionalities:

  * Create, edit and delete posts and comments.

  * Upload room photos.

  * Add room location details.
  
  * Search existing rooms.

* Manage user account with basic functionalities:

  * Password reset via email confirmation

  * Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Responsive web design

### Custom Enhancements

* Update room photos when editing rooms

* Update personal information on profile page

* Improve image load time on the landing page using Cloudinary

* Use Helmet to strengthen security.
 
## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine.For this has to be run you must have nodejs enviornment setup already and also for database we are using MongoDB so, you must have to install mongoDB setup.


### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

### Other Pre-Setup to run code

* For this you have to setup some enviornment varibles as :-

 PORT - 3000(you can use any)
 
 DBURL- your mongoDB url or mongo Atlas's cluster url
 
 GMAILID- Your GmailId for automatically sending email to user when forgot password is used.
 
 GMAILPWD- Your Gmail Password.
 
 ADMINCODE- Admin Code for Admin SignUp.
 
 * After this, run
 
 ```sh
node app.js       Or       nodemon app.js
```
 
### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [helmet](https://helmetjs.github.io/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [nodemailer](https://nodemailer.com/about/)
* [moment](https://momentjs.com/)
* [cloudinary](https://cloudinary.com/)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)
* [adminBro](https://adminbro.com/)
### Platforms

* [Cloudinary](https://cloudinary.com/)
* [Goorm IDE](https://ide.goorm.io/)
* [Heroku](https://www.heroku.com/)