const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.log(err));
