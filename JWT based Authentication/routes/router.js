const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const db = require('../db/db');
const userController = require('../controller/userController');

//Sign-up
router.post('/sign-up', userController.validateRegister, (req, res) => {
    let signUpQuery = `SELEST id FROM users WHERE LOWER(username) = LOWER(${req.body.username})`;
    db.query(signUpQuery, (err, result) => {
        if(result && result.length){
            return res.status(409).json({
                message: "This username is already using"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        message: err,
                    });
                }
                else{
                    let insertQuery = `INSERT INTO users (id, username, password, registerd) VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, '${hash}', now());`;
                    db.query(insertQuery, (err, result) => {
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
router.post('/login', (req, res) => {
    let logInQuery = `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`;
    
    db.query(logInQuery, (err, result) => {
            if(err){
                return res.status(400).json({
                    message: "Username or Password incorrect"
                });
            }
            if(!result.length){
                return res.status(400).send({
                    message: "Username or Password incorrect!"
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

                        /* let updateLastLogin = `UPDATE users SET last_login = now() WHERE id = ${result[0].id};`;
                        db.query(updateLastLogin); */

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
router.get('/secret', userController.isLoggedIn, (req, res) => {
    console.log(req.userData);
    res.send("This is authentication!")
});

module.exports = router;