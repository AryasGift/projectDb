const { mongoose } = require("mongoose");

mongoose.connect(process.env.DataBase).then(out=>{
    console.log("server connected");
}).catch(err=>{
    console.log(`error found ${err}`);
})