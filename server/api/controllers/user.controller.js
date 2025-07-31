const Users = require('../models//users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.registerUser = async (req, res) => {
    try {
        const { userName, password, role } = req.body;

        if (!userName || !password || !role) {
            return res.status(400).json({ message: 'userName, password, and role are required' });
        }

        const existingUser = await Users.findOne({ where: { userName } });
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({ userName, Password: hashedPassword, Role: role });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await Users.findOne({ where: { userName } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, role: user.Role },
            JWT_SECRET,
            { expiresIn: '1d' } // 1 day validity
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        // Clear the cookie where token is stored
        res.clearCookie('token', {
            httpOnly: true,
            secure: true, // use true if using HTTPS, otherwise false for local
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};