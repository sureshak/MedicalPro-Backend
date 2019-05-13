var express = require('express');
var router = express.Router();
var http = require('http')
var mysql = require('../config');

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
  var name = req.body.name;
  var sex = req.body.sex;
  var age = req.body.age;
  var slot= req.body.slot;
  var phone = req.body.phone;
  var description = req.body.description;
console.log("name : "+name+" sex : "+sex+" age : "+age+" phone : "+phone+" description : "+description);
con.connect();
var post  = {name: name, sex: sex, age: age, phone: phone, description: description ,time_slot: slot};
con.query('INSERT INTO appointment VALUES ?', post, function(err, result) {
  if (err) throw err;
     console.log(result);
     res.send(result);
  }); 
})

module.exports = router;
