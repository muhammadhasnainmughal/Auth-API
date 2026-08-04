require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//==================================
// Middleware to protect routes
//==================================
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Attach user data to the request object so the route can use it
    req.user = data.user;

    // Move to the next function (the actual route handler)
    next();
};

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('Auth API is running!');
});

// =====================================
// Sign Up (Endpoint)
// =====================================
app.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;

    // Validation: if email or password is missing return error
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // Call supabase signup method
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    // Error handling
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    // Success return user object
    res.status(201).json(data.user);
});

// =====================================
// Log In (Endpoint)
// =====================================
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Validation: If email or password is missing return error
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // Call supabase signInWithPassword method
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    // Error handling
    if (error) {
        return res.status(401).json({ error: "Invalid login credentials" });
    }

    // Success return access token and refresh token
    res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
    });
});

//==================================
//Public (Endpoint)
//==================================
app.get('/public/info', (req, res) => {
    // Returns 200 with a welcome message
    res.status(200).json({ message: "Welcome stranger! This info is public." });
});

//=======================================
//Protected (Endpoint) with token verify
//=======================================
app.get('/protected/profile', requireAuth, (req, res) => {
    res.status(200).json({
        id: req.user.id,
        email: req.user.email,
        created_at: req.user.created_at
    });
});

//=======================================
//Protected (Endpoint) with token verify
//=======================================
app.get('/protected/dashboard', requireAuth, (req, res) => {
    res.status(200).json({
        id: req.user.id,
        email: req.user.email,
        created_at: req.user.created_at
    });
});

//=======================================
//Logout (Endpoint)
//=======================================
app.post('/auth/logout', requireAuth, async (req, res) => {
    // Call the Supabase sign-out method
    const { error } = await supabase.auth.signOut();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(204).send();
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running and connected to Supabase on port ${PORT}`);
});
