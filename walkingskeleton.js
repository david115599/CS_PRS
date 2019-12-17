var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');


var app = express(); //Create an Express route
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo1.png'));

var port = 3000;
app.listen(port, function() {
  console.log('Server started at ' + new Date() + ', on port ' + port + '!');
});

app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('login');
});
app.get('/login', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('login');
});
app.get('/logout', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('login');
});

app.get('/stats', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats');
});

app.get('/about', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about');
});

app.get('/game', function(request, response) {
  var user_data = {
    name: request.query.username,
    password: request.query.password
  };
  console.log(user_data);
  fileContent = fs.readFileSync("data/users.csv", {encoding: 'utf8'});
  console.log(fileContent);
  var logged_in = false;
  fileContentar = fileContent.split(/,|\n/);
  console.log(fileContentar);
  if (fileContentar.includes(user_data.name) && fileContentar.includes(user_data.password) && fileContentar[fileContentar.indexOf(user_data.name)+4] == user_data.password && fileContentar[fileContentar.indexOf(user_data.name)+4] > 4) {
    logged_in = true;
  }

  if (logged_in) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('game', {
      user: user_data
    });
  } else {
    response.status(403);
    response.setHeader('Content-Type', 'text/html')
    response.render('error403');
  }
});

app.post('/:user/game', function(request, response) {
  var user_data = {
    name: request.params.user,
    weapon: request.query.weapon
  };

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.send(JSON.stringify(user_data));
});
