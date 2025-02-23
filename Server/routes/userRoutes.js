import express from 'express';
import User from '../models/User.js'; // User model
import upload from '../middleware/upload1.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Authentication middleware

const router = express.Router();

// ✅ Get User Profile Page (Render Profile Page)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        

        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); 
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});



router.post('/profile', authMiddleware, upload.single('profilePic'), async (req, res) => {
    try {
        

        // Extract fields from req.body
        const { name, email, phone, title, linkedin } = req.body;
        
        // Handle profile picture (optional)
        const profilePic = req.file ? req.file.path : req.file.secure_url;

        // Build update object dynamically
        let updatedData = {};
        if (name) updatedData.username = name;
        if (email) updatedData.email = email;
        if (phone) updatedData.phone = phone;
        if (title) updatedData.title = title;  // ✅ Ensure title updates
        if (linkedin) updatedData.linkedin = linkedin;
        if (profilePic) updatedData.profilePic = profilePic; 

        console.log("Updating user with:", updatedData);

        // Update user in DB
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        console.log("User updated successfully");
        res.json({ message: 'Profile updated successfully!', user: updatedUser });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

export default router;
