var express = require('express');
var router = express.Router();
var http = require('http')
var con = require('../config/index');
var mysql  = require('mysql');
var cryptoRandomString = require('crypto-random-string');

/*login API*/
router.post('/', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		con.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            console.log("******** result **********",results);
            if (results.length > 0) {
				//req.session.loggedin = true;
                //req.session.username = username;
                var token=cryptoRandomString({length: 10});
                console.log(token);
                var post  = {token: token, user_id: results[0].user_id};
                con.query("INSERT INTO usersession SET ?", post ,function(err, result) {
                    if (err) throw err;
                      console.log(result);
                      res.send({
                        "code":200,
                        "usermessage":"login successfull",
                        "token":token
                    });
                    con.end();
                    res.end();
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