const express = require('express');
const app = express();
const connection = require('./db/connection');
const studentRouter = require('./routes/students');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/student', studentRouter);

const port = 3000;

app.listen(port, () => {
    console.log('Server is Running on port:', port);
});
