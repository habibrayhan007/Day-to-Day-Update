const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('../db/db');

const controller = require('../controller/userController');
const userController = require('../controller/userController');

//Sign-up
router.post('/sign-up', controller.validateRegister, (req, res, next) => {
    db.query(
        `SELEST id FROM users WHERE LOWER(username) = LOWER(${req.body.username})`, 
        (err, result) => {
        if(result && result.length){
            return res.status(409).json({
                message: "This username is already using"
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        message: err,
                    });
                }
                else{
                    db.query(
                        `INSERT INTO users (id, username, password, registerd) VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, '${hash}', now());`, 
                        (err, result) => {
                        if(!err){
                            return res.status(200).json({message: "Student Registerd"});
                        }
                        else{
                            return res.status(500).json(err);
                        }
                    });
                }
            });
        }
    });
});


//login
router.post('/login', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            if(err){
                return res.status(400).json({
                    message: "Username or Password incorrect"
                });
            }
            bcrypt.compare(req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    if(bErr){
                        return res.status(400).json({
                            message:"username or password incorrect"
                        });
                    }
                    if(bResult){
                        const tocken = jwt.sign(
                            {
                                username: result[0].username,
                                userid: result[0].id
                            },
                            "SECRETKEY",
                            {expiresIn: "7d"}
                        );
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = ${result[0].id};`
                        );
                        return res.status(200).json({
                            message: "LoggedIn", tocken, user: result[0]
                        });
                    }
                    return res.status(400).json({
                        message: "username or password incorrect!"
                    });
                });
        }
    );
});

//authetication
router.get('/secret', userController.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send("This is authentication!")
});

module.exports = router;