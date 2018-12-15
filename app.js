const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const busRoutes = require('./api/routes/busRoutes');
const buses = require('./api/routes/buses');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use('/getBusRoutes',busRoutes)
app.use('/buses',buses)

app.use((req,res,next)=>{
    const error = new Error('not found')
    error.status = 404;
        next(error)
   
})

app.use((error,req,res,next)=>{
    res.status(error.status|| 500).json({
        error: {
            message: error.message
        }
    })
})
module.exports = app