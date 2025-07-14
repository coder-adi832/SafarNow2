const dotenv = require('dotenv');            // declared it first as
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookies = require('cookie-parser')
const connectToDb = require('./Db/db');
const userRoutes = require('./routes/userRoutes')
const driverRoutes = require('./routes/driverRoutes')

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookies())


app.get('/', (req,res)=>{
    res.send('Hello World');
})

app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);

module.exports = app;