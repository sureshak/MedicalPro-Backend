const importFresh = require('import-fresh');
var auth = function(req, res, next){
    var con = importFresh('../config/index');
    console.log('inside auth');
    //console.log("reqqqqqqqqqq   ",req);
    console.log("auth token : ",req.headers.authtoken);
    con.query("select * from usersession where token = ? and is_active = 1 ", [req.headers.authtoken] ,function(err, results) {
        if (err) throw err;
        if (results.length > 0) {
            console.log("Auth successfull");
            next();
        }else{
            res.statusCode = 401;
            res.send({
                "code":401,
                "usermessage":"Authorization failure",
            });
            res.end();
            con.end();
        }
      });
}

module.exports = auth;