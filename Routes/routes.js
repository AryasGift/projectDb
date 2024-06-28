const express=require('express');
const { register, login } = require('../controllers/userLogic');
const upload = require('../middlewares/multerMiddleware');
const { projectAdd, getHomeProjects, AllProjects, getUserProject, deleteProjects } = require('../controllers/projectLogic');
const { jwtMiddleware } = require('../middlewares/jwtMiddleware');

const router=new express.Router()
//register
router.post('/user/register',register)
//login
router.post('/user/login',login)
//add project
router.post('/user/add-project',jwtMiddleware,upload.single('coverImg'),projectAdd)
router.get('/user/home-projects',getHomeProjects)
router.get('/all-projects',AllProjects)
router.get('/user-projects',jwtMiddleware,getUserProject)
//delete project
router.delete('/user/delete-project/:_id',jwtMiddleware,deleteProjects);
router.put('/user/:_id/edit-profile',jwtMiddleware,upload.single('profile'))
module.exports=router;
