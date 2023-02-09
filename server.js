const express = require('express');
const app = express();
require('dotenv').config()

const session = require('express-session');
const passport = require('passport');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
//app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', require('./routes/auth'))
app.use('/shipper', require('./routes/shipper'))
app.use('/agency', require('./routes/agency'))
app.use('/booking', require('./routes/book'))
app.use('/truckingCompany', require('./routes/truckingCompany'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})