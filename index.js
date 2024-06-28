require('dotenv').config()
const express=require('express')
const ServerApp=express()

// cors-connect with frontEnd
const cors=require('cors');
const router = require('./Routes/routes');
ServerApp.use(cors());
require('./DataBase_connection/connection')
//convert json to js
//export static method is used to share(export) folders between two apps(server to client app)
ServerApp.use('/uploads',express.static('./uploads'))
ServerApp.use(express.json())
ServerApp.use(router)
const PORT=4000 ||process.env.PORT
ServerApp.listen(PORT,()=>{
    console.log(`port started at ${PORT}`);
})
ServerApp.get('/',(req,res)=>{
   res.send("get requested received")
})
// ServerApp.post('/postExec',(req,res)=>{
//     // res.send(`post_request ${req.body.username}  ${req.body.password}` )
//     // json-convert data js-json then send it to client (it is used when the data is not in string form)
//     // res.json(req.body.username)
//     res.status(401).json("incorrect username")
//  })
//  ServerApp.post('/getExec',(req,res)=>{
//     res.send("get requested received")
//  })
