const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static('public')); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
