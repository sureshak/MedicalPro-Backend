var express = require('express');
var router = express.Router();
var http = require('http')
var con = require('../config/index');
const importFresh = require('import-fresh');
var mysql  = require('mysql');
var cryptoRandomString = require('crypto-random-string');

/*login API*/
router.post('/', function(req, res) {
  console.log("request body : ",req.body);
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
    var con = importFresh('../config/index');
		con.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            console.log("******** result **********",results);
            if (results.length > 0) {
				//req.session.loggedin = true;
                //req.session.username = username;
                var userid=[results[0].user_id];
                var con = importFresh('../config/index');
                con.query("Update usersession SET is_active=0 where user_id = ?", userid ,function(err, result) {
                    if (err) {
                      console.log(err);
                      res.send({
                        "code":400,
                        "usermessage":"user session error"
                      });
                    }else{
                      console.log(result);
                      var token=cryptoRandomString({length: 10});
                      console.log(token);
                      var post  = {token: token, user_id: results[0].user_id};
                      var con = importFresh('../config/index');
                      con.query("INSERT INTO usersession SET ?", post ,function(err, result) {
                          if (err){
                            console.log(err);
                            res.send({
                              "code":400,
                              "usermessage":"login failure"
                          });
                          }else{
                            console.log(result);
                            res.send({
                              "code":200,
                              "usermessage":"login successfull",
                              "token":token
                            });
                          }
                          con.end();
                          res.end();
                        });  
                    }    
                  });   


                  
			} else {
				res.send({
                    "code":400,
                    "usermessage":"login failure"
                });
                con.end();
                res.end();
			}
		});
	} else {
        res.send({
            "code":400,
            "usermessage":"enter username/password"
        });
        con.end();
		res.end();
	}
});

module.exports = router;