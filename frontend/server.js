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
  console.log(data.indexOf('Average zcr: '));
  console.log(data.indexOf('Average zcr: '));  // Expected output: 9
  console.log(data.substring(data.indexOf('Average zcr: ')+13,data.indexOf('Average zcr: ')+18))
  console.log(data.substring(data.indexOf('Average rms: ')+13,data.indexOf('Average rms: ')+20))
  console.log(data.substring(data.indexOf('Average energy: ')+16,data.indexOf('Average energy: ')+23))
  let keyValue=0.65*data.substring(data.indexOf('Average zcr: ')+13,data.indexOf('Average zcr: ')+18)+ 0.30*data.substring(data.indexOf('Average rms: ')+13,data.indexOf('Average rms: ')+20)+ 0.05*data.substring(data.indexOf('Average energy: ')+16,data.indexOf('Average energy: ')+23);
  console.log(keyValue)
  res.send({ key: keyValue });

})

  })


    app.use('/', express.static(path.join(__dirname, '')))
    app.use('/signup', express.static(path.join(__dirname, 'signup.html')))
    app.use('/main', express.static(path.join(__dirname, 'main.html')))
    app.post("/addname", urlencodedParser,(req, res) => {
      const callback = (RESULT) => {
        if(RESULT){
          res.sendFile(__dirname+"/voice.html");
          // res.send(RESULT);
        }
      }
      var name = req.body.name;
      var password = req.body.pwd;
      var key=req.body.finalvalue;
      console.log(name);
      console.log(password);
      console.log(key);
      User.findOne({name},(err,data)=>{
        if(err || !data){
          return callback(false);
        }
        if(data.password==password && data.key==key){
          //res.send("success")
          return callback(true);
        }
        else{
          alert("Login failed")
          return callback(false);
        }
      });


      // console.log({
      //   name: req.body.name,
      //   password: req.body.pwd
      // });

        // var myData = new User({
        //   name: req.body.name,
        //   password: req.body.pwd
        // });
      //   //console.log(myData);
      //   myData.save()
      //     .then(item => {
      //       res.send("item saved to database");
      //     })
      //     .catch(err => {
      //       res.status(400).send("unable to save to database");
      //     });
    });
    app.post("/signing", urlencodedParser,(req, res) => {
      var name = req.body.name;
      var password1 = req.body.pwd;
      var password2 = req.body.pwd2;
      var key= req.body.finalvalue;
      console.log(name);
      console.log(password1);
      console.log(key)
      var myData = new User({
        name: req.body.name,
        password: req.body.pwd,
        key: req.body.finalvalue
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