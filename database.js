const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:1111@localhost:5432/NEW_DB'

const pool = new Pool({
  connectionString: connectionString,
})



const client = new Client({
  connectionString: connectionString,
})
client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// app.use((req,res,next)=>{
//     req.header('Access-Control-Allow-Origin','*');
//     req.header('Access-Control-Allow-Headers',
//     'Origin,X-Requested-With,Contet-Type,Accept,Authorization'
//     );
// if(req.method === 'OPTIONS'){
//     req.header('Access-Control-Allow-MEthods','PUT,POST,PATCH,DELETE,GET');
//     return res.status(200).json({});
// }
// next();
// })

module.exports = client;