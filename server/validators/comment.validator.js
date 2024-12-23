// validators/comment.validator.js
const validateComment = (req, res, next) => {
    const { taskId, content } = req.body;

    if (!taskId || !content) {
        return res.status(400).json({ message: 'Task ID and content are required' });
    }

    if (content.length < 1 || content.length > 500) {
        return res.status(400).json({ message: 'Comment must be between 1 and 500 characters' });
    }

    // Validate ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID format' });
    }

    next();
};

module.exports = { validateComment };