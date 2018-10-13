//
// Necessary Installs
//
// npm install express
// npm install express-validator
// npm install express-session
// npm install express  -messages
// npm install nodemon
// npm install body-parser
// npm install ejs
// npm install passport
// npm install mongodb
// npm install mongoose
// npm install bcryptjs
// npm install moment
// npm install bootstrap@3
// npm install lodash
// npm install nodemailer
// npm install express-fileupload
// npm install shelljs
// npm install multer
// npm install connect-busboy
// npm install fs
// npm npm install popper.js
// npm install tooltip.js
// npm install url
// npm install jquery
//

var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var moment = require('moment');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var busboy = require('connect-busboy');
var url = require('url');
var jquery = require('jquery');

var routes = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');
var login = require('./routes/login');
var logout = require('./routes/logout');
var dash = require('./routes/dashboard');
var forms = require('./routes/display-forms');
var restricted = require('./routes/restricted');
var updateStatus = require('./routes/update-status');
var updateApplication = require('./routes/update-application');
var resetPassword = require('./routes/reset-password');
var updatePassword = require('./routes/update-password');
var updateFirstName = require('./routes/update-first-name');
var updateMemorableWord = require('./routes/update-memorable-word');
var updateLastName = require('./routes/update-last-name');
var updateKnownAs = require('./routes/update-known-as');
var updateUserType = require('./routes/update-user-type');
var addComment = require('./routes/add-comment');
var addFile = require('./routes/add-file');
var markAsVisited = require('./routes/mark-as-visited');
var adminAction = require('./routes/admin-action');
var createNewForm = require('./routes/create-form');
var updateForm = require('./routes/update-form');
var newApplication = require('./routes/new-application');
var viewApplication = require('./routes/view-application');
var updateAForm = require('./routes/update-a-form');

var app = express();
app.locals.moment = moment;

app.set('view engine', 'ejs');
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 12 * 60 * 60 * 1000 // 12 hours
}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true}
    ));

app.use(fileUpload());
app.use(busboy());
app.use(bodyParser.json());

app.use('/', express.static('public'));
app.use('/', routes);
app.use('/restricted', restricted);
app.use('/create-account', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/dashboard', dash);
app.use('/forms', forms);
app.use('/profile', profile);
app.use('/update-status', updateStatus);
app.use('/reset-password', resetPassword);
app.use('/update-password', updatePassword);
app.use('/update-first-name', updateFirstName);
app.use('/update-last-name', updateLastName);
app.use('/update-memorable-word', updateMemorableWord);
app.use('/update-known-as', updateKnownAs);
app.use('/update-user-type', updateUserType);
app.use('/add-file', addFile);
app.use('/mark-as-visited', markAsVisited);
app.use('/admin-action', adminAction);
app.use('/add-comment', addComment);
app.use('/create-form', createNewForm);
app.use('/update-form', updateForm);
app.use('/new-application', newApplication);
app.use('/view-application', viewApplication);
app.use('/update-application', updateApplication);
app.use('/update-a-form', updateAForm);



//
// Configs
//
var port = 3000;
var localhost = "178.62.8.45";
app.listen(port, localhost);


app.use(function(req, res, next){
    res.status(404);
    var admin;
    var login;
    if(req.session.user){
        login = true;
        admin = req.session.user.admin;
    } else {
        login = false;
        admin = false;
    }
    // respond with html page
    if (req.accepts('html')) {
        res.render('404', {title: "Page Not Found", page_name:"404", url: req.url, admin: admin, login: login});
        return;
    }
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});