const express = require('express');
const connection = require('../db/connection');
const router = express.Router();

router.post('/add', (req, res) => {
    let student = req.body;

/*     console.log(student.name);
    console.log(student.email);
    console.log(student.password);
    console.log(student.mobile); */
    sqlquery = `INSERT INTO registration (name, email, password, phone) VALUES ('${student.name}','${student.email}','${student.password}','${student.mobile}')`;

    connection.query(sqlquery, (err, results) => {
        if(!err){
            return res.status(200).json({message: "Student Added"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.get('/allstudents', (req, res) => {
    sqlquery = `SELECT * FROM registration`;

    connection.query(sqlquery, (err, results) => {
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.patch('/update/:id', (req, res) => {
    const id = req.params.id;
    let student = req.body;
    sqlquery = `UPDATE registration SET name=?, email=?, password=?, mobile=? WHERE id=?`;
    connection.query(sqlquery, [student.name, student.email, student.password, student.mobile, id], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Student Id is not found!"});
            }
            return res.status(200).json({message: "Student Updated"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    sqlquery = `DELETE FROM registration WHERE id=?`;
    connection.query(sqlquery, [id], (err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Student Id is not found!"});
            }
            return res.status(200).json({message: "Student Deleted"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;