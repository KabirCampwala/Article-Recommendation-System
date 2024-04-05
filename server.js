    const express = require('express');
    const { exec } = require('child_process');
    const path = require('path');
    const app = express();
    const bcrypt = require('bcrypt');
    const validator = require('validator');
    const jwt = require('jsonwebtoken');
    const PORT = process.env.PORT || 3000;

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '/views'))

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const users = [];

    // Example user model
    class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}


    app.get('/', (req, res) => {
        res.render('index');
    });

    //view for signup
    app.get('/signup',(req,res)=>{
        res.render('signup');
    });

    //route for signup validation
    app.post('/signup', (req, res) => {
        const { username, email, password } = req.body;
    
        // Validate user input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }
    
        // Check if username or email already exists
        if (users.find(user => user.username === username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }
    
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }
    
        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }
    
            // Create a new user object
            const newUser = new User(username, email, hash);
    
            // Store the user data
            users.push(newUser);
    
            res.status(201).json({ message: 'User created successfully' });
        });
    });
    

    //view for login
    app.get('/login',(req,res)=>{
        res.render('login');
    });

    //route for login validation

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
    
        // Find the user by username
        const user = users.find(user => user.username === username);
    
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        // Verify password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            // Generate JWT token
            const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            res.status(200).json({ token });
        });
    });

    //authentication code using authentication token
    function authenticateToken(req, res, next) {
        const token = req.headers['authorization']?.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
    
            req.user = user;
            next();
        });
    }
    
    app.get('/protected-route', authenticateToken, (req, res) => {
        res.status(200).json({ message: 'This route is protected' });
    });
    
    // view for about
    app.get('/about',(req,res)=>{
        res.render('about');
    });

    app.get('/output', (req, res) => {
        const query = req.query.query || 'Best technology to learn';
        const jsonFile = "articles.json";
        exec(`python3 article_recommender.py "${query}" ${jsonFile}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            const recommendations = JSON.parse(stdout);
            const query = req.query.query;
            res.render('output', { recommendations, query });
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });