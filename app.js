//require
const express = require('express');
const methodOverride = require('method-override');
var exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true, useFindAndModify: false });


//start app

const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));





const reviews = require('./controllers/reviews')(app);

//controller for routing



//open to port
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
module.exports = app;