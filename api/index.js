const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
var cors = require('cors');
const app = express();
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const config = require('config');

require('dotenv').config();

const allowedOrigins = [process.env.BaseURL + ':' + process.env.ClientPort];
app.use(
  cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
    exposedHeaders: ['set-cookie']
  }),
  session({
    genid: function(req) {
      const uid = uuidv4();
      console.log(uid);
      return uid;
    },
    secret: process.env.PrivateKey || 'public',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      originalMaxAge: parseInt(process.env.SESSION_MAX_AGE)
    }
  })
);
app.set('trust proxy', 1);

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}

const databaseInfo = {
    connection_prefix: process.env.MongoDB_ConPrefix,
    connection_string: process.env.MongoCS,
    database: process.env.MongoDB_Database,
    username: process.env.MongoDB_UN,
    password: process.env.MongoDB_PW
}
let creds = '';
if(databaseInfo.username && databaseInfo.password) {
  creds = `${databaseInfo.username}:${databaseInfo.password}@`;
}
const host = `${databaseInfo.connection_prefix}://${creds}${databaseInfo.connection_string}/${databaseInfo.database}`;

mongoose.connect(host, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api/users',  users);
app.use('/api/auth',  auth);

const port = process.env.ServerPort;
app.listen(port, () => console.log(`Listening on port ${port}...`));