cors=require('cors');
const fs = require('fs');
const shell = require('shelljs')
var express = require('express'),
    path = require('path'),
    app = express();
    app.use(cors());
    var bodyParser = require('body-parser');
const { callback } = require('meyda');
const ejs = require('ejs');
app.set('view engine', 'ejs');
    //console.log(path.join(__dirname, 'signup.html'))
    var mongoose = require("mongoose")
    var jsonParser = bodyParser.json()

    var urlencodedParser = bodyParser.urlencoded({ extended: false })


    mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Raghavaro:banana_auth@bananacluster.lfdqb.mongodb.net/bananadb?retryWrites=true&w=majority', {
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
  name: String,
  password: String,
  key: String
});
var User=mongoose.model("User",Schema);
app.post('/adminpanelauthenticated',(req,res)=>{
  User.find({}, function(err, users){
    res.render('adminP',{
      credentialslist:users
    })
  })
})

  app.post('/pleaserun',(req,res)=>{
    
    shell.exec("cd /Users/ritwikgoel/Downloads && pwd && mv audio.wav ~/Documents/Projects/banana-auth/frontend")
    //shell.exec("pwd")
    //shell.exec()
    shell.exec("meyda audio.wav zcr rms energy > outputtt.txt");

    
    fs.readFile('outputtt.txt', 'utf8' , (err, data) => {
      if (err) {
    console.error(err)
    return
  }
  //console.log(data) 
  //data is here 
  //console.log(data.indexOf('Average zcr: '));
  //console.log(data.indexOf('Average zcr: '));  // Expected output: 9
  //console.log(data.substring(data.indexOf('Average zcr: ')+13,data.indexOf('Average zcr: ')+18))
  //console.log(data.substring(data.indexOf('Average rms: ')+13,data.indexOf('Average rms: ')+20))
  //console.log(data.substring(data.indexOf('Average energy: ')+16,data.indexOf('Average energy: ')+23))
  let keyValue=0.65*data.substring(data.indexOf('Average zcr: ')+13,data.indexOf('Average zcr: ')+18)+ 0.30*data.substring(data.indexOf('Average rms: ')+13,data.indexOf('Average rms: ')+20)+ 0.05*data.substring(data.indexOf('Average energy: ')+16,data.indexOf('Average energy: ')+23);
  //console.log(keyValue)
  res.send({ key: keyValue });

})

  })


    app.use('/', express.static(path.join(__dirname, '')))
    app.use('/signup', express.static(path.join(__dirname, 'signup.html')))
    app.use('/main', express.static(path.join(__dirname, 'main.html')))
    app.post("/addname", urlencodedParser,(req, res) => {
      const callback = (RESULT) => {
        if(RESULT){
          res.sendFile(__dirname+"/success.html");
          // res.send(RESULT);
        }
        else{
          res.sendFile(__dirname+"/fail.html");

        }
      }
      var name = req.body.name;
      var password = req.body.pwd;
      var key=req.body.keyfinal;
      //console.log(name);
      //console.log(password);
      //console.log(key);//this is a string 
      //we have to convert it to double 
      //then convert data.key to double 
      //then compare 
      //then it should run 

      User.findOne({name},(err,data)=>{
        if(err || !data){
          return callback(false);
        }
        var keyfloat=parseFloat(data.key);
        var datafloat=parseFloat(key);

        //console.log(typeof(data))
        //console.log(keyfloat)

        //console.log(datafloat)
        let racekeyfloat=keyfloat+(0.15*keyfloat);
        let racekeyfloatminus=keyfloat-(0.20*keyfloat);
        console.log("from frontend"+datafloat)
        console.log(racekeyfloat)
        console.log(racekeyfloatminus)

        if(data.password==password && (racekeyfloatminus<=datafloat && datafloat<=racekeyfloat)){
          //res.send("success")
          //console.log("Is this workingn")
          return callback(true);
        }
        else{
          console.log("Login failed")
          return callback(false);
        }
      });
    });
    app.post("/signing", urlencodedParser,(req, res) => {
      var name = req.body.name;
      var password1 = req.body.pwd;
      var password2 = req.body.pwd2;
      var key=req.body.keyfinal;
      console.log(name);
      console.log(password1);
      console.log(key)
      var myData = new User({
        name: req.body.name,
        password: req.body.pwd,
        key: req.body.keyfinal
      });
      if(password1==password2){
        myData.save()
          .then(item => {
            res.send("item saved to database");
          })
          .catch(err => {
            res.status(400).send("unable to save to database");
          });
      }
      else{
        alert("Passwords not matching");
      }
    });
      

app.listen(8080);