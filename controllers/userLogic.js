const jwt=require("jsonwebtoken")
const users = require("../Models/usermodels");

exports.register=async(req,res)=>{
  var{username,email,password}=req.body;
  //check user exists in the collection
  try{
    const existingUser=await users.findOne({email})
    if(existingUser){
      res.status(406).json("Already registered please login")
    }
    else{
      const newUSer=new users({
        username,email,password,profile:" ",LinkedIn:" ",gitHub:" "
      })
      await newUSer.save()
      res.status(201).json("Account created successfully")
    }
  }
  catch{
    res.status(400).json("api failed")
  }
  
}
exports.login=async(req,res)=>{
  var{email,password}=req.body;
  const user=await users.findOne({email,password})
  if(user){
    console.log(user._id);
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY)
    res.status(200).json({
      user,
      message:"login successsfull",
      token
    })
  }
  else{
    res.status(401).json("login failed")
  }
}
exports.editProfile=async(req,res)=>{
  const{username,LinkedIn,gitHub,profile}=req.body
  const{_id}=req.params
  const newProfile=req.file?req.file.filename:profile
  const user= await users.find({_id})
  if(user){
    user.username=username
    user.LinkedIn=LinkedIn
    user.gitHub=gitHub
    user.profile=newProfile
    await user.save()
    res.status(200).json(user)
  }
}