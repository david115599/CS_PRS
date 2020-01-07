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


  fileContent = fs.readFileSync("data/villains.csv", {encoding: 'utf8'});
  console.log(fileContent);
  var logged_in = false;
  fileContentar = fileContent.split(/,|\n/);
  filesortar = fileContent.split(/\n/);
  console.log(fileContentar);
  console.log(filesortar);

  filesortar.sort(function(a,b){
    if (filesortar.indexOf(a)==0) {
      return(false);
    }
    if (filesortar.indexOf(b)==0) {
      return(true);
    }

    if ((fileContentar[filesortar.indexOf(a+10)]+1)/(((fileContentar[filesortar.indexOf(a+10)+2]+(fileContentar[filesortar.indexOf(a+10)+3]))))>=(fileContentar[filesortar.indexOf(b+10)]+1)/(((fileContentar[filesortar.indexOf(b+10)+2]+(fileContentar[filesortar.indexOf(b+10)+3]))))) {
      return(true);
    }
    else {
      return(false);
    }
  });
  console.log(filesortar);
  fileContentar = filesortar.toString().split(/,|\n/);

  /*
  <td><%=data.users[i+1]%></td>
  <td><%=data.users[i+2]%></td>
  <td><%=data.users[i+3]%></td>
  */



  userss = fs.readFileSync("data/users.csv", {encoding: 'utf8'});
  //console.log(userss);
  var logged_in = false;
  usersar = userss.split(/,|\n/);
  //  console.log(usersar);

  var senddata = {
    villains: fileContentar,
    users: usersar
  };
  response.render('stats', {
    data: senddata
  });
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
  response.render('results');
});
