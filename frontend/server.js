var express = require('express'),
    path = require('path'),
    app = express();
    var bodyParser = require('body-parser')

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
});
var User=mongoose.model("User",Schema);



    app.use('/', express.static(path.join(__dirname, '')))
    app.use('/signup', express.static(path.join(__dirname, 'signup.html')))
    app.use('/main', express.static(path.join(__dirname, 'main.html')))
    app.post("/addname", urlencodedParser,(req, res) => {
      console.log({
        name: req.body.name,
        password: req.body.pwd
      });

        var myData = new User({
          name: req.body.name,
          password: req.body.pwd
        });
        //console.log(myData);
        myData.save()
          .then(item => {
            res.send("item saved to database");
          })
          .catch(err => {
            res.status(400).send("unable to save to database");
          });
      });
      

app.listen(8080);