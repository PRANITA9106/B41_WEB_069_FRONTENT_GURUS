// routes/task.routes.js
const router = require('express').Router();
const Task = require('../models/task.model');
const { isAdmin } = require('../middleware/auth.middleware');
const { validateTask } = require('../validators/task.validator');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('assignees', 'username email')
            .populate('createdBy', 'username email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});

// Create task
router.post('/', validateTask, async (req, res) => {
    try {
        const task = new Task({ ...req.body, createdBy: req.user._id });
        await task.save();
        
        const populatedTask = await Task.findById(task._id)
            .populate('assignees', 'username email')
            .populate('createdBy', 'username email');
            
        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
});

// Update task
router.put('/:id', validateTask, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user has permission to update
        if (!req.user.role === 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        ).populate('assignees', 'username email')
         .populate('createdBy', 'username email');

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if user has permission to delete
        if (!req.user.role === 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
});

// Update task status (for drag-and-drop functionality)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status, updatedAt: Date.now() },
            { new: true }
        ).populate('assignees', 'username email')
         .populate('createdBy', 'username email');

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task status', error: error.message });
    }
});

module.exports = router;