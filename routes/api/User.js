const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require("../../models/User");

router.post("/register", (req, res) => {

    User.findOne({ email: req.body.email }).then((user) => {

        if (user) {
            res.status(400).json({ error: 'Email already exist' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });


            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save().then((createdUser) => {
                        res.json(createdUser);
                    }).catch((err) => {
                        res.send(err);
                    });
                });
            });



        }

    }).catch((err) => {
        res.send(err);
    });

});


router.post("/login", (req, res) => {

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(400).json({ error: 'User or Password is incorrect' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        res.status(200).json({ success: 'Login successful' });
                    } else {
                        res.status(400).json({ error: 'User or Password is incorrect' });
                    }
                })
                .catch((err) => {
                    res.send(err);
                });
        }).catch((err) => {
            res.send(err);
        });

});

module.exports = router;