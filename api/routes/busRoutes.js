const express = require('express');
const router = express.Router();
const dbClient = require('./../../database')

// const values = ["Erebuni", 'Khanjyan']


async function selectBusIds(from,to){
const text = 'SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2;'
const values = [from, to]
return  await dbClient.query(text,values)
}
    // const values = ["Erebuni", 'Khanjyan']

    router.get('/',async (req,res,next)=>{
        const query = await selectBusIds(req.query.from, req.query.to)
        const result = query.rows[0]
        res.status(200).json({
        result
    })
    })

// router.get('/',async (req,res,next)=>{
//     const text = 'SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2;'
//     const values = [req.query.from, req.query.to]
//     const { rows } = await dbClient.query(text,values)
//     const result = rows[0]
//     res.status(200).json({
//     result
// })
// })

router.post('/',(req,res,next)=>{
    const favorit ={
        userUID: req.body.userUID,
        from:  req.body.from ,
        to:  req.body.to,
        busId:  req.body.busId,
    }
    res.status(201).json({
        message: "in busroutes post request",
        favParams: favorit,
    })
})

// router.post('/:busname',(req,res,next)=>{
//     res.status(200).json({
//         message: "in busroutes post request"
//     })
// })

module.exports = router;