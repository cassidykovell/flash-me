const path = require('path');
const express = require('express');
const session = require('express-session');
// const exphbs = require('express-handlebars');
const routes = require('./controllers');




const sequelize = require('./config/connection');

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


const app = express();
const PORT = process.env.PORT || 3001;


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


app.use(session(sess));

// Inform Express.js on which template engine to use
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
