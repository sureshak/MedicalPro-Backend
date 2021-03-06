var express = require('express');
var router = express.Router();
var http = require('http');
const importFresh = require('import-fresh');
var mysql  = require('mysql');
var auth = require('../config/auth');

router.use(auth);

/* GET users listing. */
router.get('/', function(req, res, next) {
  var con = importFresh('../config/index');
  con.query("select * from appointment",function(err, result) {
    if (err) throw err;
      console.log(result);
      res.send(result);
  }); 
  con.end();
});

router.post('/' , function(req,res){
  console.log("req : ",req.body);
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
  var con = importFresh('../config/index');
  con.query("INSERT INTO appointment SET ?", post ,function(err, result) {
    if (err){
      console.log(err);
      res.send({
        "code":400,
        "usermessage":"Error while booking your appointment"
      });
    };
      console.log(result);
      res.send({
        "code":200,
        "usermessage":"You have successfully booked your appointment"
      }); 
  }); 
  con.end();
});

module.exports = router;
