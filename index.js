var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var port = 3000;
var app = express();

app.use(session({secret:'un secreto'}));
app.use(passport.initialize());//initialize functions on the passport
app.use(passport.session());//we want to store data on our session

//create a constructor
passport.use(new FacebookStrategy({
  clientID: '1222478871213759',
  clientSecret:'83753f83aa64ba561c6ff435a95d100b',
  callbackURL:'http://localhost:3000/auth/facebook/callback'
},//above AUTHENTICATE WITH FACEBOOK
function(token, refreshToken, profile, cb){
  User.findOnCreate({facebookId:profile.id},function ( err, user ){
    //this is where you can start references your USER table
    done(null,profile);
    //return cb( err, user );
  });
}
));

app.get('/auth/facebook',passport.authenticate('facebook'));

app.get('/auth/facebook/callback',passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/auth/facebook'
}));

app.listen(port, function(){
  console.log('listening on port: ',port);
});
