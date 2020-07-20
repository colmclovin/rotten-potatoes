//require
const express = require('express');
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');


//start app
const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

/*
const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String
});
*/

/*
let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" }
  ];
*/

//routing
app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
      })
      .catch(err => {
        console.log(err);
      })
  })


//open to port
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});