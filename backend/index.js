
var express = require("express")
const bodyParser= require ("body-parser")
var mongoose = require("mongoose")
/*app.use(bodyParser.json());
app.use(bodyParser).urlencoded({ extended: true });*/

var app=express();
mongoose.Promise = global.Promise;
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
var Schema = new mongoose.Schema({
  email: String,
  password: String
});

var User=mongoose.model("User",Schema);
app.use("/",(req,res)=>{
    res.sendFile(__dirname+"/main.html");
}).listen(3000);

console.log("Listening on port 3000");


app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});










/*

const meyda= require("meyda");

//own signal for the input 

var signal = new Array(32).fill(0).map((element, index) => {
    const remainder = index % 3;
    if (remainder === 0) {
      return 1;
    } else if (remainder === 1) {
      return 0;
    }
    return -1;
  });
//extraction of features
console.log(signal);
  console.log(meyda.extract("zcr", signal));
  
  
  */
