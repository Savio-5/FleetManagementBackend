const express = require('express');
const router = express.Router();
const db = require('../db/connectSqldb');

router.post('/manage-truckers',(req, res) => {
    
})

router.post('/register', (req, res) => {
    const agencyID = req.body.agencyID;
    const sqlInsert = "INSERT INTO agency (agencyID, cid) VALUES (?,?)";
    db.query(sqlInsert, [agencyID, cid], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
    })
})

router.post('/add-driver', (req, res) => {
    const cid = req.body.cid;
    const driverID = req.body.driverID;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const sqlInsert = "INSERT INTO drivers (cid, driverID, name, email, phone) VALUES (?,?,?,?)";
    db.query(sqlInsert, [cid, driverID, name, email, phone], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
        // if(result){
        //     res.json(result)
        // }
    })
})

module.exports = router;