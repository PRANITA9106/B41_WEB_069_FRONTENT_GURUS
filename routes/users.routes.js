// routes/users.routes.js
const router = require('express').Router();
const { User } = require('../models/user.model');
const { authenticateToken, isAdmin } = require('../middleware/auth.middleware');

// Get all users (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')  // Exclude password from response
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get single user
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Only allow admins or the user themselves to view the details
        if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this user' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Update user role (admin only)
router.patch('/:id/role', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { role } = req.body;

        // Validate role
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent changing own role
        if (req.user._id.toString() === user._id.toString()) {
            return res.status(400).json({ message: 'Cannot change own role' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated successfully', user: { ...user.toJSON(), password: undefined } });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent self-deletion
        if (req.user._id.toString() === user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete own account' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Update user profile (self or admin)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Only allow admins or the user themselves to update the profile
        if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this user' });
        }

        // Check for unique username/email
        const existingUser = await User.findOne({
            $and: [
                { _id: { $ne: req.params.id } },
                { $or: [{ username }, { email }] }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.username === username
                    ? 'Username already taken'
                    : 'Email already registered'
            });
        }

        user.username = username;
        user.email = email;
        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: { ...user.toJSON(), password: undefined }
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

module.exports = router;