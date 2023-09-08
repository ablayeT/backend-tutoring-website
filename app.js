if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env.development' });
}
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());

app.use(express.json());

const userAuthRoutes = require('./routes/auth');
const userCtrlRoutes = require('./routes/userController');
const studentRoutes = require('./routes/student');
const tutorRoutes = require('./routes/tutor');
const contactRoutes = require('./routes/contact');
const searchRoutes = require('./routes/search');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userAuthRoutes);
app.use('/api/users', userCtrlRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/contacts', contactRoutes);

module.exports = app;
