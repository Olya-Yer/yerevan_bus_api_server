const express = require('express');
const router = express.Router();
const dbClient = require('./../../database')

// const values = ["Erebuni", 'Khanjyan']


async function selectBusRoutes(from,to){
// const text = 'SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2;'
//const text = 'SELECT * from bus_routes where bus_id in (SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON  a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2) and route_order between (select route_order from bus_routes where street_name = $1) and (select route_order from bus_routes where street_name = $2);'
const text = 'SELECT a.bus_id, a.bus_number, a.bus_type, b.street_name FROM ( SELECT c.bus_id, c.bus_number, c.bus_type FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id JOIN busses AS c ON a.bus_id=c.bus_id WHERE a.street_name=$2 AND b.street_name=$2 ) AS a JOIN bus_routes AS b ON b.bus_id=a.bus_id WHERE (b.street_name BETWEEN $1 AND $2) OR (b.street_name BETWEEN $2 AND $1);'
const values = [from, to]
return  await dbClient.query(text,values)
}
async function selectBusSchedule(busId){
    // const text = 'SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2;'
    //const text = 'SELECT * from bus_routes where bus_id in (SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON  a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2) and route_order between (select route_order from bus_routes where street_name = $1) and (select route_order from bus_routes where street_name = $2);'
    // const text = 'SELECT a.bus_id, a.bus_number, a.bus_type, b.street_name FROM ( SELECT c.bus_id, c.bus_number, c.bus_type FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id JOIN busses AS c ON a.bus_id=c.bus_id WHERE a.street_name=$2 AND b.street_name=$2 ) AS a JOIN bus_routes AS b ON b.bus_id=a.bus_id WHERE (b.street_name BETWEEN $1 AND $2) OR (b.street_name BETWEEN $2 AND $1);'
    const text = 'SELECT * FROM bus_routes WHERE bus_id=$1'
    const values = [id]
    return  await dbClient.query(text,values)
    }


        async function getAllBuses(){
            // const text = 'SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2;'
            //const text = 'SELECT * from bus_routes where bus_id in (SELECT a.bus_id FROM bus_routes AS a JOIN bus_routes AS b ON  a.bus_id=b.bus_id WHERE a.street_name=$1 AND b.street_name=$2) and route_order between (select route_order from bus_routes where street_name = $1) and (select route_order from bus_routes where street_name = $2);'
            // const text = 'SELECT a.bus_id, a.bus_number, a.bus_type, b.street_name FROM ( SELECT c.bus_id, c.bus_number, c.bus_type FROM bus_routes AS a JOIN bus_routes AS b ON a.bus_id=b.bus_id JOIN busses AS c ON a.bus_id=c.bus_id WHERE a.street_name=$2 AND b.street_name=$2 ) AS a JOIN bus_routes AS b ON b.bus_id=a.bus_id WHERE (b.street_name BETWEEN $1 AND $2) OR (b.street_name BETWEEN $2 AND $1);'
            const text = 'SELECT * FROM busses'
            return  await dbClient.query(text)
            } 

    router.get('/',async (req,res,next)=>{
        try{
            const query = await selectBusRoutes(req.query.from, req.query.to)
            const result = query.rows
            console.log("result",result)
            let routes = {}
            result.map(function(item,key){
               return routes[item.bus_id]={ 
                   bus:item.bus_number+"_"+item.bus_type,
                    ...routes[item.bus_id],
                    [key]:item.street_name
                }
            })
            res.status(200).json({
                routes
        })
        }catch(err){
            console.log(err)
        }
    })

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