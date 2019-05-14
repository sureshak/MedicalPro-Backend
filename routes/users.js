var express = require('express');
var router = express.Router();
var http = require('http')
var con = require('../config/index');
var mysql  = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 5
    }
 }
  res.send(user);
});

router.post('/' , function(req,res){
  console.log("req : ",req);
  var name = req.body.name;
  var sex = req.body.sex;
  var age = req.body.age;
  var slot= req.body.slot;
  var phone = req.body.phone;
  var description = req.body.description;
  var post  = {name: name, sex: sex, age: age, phone: phone, description: description ,time_slot: slot};
  console.log(post);
  // var sql = "INSERT INTO appointment (name, sex,age,phone,description,time_slot) VALUES ('"+name+"','"+sex+"',"+age+","+phone+",'"+description+"','"+slot+"')";
  // console.log(sql);
  con.query("INSERT INTO appointment SET ?", post ,function(err, result) {
    if (err) throw err;
      console.log(result);
      res.send(result);
  }); 
  con.end();
});

module.exports = router;
