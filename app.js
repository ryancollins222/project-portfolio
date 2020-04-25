let express = require('express');
let data = require('./data.json');
let {projects} = data;
// console.log(projects);

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

app.listen(3000);