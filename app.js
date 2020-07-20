//require
const express = require('express');
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//start app
const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });


const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
  //make a drop down menu for starts in reviews-new
});


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
          //resolved code ran
        res.render('reviews-index', { reviews: reviews });
      })
      .catch(err => {
          //failed code runs 
        console.log(err);
      })
  });
  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {}); });

    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
          console.log(review);
          res.redirect('/');
        }).catch((err) => {
          console.log(err.message);
        })
      })

//open to port
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});