import { Router } from 'express'
import { body } from 'express-validator';
import * as projectController  from '../controller/project.controller.js';
import * as authMiddleware  from '../middleware/auth.middleware.js';

const router = Router()

router.post ('/create' , authMiddleware.authMiddleware, body('name').isString().withMessage("Name is Required"), projectController.createProjectController);
router.get('/all' , authMiddleware.authMiddleware , projectController.getAllProjectsController)
router.put('/add-user' , 
    body('projectId').isString().withMessage("Project ID is required"),
    authMiddleware.authMiddleware ,
     projectController.addUserToProject)


router.get('/get-project/:projectid', authMiddleware.authMiddleware , projectController.getProjectById )

export default router;