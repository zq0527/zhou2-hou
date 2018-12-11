var express = require('express');
var router = express.Router();
var query = require('../mysql/mysql.js');
/* GET home page. */
router.get('/api/get/list', function(req, res, next) {
    var page = req.query.page;
    var page_size = req.query.page_size;
    var type = req.query.type;
    query('select count(*) from zhou2 where type = ?', [type], function(err, result) {
        var total = result[0]['count(*)'] / page_size; //总条数/每一需要加载的条数
        loadDate(total);

    })

    function loadDate(total) {

        var start = (page - 1) * page_size;

        var sqlStr = `select * from zhou2 where type = ? limit ${start},${page_size}`
        query(sqlStr, [type], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {

                res.json({ code: 1, msg: result, total: total, })
            }

        })
    }
});

module.exports = router;