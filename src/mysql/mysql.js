//链接数据库的链接池
var mysql = require('mysql');
var pool = mysql.createPool({
    user: 'root',
    password: 'root',
    database: '1609b',
    port: 3306
})
module.exports = function(sql, arr, ck) {

    pool.getConnection(function(err, con) {

        if (err) {
            return ck && ck(err)
        }
        con.query(sql, arr, function(err, result, file) {

            if (err) {
                return ck && ck(err)
            }
            ck & ck(null, result, file);
            con.release();

        })

    })

}