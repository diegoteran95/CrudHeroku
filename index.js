var express = require("express");
var mongo=require('mongodb');
var bodyParser = require("body-parser");
var app=express();
app.use(bodyParser.json());

var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/cliente',function(req,res){
    var jsonObj;  
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("heroku");        
        dbo.collection("cliente").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if(result.length>0){
            res.status(200).send(result);
        }else{
            res.status(404).send();
        }
        db.close();
        });
      });
});

app.put('/cliente',function(req,res){
    var jsonObj=req.body;//Obtencion del objeto JSON
    console.log(jsonObj);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("heroku");        
        dbo.collection("cliente").insertOne(jsonObj, function(err, result) {
        if (err) throw err;
        if(err){
            res.status(500).send();
        }else{
            res.status(200).send();
        }
        db.close();
        });
      });
});

app.delete('/cliente/:cod',function(req,res){
    var code=req.params.cod;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("heroku");        
        dbo.collection("cliente").deleteOne({secuencia:code}, function(err, result) {
        if (err) throw err;
        if(err){
            res.status(500).send();
        }else{
            res.status(200).send();
        }
        db.close();
        });
      });
});

app.listen(4000);
console.log("Server started...");