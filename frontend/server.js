var express = require('express'),
    path = require('path'),
    app = express();
    //console.log(path.join(__dirname, 'signup.html'))
    var mongoose = require("mongoose")



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



    app.use('/', express.static(path.join(__dirname, '')))
    app.use('/signup', express.static(path.join(__dirname, 'signup.html')))
    app.use('/main', express.static(path.join(__dirname, 'main.html')))
    app.post("/addname", (req, res) => {
        var myData = new User(req.body);
        console.log(myData);
        myData.save()
          .then(item => {
            res.send("item saved to database");
          })
          .catch(err => {
            res.status(400).send("unable to save to database");
          });
      });
      

app.listen(8080);