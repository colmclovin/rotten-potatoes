
const Review = require('../models/review');
const Comment = require('../models/comment');

const moment = require('moment');

module.exports = function(app) {
 
  

  //home
    app.get('/', (req, res) => {
      Review.find().lean()
        .then(reviews => {
         
          res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
          console.log(err);
        });
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
  });

//show
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).lean().then((review) => {
      let createdAt = review.createdAt;
          createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
          console.log(createdAt);
          review.createdAtFormatted = createdAt;
          console.log(review.createdAtFormatted);
      Comment.find({ reviewId: req.params.id}).lean().then(comments => {
        res.render('reviews-show', {review: review, comments: comments})
      })
     
    }).catch((err) => {
      console.log(err.message);
    });
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
  });


  }
