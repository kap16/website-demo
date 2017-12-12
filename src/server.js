const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var configs = require('./config');

// establishes connection
var db = mysql.createConnection({
    host: configs.user.host,
    user: configs.user.username,
    password: configs.user.password,
    database: configs.user.db,
    multipleStatements: true
});

db.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log('Connected');
    }
});
var port = 4050;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('dist'));

// search for products
app.post('/search', function(req, res, next){
    function isInArray(arr, str) {
        var strArr = str.split(" ");
        for(var i in strArr){
            if(arr.indexOf(strArr[i]) > -1){
                return true;
            }
        }
        return false;
    }

    var search;
    var mysqlSyntax = ['UPDATE','SELECT','FROM','WHERE','SET',
        'INSERT INTO','CREATE DATABASE','ALTER DATABASE',
        'CREATE TABLE','ALTER TABLE','DROP TABLE','CREATE INDEX',
        'DROP INDEX']
    if(req.body.search.split('')[0].match(/^\d/)){
        search = "SELECT id,name,price FROM products WHERE id = "+req.body.search; // search by id
    }else if(isInArray(mysqlSyntax,req.body.search)){
        search = req.body.search; // search by sql input
    }else{
        search = "SELECT id,name,price FROM products WHERE name LIKE '%"+req.body.search+"%';"; // search by name
    }
    var data = {};
    db.query(search, function(err, rows) {
        var prows = []
        if(err || rows == undefined){
            data = {"products": []};
        }else{
            for(i = 0; i < rows.length; i++){
                var row = {
                    "id" : rows[i].id,
                    "name" : rows[i].name,
                    "price" : rows[i].price.toFixed(2)
                };
                prows.push(row);
            }
            data = {"products": prows};
        }
        res.send(JSON.stringify(data));
    });
});

// get all products
app.get('/getproducts', function(req, res){
    var sql = "SELECT id,name,price FROM products;";
    var data = {};
    db.query(sql, function(err, rows) {
        var prows = []
        if(err || rows == undefined){
            data = {"products": []};
        }else{
            for(i = 0; i < rows.length; i++){
                var row = {
                    "id" : rows[i].id,
                    "name" : rows[i].name,
                    "price" : rows[i].price.toFixed(2)
                };
                prows.push(row);
            }
            data = {"products": prows};
        }
        res.send(JSON.stringify(data));
    });
})

app.listen(port, function(){
    console.log('now listening for requests on port '+port+'...'); 
});