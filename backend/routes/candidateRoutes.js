import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Update candidate profile
// @route   PUT /api/candidate/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.profile = {
                ...user.profile,
                ...req.body.profile
            };

            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all candidates (Admin only)
// @route   GET /api/candidate/all
// @access  Private/Admin
router.get('/all', protect, admin, async (req, res) => {
    try {
        const candidates = await User.find({ role: 'candidate' });
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
