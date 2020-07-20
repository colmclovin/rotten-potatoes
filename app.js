//require
const express = require('express');
const methodOverride = require('method-override');
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//start app

const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true, useFindAndModify: false });





const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  
  //make a drop down menu for starts in reviews-new
});

//routing
app.get('/', (req, res) => {
    Review.find().lean()
      .then(reviews => {
          //resolved code ran
        res.render('reviews-index', { reviews: reviews });
      })
      .catch(err => {
          //failed code runs 
        console.log(err);
      })
  });
  //new
  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {title: "New Review"}); });
//create
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review)
      res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
      console.log(err.message)
    })
  })
//show
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).lean().then((review) => {
      res.render('reviews-show', { review: review })
    }).catch((err) => {
      console.log(err.message);
    })
  });
//edit
app.get('/reviews/:id/edit', (req, res) => {   //function(err,)
    Review.findById(req.params.id).lean().then((review) => {
      res.render('reviews-edit', {review: review,title: "Edit Review"});
    })
  });
//update 
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body).lean().then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  });
//delete
app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).lean().then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

//open to port
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});