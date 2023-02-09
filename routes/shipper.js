const express = require('express');
const router = express.Router();
const db = require('../db/connectSqldb');


router.get('/view-all-orders',(req, res) => {
    const sqlSelect = "SELECT * FROM orders where customerID order by ID asc";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    })
})

router.post('/assign-orders/:ID',(req, res) => {
    const ID = req.params.ID;
    const driverID = req.body.driverID;
    const sqlUpdate = "UPDATE orders SET driverID = ? WHERE ID = ?";
    db.query(sqlUpdate, [driverID, ID], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
    })
})

router.post('/add-agency',(req, res) => {
    const agencyID = req.body.agencyID;
    const agencyName = req.body.agencyName;
    const agencyAddress = req.body.agencyAddress;
    const agencyContact = req.body.agencyContact;
    const sqlInsert = "INSERT INTO agency (agencyID, agencyName, agencyAddress, agencyContact) VALUES (?,?,?,?)";
    db.query(sqlInsert, [agencyID, agencyName, agencyAddress, agencyContact], (err, result) => {
        if (err) {
            res.send({ err: err })
        }

        if(result){
            res.json(result)
        }
    })
})

module.exports = router;