const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 


exports.createUser = ("/signup", (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    User.findOne({ email: email }).then(savedUser => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exists" });
        }

        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });

            user.save().then(user => {
                res.json({ message: "User registered successfully" });
            }).catch(err => {
                console.error(err);
                res.status(500).json({ error: "Failed to register user" });
            });
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    });
});

exports.signinUser = ("/signin", (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please provide email and password" });
    }

    User.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email or password" });
        }

        bcrypt.compare(password, savedUser.password).then(doMatch => {
            if (doMatch) {
                const token = jwt.sign({ _id: savedUser._id }, "Jshdhe3akjf9");
                const { _id, name, email } = savedUser;
                res.json({ token, user: { _id, name, email } });
            } else {
                return res.status(422).json({ error: "Invalid email or password" });
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    });
});


