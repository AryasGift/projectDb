const projects=require("../Models/projectmodels")
exports.projectAdd=async(req,res)=>{
    const{title,description,technologies,website,github}=req.body
    const coverImg=req.file?.filename
    const userId=req.payload
    const existingProject=await projects.findOne({github})
    if(existingProject){
        res.status(400).json(`${existingProject.title} is already exists`)
    }
    else{
        const newProject=new projects({
            title,description,technologies,website,github,userId,coverImg  
        })
        newProject.save()
        res.status(201).json(newProject);
    }
}
exports.getHomeProjects=async(req,res)=>{
   try{
    const homeProjects=await projects.find().limit(3)
    if(homeProjects){
        res.status(200).json(homeProjects)
    }
  }
  catch{
    res.status(400).json("add project")
  }
}
exports.AllProjects=async(req,res)=>{
    //access query param from api
    const searchData=req.query.search
    try{
        const AllProjects=await projects.find({technologies:{$regex:searchData,$option:"i"}})// $option:"i" means ignore cases
        if(AllProjects){
             res.status(200).json(AllProjects)
        }
    }
    catch{
        res.status(400).json("get All projects api failed")
    }
}
exports.getUserProject=async(req,res)=>{
     const userId=req.payload;
    try{
        const userProjects=await projects.find({userId})
        if(userProjects){
            res.status(200).json(userProjects)
        }
    }
    catch(err){
        res.status(400).json(err)

    }
}
exports.deleteProjects=async(req,res)=>{
    const{_id}=req.params
    try{
        const deletedProducts=await projects.findByIdAndDelete({_id})
        res.status(200).json(deletedProducts)
    }
    catch(err){
        res.status(400).json(err)
    }
}
   

