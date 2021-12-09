require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const MONGO_URI = require('./dbConfig.js');
const bodyParser = require('body-parser');
const auth = require('./routes/authRoutes.js');
const requireAuth = require('./middlewares/requireAuth.js');

const app = express();

app.use(bodyParser.json());
app.use(auth);

mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to mongo instance - ${err}`);
});


app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});