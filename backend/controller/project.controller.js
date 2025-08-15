import * as projectService from '../services/project.services.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import mongoose from 'mongoose';

export const createProjectController = async (req, res) => {
  const errors = validationResult(req);

  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed: ' + errors.array().map((err) => err.msg).join(', '),
    });
  }

  try {
    const { name } = req.body;

    // 🔐 Ensure user is extracted from JWT middleware
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'Unauthorized - user not found in token' });
    }

    const loggedUser = await userModel.findOne({ email: req.user.email });

    if (!loggedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = loggedUser._id;

    const project = await projectService.createProject({ name, userId });

    return res.status(201).json({ project });

  } catch (err) {
    
    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Project with that name already exists for this user',
      });
    }

    console.error('Internal Server Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllProjectsController = async (req, res) => {
   try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message : "Unauthorized - user not found in token" });
    }
    const loggedUser = await userModel.findOne({ email : req.user.email})

    const userId = loggedUser._id;

    const projects = await projectService.getAllProjectsByUserId(userId );

    return res.status(200).json({ projects : projects})

   }catch(err){
    console.log(err)
    res.status(404).json({ message: 'User not found' });
   }
}

export const addUserToProject = async (req, res) => {
  
   const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

      const { projectId, users } = req.body

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })


        const project = await projectService.addUsersToProject({
            projectId,
            users,
            userId: loggedInUser._id
        })

        return res.status(200).json({
            project,
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }


}


export const getProjectById = async (req, res) => {
  const {projectId} = req.params

  try {
    const project = await projectService.getProjectByIdService({projectId})

    return res.status(200).json({project})


  } catch(err) {
    console.log(err)
  }
}