const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

// Set values for the server's address. 0 allows the server to connect to a random port therefore avoiding conflicts
//  the port has been set in package.json as 55000
const PORT = process.env.PORT || 0;
const HOST = '0.0.0.0';

// Cool trick for when promises or other complex callstack things are crashing & breaking: Such as unhandled rejection
void process.on('unhandledRejection', (reason, p) => {
    console.log(`Things got pretty major here! Big error:\n`+ p);
    console.log(`That error happened because of:\n` + reason);
});

// Configure server security, based on documentation outlined here:
// https://www.npmjs.com/package/helmet
// TLDR: Very niche things from older days of the web can still be used to hack APIs
// but we can block most things with these settings.
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));

// Configure API data receiving & sending
// Assume we always receive and send JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Configure CORS, add domains to the origin array as needed.
// This is basically where you need to know what your ReactJS app is hosted on.
// eg. React app at localhost:3000 and deployedApp.com can communicate to this API, 
// but a React app at localhost:3001 or SomeRandomWebsite.com can NOT communicate to this API. 
var corsOptions = {
    origin: ["http://localhost:3000", "https://deployedApp.com"],
    // default success status 200
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


require('dotenv').config();

// to check the above command is running - console.log('Firebase project id is: ' + process.env.FIREBASE_ADMIN_PROJECT_ID)

// initialise firebase below
const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
    // we create a credential during the runtime of the application. The object is a credential
    credential: firebaseAdmin.credential.cert({
        "projectId": process.env.FIREBASE_ADMIN_PROJECT_ID,
        "privateKey": process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "clientEmail": process.env.FIREBASE_ADMIN_CLIENT_EMAIL
    })
});

// ________________________________________________________________
// config above
// routes below (where app is exported)


// Actual server behaviour
// request and response
app.get('/', (req, res) => {
    console.log('ExpressJS API homepage received a request.');
  
    // if there is an environment variable then use that (process.env.NODE_ENV ) other wise use the or option
    const target = process.env.NODE_ENV || 'not yet set';
    res.json({
        'message':`Hello ${target} world!`
    });

});

const importedBlogRouting = require('./Blogs/BlogsRoutes');
app.use('/blogs', importedBlogRouting);



// Notice that we're not calling app.listen() anywhere in here.
// This file contains just the setup/config of the server,
// so that the server can be used more-simply for things like Jest testing.
// Because everything is bundled into app, 
// we can export that and a few other important variables.
module.exports = {
    app, PORT, HOST
}