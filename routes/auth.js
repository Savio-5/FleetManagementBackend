const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../db/connectSqldb');

passport.use(
  "local",
  new LocalStrategy(function (username, password, done) {
    db.query(
      "SELECT username,hashed_password FROM users WHERE username = ?",
      [username],
      function (err, row) {
        if (err) {
          return done(err);
        }
        if (!row.length) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
        if (!bcrypt.compareSync(password, row[0].hashed_password.toString("utf8"))) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
        return done(null, row[0]);
      }
    );
  })
);

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


const router = express.Router();

router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


router.post("/signup", passport.authenticate("local-signup", {
  successReturnToOrRedirect: "/login",
  failureRedirect: "/signup",
})
);

passport.use(
  "local-signup",
  new LocalStrategy(
    function (username, password, done) {
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        function (err, rows) {
          if (err) return done(err);
          if (rows.length) {
            return done(null, false, {
              message: "That username is already taken.",
            });
          } else {
            const salt = 8;
            const newUserMysql = {
              username: username,
              password: bcrypt.hashSync(password, salt)
            };

            db.query(
              "INSERT INTO users ( username, hashed_password, salt) values (?,?,?)",
              [newUserMysql.username, newUserMysql.password, salt],
              function (err, rows) {
                newUserMysql.id = rows.insertId;
                return done(null, newUserMysql);
              }
            );
          }
        }
      );
    }
  )
);

module.exports = router;