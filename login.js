var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hasnain:hasnain@ds249415.mlab.com:49415/webtech";

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('Users/HP/web'));
app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
MongoClient.connect(url, function(err, db) {
db.collection('signup').findOne({ Username: req.body.f}, function(err, user) {
        console.log(req.body.f);
        console.log(user.Password);
        // In case the user not found   
        if(err) {
          console.log('THIS IS ERROR RESPONSE')
          res.json(err)
        } 
        if (user.Password === req.body.g){
          console.log('User and password is correct')
          res.json({data: "You are successfully logged in .....Please go back and click on home."});
          
          
        } if (user.Username!=req.body.f||user.Password!=req.body.g)  {
          console.log("Credencials wrong");
          res.json({data: "Login invalid"});
        }              
 });
   });
});

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})