// npm modules
const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();

// user-defined
const routes = require("./router");

app.use(express.json());

/* 
- Incoming HTTP request.
- Middleware checks for session cookie.
- If session cookie is not there, create one (along with unique ID to identify the client).
    In the persistent session store, initialize the session for this new client.
- If session cookie is there, then look in the session store for the session data for this client and add that data to the request object.

When the matching route gets the request, it will already have an attached session data from the session store.
*/
// app.use(
//   session({
//     name: "SESSIONID",
//     secret: process.env.SESSION_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//     genid: function (req) {
//       return uuidv4(); // use UUIDs for session IDs
//     },
//   })
// );

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(routes);
app.use(express.static(path.join(__dirname, "/public")));

module.exports = app;
