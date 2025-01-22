const express = require('express');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.use(express.json()); 

app.use('/api/blogs', blogRoutes); 
module.exports = app;
