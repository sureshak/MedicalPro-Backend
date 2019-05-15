var express = require('express');
var router = express.Router();
var http = require('http')
var con = require('../config/index');
const importFresh = require('import-fresh');
var mysql  = require('mysql'); 

/*logout API*/
router.get('/', function(req, res, next) {
    var token = [req.headers.authtoken];
    console.log("token : ",token);
	if (token) {
        var con = importFresh('../config/index');
        con.query("Update usersession SET is_active=0 where token = ?", token ,function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send({
                "code":200,
                "usermessage":"logout successfull"
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

module.exports = router;