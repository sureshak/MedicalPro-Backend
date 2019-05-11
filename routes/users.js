var express = require('express');
var router = express.Router();

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

module.exports = router;
