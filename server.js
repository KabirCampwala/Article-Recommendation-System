    const express = require('express');
    const { exec } = require('child_process');
    const path = require('path');
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '/views'))

    app.use(express.static(path.join(__dirname, '/public')));

    app.get('/', (req, res) => {
        res.render('index');
    });

    //view for signup
    app.get('/signup',(req,res)=>{
        res.render('signup');
    });

    //view for login
    app.get('/login',(req,res)=>{
        res.render('login');
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