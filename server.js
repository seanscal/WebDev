require('dotenv').config();

var express = require('express');
var app = express();
var http = require('http');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


// install and require the mongoose library
var mongoose      = require('mongoose');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var domain = "http://localhost:3000/";
var STATURL = "http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20152016/2/NJD/iphone/playerstatsline.json"

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5200';
var db = connectionString;


 //use remote connection string
 //if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;

    var domain = "http://kevinscalabrini-webdev2016.rhcloud.com/";
}
console.log(connectionString);
// connect to the database
var db = mongoose.connect(connectionString);


var CourseSchema = new mongoose.Schema({
    title: String,
    seats: {type: Number, default: 25},
    starts: {type: Date, default: Date.now}
});

var Course = mongoose.model("Course", CourseSchema);

Course.create({title: "NEW", seats: 32},
    function(err, results){
        console.log(err);
        console.log(results);
    });



app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

require("./public/assignment3/server/app.js")(app, db);
require("./public/project/server/app.js")(app, db);

