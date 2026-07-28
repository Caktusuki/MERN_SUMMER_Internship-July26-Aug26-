const bcrypt = require('bcrypt');

// Simple in-memory array to store users temporarily while the server runs
const users = [];

// Register Controller
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user to array
        const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, name, email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email in the array
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", userId: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};