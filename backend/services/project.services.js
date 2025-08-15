import projectSchema from '../models/project.model.js';
import mongoose from 'mongoose';

export const createProject = async ({ name , userId}) => {
    if (!name || !userId) {
        throw new Error('Project name and user ID are required');
    }

    const project = new projectSchema({
        name,
        users : [userId],
    })

    await project.save()

    return project;
}

export const getAllProjectsByUserId = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const projects = await projectSchema.find({ users : userId})
    if (!projects || projects.length === 0) {
        throw new Error('No projects found for this user');
    }

    return projects;

}

export const addUsersToProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!users) {
        throw new Error("users are required")
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }

    if (!userId) {
        throw new Error("userId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }


    const project = await projectSchema.findOne({
        _id: projectId,
        users: userId
    })

    console.log(project)

    if (!project) {
        throw new Error("User not belong to this project")
    }

    const updatedProject = await projectSchema.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject


}


export const getProjectByIdService = async ({projectId}) => {
    if (!projectId) {
        throw new Error ("No ProjectID")

    }

    const project = await projectSchema.findOne({
        _id: projectId
    }).populate('users')

    return project
}