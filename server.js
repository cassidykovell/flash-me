const express = require('express');
const session = require('express-session');
const routes = require('./controllers');


const sequelize = require('./config/connection');

// Other code...

const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 86400000, // 24 hours
    httpOnly: true,
    secure: false, // Set to true in production for HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};

// Use session middleware
app.use(session(sess));

// Parse incoming JSON data
app.use(express.json());

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Use routes defined in controllers
app.use(routes);
// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
