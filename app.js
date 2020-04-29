let express = require('express');
let data = require('./data.json');
let {projects} = data;

let app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(express.static('imgs'));

// routes
app.get('/', (req, res) => {
  res.render('index', {projects});
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/project/:id', (req, res) => {
  // console.log(req.params.id);
  res.render('project', {
    project: projects[req.params.id - 1]
  });
})

// 404 error
app.use((req, res, next) => {
  let err = new Error('This page cannot be located!  Redirecting...');
  err.status = 404;
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log(`Error Status: ${err.status}.  ${err.message}`);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log("This app is running on localhost:3000");
});