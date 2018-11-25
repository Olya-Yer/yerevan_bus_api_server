const express = require('express');
const router = express.Router();



router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "in buses get request"
    })
})

router.post('/',(req,res,next)=>{
    const favorit ={
        userUID: req.body.userUID,
        from:  req.body.from ,
        to:  req.body.to,
        busId:  req.body.busId,
    }
    res.status(201).json({
        message: "in buses post request",
        favParams: favorit,
    })
})

// router.post('/:busname',(req,res,next)=>{
//     res.status(200).json({
//         message: "in busroutes post request"
//     })
// })

module.exports = router;