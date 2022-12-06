const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FetchUser = require('../MiddleWare/FetchUser');




const JWT_SEC = "ramkrushna ramen naruto";

router.post('/createUser', [
    body('email', 'Enter ValidEmail Address').isEmail(),
    body('password', 'Password must be atleast 5 Characters').isLength({ min: 5 }),
    body('name', 'Enter valid Name').isLength({ min: 3 })
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success, errors: "This email address is already exist." })
        }

        const salt = await bcrypt.genSalt(10);
        secpass = await bcrypt.hash(req.body.password, salt);



        user = await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email
        });


        // const data = {
        //     user: {
        //         id: user.id
        //     }
        // };

        // const AuthToken = jwt.sign(data, JWT_SEC);
         success=true;
        // res.json({success,AuthToken });
        res.json({success});


    } catch (error) {
        res.status(500).send("Some error is Occured.")
    }

});

router.post('/login', [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'password atleast 5 charachter').isLength(5)
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: "Please try to log in with correct email credentials" })
        }

        const passwordCom = await bcrypt.compare(password, user.password);
        if (!passwordCom) {
            return res.status(400).json({ errors: "Please try to log in with correct email credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const AuthToken = jwt.sign(data, JWT_SEC);
        success=true;
        res.json({success,AuthToken });

    } catch (error) {
        res.status(500).send("Some error is Occured.");
    }
});

router.get('/getUserInfo', FetchUser, async (req, res) => {

    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        res.status(500).send("Internal server Error");
    }
})


module.exports = router