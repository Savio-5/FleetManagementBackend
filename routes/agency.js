const express = require('express');
const router = express.Router();
const db = require('../db/connectSqldb');

router.get('/view-agency',(req, res) => {
    const sqlSelect = "SELECT * FROM agency";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    })
})





module.exports = router;