var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hasnain:hasnain@ds249415.mlab.com:49415/webtech";

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('Users/HP/web'));
app.get('/signup.html', function (req, res) {
   res.sendFile( __dirname + "/" + "signup.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   MongoClient.connect(url, function(err, db) {
	
  if (err) throw err;
  var myobj = { Username:req.body.f , Password: req.body.g , Fullname:req.body.ff , Email:req.body.email,Mobile_No:req.body.n,Address:req.body.address };
  db.collection("signup").insertOne(myobj, function(err, result) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });

})
   response ={ Username:req.body.f , Password: req.body.g , Fullname:req.body.ff , Email:req.body.email,Mobile_No:req.body.n,Address:req.body.address};
   console.log(response);
   res.json({data: "You are successfully signed up"});
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})