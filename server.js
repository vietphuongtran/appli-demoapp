const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const path = require('path')
//const PORT = 4000;

var jobappsRouter = require('./routes/routes_jobapp.js');
var contactsRouter = require('./routes/routes_contact.js');
var networkingRouter = require('./routes/routes_networking.js');
var dataVizRouter = require('./routes/routes_dataviz.js');
var forumRouter = require('./routes/routes_forum.js');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//switch the two lines below to use the local db
//mongoose.connect('mongodb://127.0.0.1:27017/appli-job-app-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://testCRUD:tj2zwWvHXMnacgGv@cluster0-njbj6.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log("Error finding MongoDB connection: " + err));
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})
//--------passport for jwt ---------//
const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);



// Insert a router which is attached to a url pass (first param), router (second param)
// all the routes that are configured to the jobapp router, are relative to our base routes /jobapps

// ---------- Susan's Routers ---------- //
app.use('/appli-job-app-tracker', contactsRouter);
app.use('/appli-job-app-tracker', jobappsRouter);
app.use('/appli-job-app-tracker', networkingRouter);
app.use('/appli-job-app-tracker', dataVizRouter);

// ---------- Ossy's Routers -----------//
const userRouter = require('./routes/routes_user');
app.use('/appli-job-app-tracker', userRouter);
// -------- Paul's Routers ----------//
app.use('/appli-job-app-tracker', forumRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

