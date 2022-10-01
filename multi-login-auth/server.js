const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// route
app.get("/", ( res ) => {
  res.json({ message: "Welcome to Multi Login Auth System" });
});


const PORT = 3000;

// set port, listen for requests
app.listen(PORT, ()=> {
  console.log('Server up and running on port:', PORT);
});