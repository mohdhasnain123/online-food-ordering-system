var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hasnain:hasnain@ds249415.mlab.com:49415/webtech";

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('Users/HP/web'));
app.get('/abc.html', function (req, res) {
   res.sendFile( __dirname + "/" + "abc.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   MongoClient.connect(url, function(err, db) {
	
  if (err) throw err;
  var myobj = { FirstName:req.body.firstname , LastName: req.body.lastname,Subject:req.body.subject };
  db.collection("contact").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
   response ={ FirstName:req.body.firstname , LastName: req.body.lastname,Subject:req.body.subject };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})