// routes/comment.routes.js
const router = require('express').Router();
const { Comment } = require('../models/comment.model');
const { validateComment } = require('../validators/comment.validator');

// Get comments for a task
router.get('/task/:taskId', async (req, res) => {
    try {
        const comments = await Comment.find({ taskId: req.params.taskId })
            .populate('userId', 'username email')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
});

// Add comment
router.post('/', validateComment, async (req, res) => {
    try {
        const comment = new Comment({
            ...req.body,
            userId: req.user._id
        });
        await comment.save();
        
        const populatedComment = await Comment.findById(comment._id)
            .populate('userId', 'username email');
            
        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
});

// Delete comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user has permission to delete
        if (!req.user.role === 'admin' && comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
});

module.exports = router;