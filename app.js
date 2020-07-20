//require
const express = require('express')
var exphbs = require('express-handlebars');



//start app
const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" }
  ];

//routing
app.get('/', (req, res) => {
    res.render('reviews-index', { msg: 'Handlebars are Cool!' });
  });

 
/*
app.get('/reviews',(req, res) => {
    res.render('reviews-index',{reviews: reviews})
});
*/

//open to port
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});