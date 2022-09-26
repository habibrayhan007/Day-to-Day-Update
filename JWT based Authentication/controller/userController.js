const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        //username length minimum 3
        if(!req.body.username || req.body.username.length < 3){
            return res.status(400).send({
                message: 'Please enter username with minimum 3 charecter'
            });
        }

        //password length minimum 6
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                message: 'Please enter password with minimum 6 charecter'
            });
        }


        //password repeate must match
        if(!req.body.password_repeate || req.body.password != req.body.password_repeate){
            return res.status(400).send({
                message: 'Password must be same'
            });
        }
        next();
    },
    isLoggedIn: (req, res, next) => {
        if(!req.headers.authorization){
            return res.status(400).json({
                message: "Your session is not valid!"
            })
        }
        try{
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const decoder = jwt.verify(token, "SECRETKEY");
            req.userData = decoded;
            next();
        }
        catch(err){
            return res.status(400).json({
                message: "Your session is not valid!"
            })
        }
    }
};