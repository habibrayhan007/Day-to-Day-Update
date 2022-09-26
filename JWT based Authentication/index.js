const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const router = require('./routes/router');

app.use('/api', router);

app.listen(port, () => {
    console.log('Server is running on port:' + port);
});