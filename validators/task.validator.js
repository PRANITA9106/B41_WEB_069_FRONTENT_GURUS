// validators/task.validator.js
const validateTask = (req, res, next) => {
    const { title, description, dueDate, priority, status, assignees } = req.body;

    if (!title || !dueDate) {
        return res.status(400).json({ message: 'Title and due date are required' });
    }

    if (title.length < 3) {
        return res.status(400).json({ message: 'Title must be at least 3 characters long' });
    }

    if (description && description.length > 1000) {
        return res.status(400).json({ message: 'Description must not exceed 1000 characters' });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Invalid priority level' });
    }

    const validStatuses = ['todo', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    if (assignees && !Array.isArray(assignees)) {
        return res.status(400).json({ message: 'Assignees must be an array' });
    }

    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
        return res.status(400).json({ message: 'Invalid due date format' });
    }

    next();
};

module.exports = { validateTask };