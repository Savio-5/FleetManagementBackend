const express = require('express');
const router = express.Router();
const db = require('../db/connectSqldb');

router.get('/view-order',(req, res) => {
    req.isAuthenticated();
    const customerID = req.user.id;
    const sqlSelect = "SELECT * FROM orders where customerID = ?";
    db.query(sqlSelect, [customerID], (err, result) => {
        res.json(result);
    })
})

router.post('/book-order',(req, res) => {
    req.isAuthenticated();
    const customerID = req.user.id;
    const pickupLocation = req.body.pickupLocation;
    const deliveryLocation = req.body.deliveryLocation;
    const pickupTimeFrame = req.body.pickupTimeFrame;
    const deliveryTimeFrame = req.body.deliveryTimeFrame;
    const typeOfGoods = req.body.typeOfGoods;
    const nameOfGoods = req.body.nameOfGoods;
    const status = 'pending';

    const sqlInsert = "INSERT INTO orders (customerID, pickupLocation, deliveryLocation, pickupTimeFrame, deliveryTimeFrame, typeOfGoods, nameOfGoods, statuss) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [customerID,pickupLocation, deliveryLocation, pickupTimeFrame, deliveryTimeFrame, typeOfGoods ,nameOfGoods, status], (err, result) => {
        if (err) {
            res.json({ err: err })
        }
    })
})

module.exports = router;