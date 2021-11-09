var express = require('express');
var mongoose= require('mongoose');
mongoose.connect('mongodb+srv://Raghavaro:banana_auth@bananacluster.lfdqb.mongodb.net/banasnadb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});







/*var express = require("express")
var bodyParser= require ("body-parser")
var mongoose = require("mongoose")

const app=express();

app.get("/",(req,res)=>{
    res.send("hello from server");
}).listen(3000);

console.log("Listening on port 3000");*/































/*const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var app = express();
mongoose.connect('mongodb+srv://Raghavaro:banana_auth@bananacluster.lfdqb.mongodb.net/bananadb',{
    useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});
/*app.use(express.json());
app.use('/api/users', credentials);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*var Schema = mongoose.Schema;
var questionSchema = new Schema({
  username: String,
  password: String,
  enabled: Boolean
},{collection:'credentials'});*/


