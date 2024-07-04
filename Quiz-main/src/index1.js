const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb');
const bodyParser = require('body-parser');

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
const quizTestPath = path.join(__dirname, '../QuizTest'); // Adjust this path if needed

app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath)); // Serve static files from the public directory

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get("/dashboard", (req, res) => {
    // Assuming you have user data stored in a session or some middleware
    const user = req.session.user;
    res.render("dashboard", { name: user.name });
});

app.get("/QuizTest", (req, res) => {
    const folderPath = path.join(__dirname, 'templates');
    // Logic to render the QuizTest page
    res.render("QuizTest");
});

app.use(express.static(publicPath)); // Serve static files from the public directory

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        scores: [],
    };

    await collection.insertMany([data]);
    res.render('dashboard', { name: req.body.name });
});

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (check.password === req.body.password) {
            res.render('dashboard', { name: req.body.name });
        } else {
            res.send('wrong password');
        }
    } catch {
        res.send('wrong details');
    }
});

app.post('/save-scores', async (req, res) => {
    const { email, scores } = req.body;
    try {
        const user = await collection.findOne({ email });
        if (user) {
            await collection.updateOne(
                { email },
                { $push: { scores: { $each: [scores], $slice: -10 } } } // Save up to last 10 scores
            );
            res.status(200).send('Scores saved successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error saving scores');
    }
});

app.listen(3000, () => {
    console.log('Port connected');
});