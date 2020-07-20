//require
const express = require('express')
var exphbs = require('express-handlebars');



//start app
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



//routing
app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
  })



//open to port
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})