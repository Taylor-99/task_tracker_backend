// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const router = require('express').Router();
const db  = require('../models');

const verifyToken = require('../middleware/VerifyJWT');

// Show - Mood
router.get('/', verifyToken, async (req, res) => {

    try {
        const userTasks = await db.Task.find({ user: req.user._id });
        
        res.json(userTasks);

        
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

});

// Delete
router.delete('/:taskId', verifyToken, async (req, res) =>{

    try{
        // Delete 
        const deletedTask = await db.Task.findByIdAndDelete( req.params.taskId );

        //return a 404 status code
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Send a success message with a 200 status code
        res.status(200).json({ message: 'Task entry deleted successfully' });

    } catch (error) {
        console.error("Error deleting task:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update 
router.put('/:taskid', verifyToken, async (req, res) => {

    try{

        const pastTask = await db.Task.findById(req.params.taskid);

        // Return a 404 status code
        if (!pastTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        await db.Task.findByIdAndUpdate(req.params.taskid, {
            task: req.body.task,
            dueDate: req.body.dueDate,
            createdDate: req.body.createdDate,
            category: req.body.category,
            notes: req.body.notes,
        });
        
        res.status(200).json({ message: 'Task updated successfully' });        

    }catch (error) {
        console.error("Error updating mood:", error.message);
        res.status(400).send(error.message);
    }

});

async function createTask(userId, taskData) {

    const newTask = {
        task: taskData.task,
        dueDate: taskData.dueDate,
        createdDate: taskData.createdDate,
        category: taskData.category,
        notes: taskData.notes,
        user:userId
    };

    const createdTask = await db.Task.create(newTask); 


    await createdTask.save();

    return createdTask;
};

router.post('/create', verifyToken, async (req, res) =>{

    try {
        // Find the user by their ID
        const user = await db.User.findById(req.user._id);

        // Return a 404 status code if the user doesn't exist
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const task = await createTask(req.user._id, req.body);

        // Return a success message
        return res.json({ message:'created task' })
        
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

});

// edit
router.get('/edit/:taskId', verifyToken, async(req, res) => {

    try {
        // Find by ID
        const task = await db.Task.findById(req.params.taskId);

        // Return a 404 status code 
        if (!task) {
        return res.status(404).json({ message: "Task not found" });
        }

        // Return data
        res.json(task);
        
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

});

// Export the router to be used in other parts of the application
module.exports = router