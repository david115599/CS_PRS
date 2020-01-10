var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');


var app = express(); //Create an Express route
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo1.png'));

var port = process.env.PORT || 3000;
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
//  console.log(fileContent);
  var logged_in = false;
  fileContentar = fileContent.split(/,|\n/);
  filesortar = fileContent.split(/\n/);
  var villianstats = [];
  for (var i = 1; i < filesortar.length-1; i++) {
    villianstats[i] = {};
    for (var q = 0; q < 10; q++) {
      villianstats[i][fileContentar[q]]=fileContentar[i*10+q];
    }
  }
  //console.log(villianstats);

  villianstats.sort(function(a,b){
if ((b.wins)/(b.tied+b.losses)) {
}
else {
    return(-1);
}
if ((a.wins)/(a.tied+a.losses)) {
}
else {
    return(1);
}
return ((b.wins)/(b.tied+b.losses+b.wins)) - ((a.wins)/(a.tied+a.losses+a.wins));
    }
  );
//console.log("villianstatsvillianstatsvillianstatsvillianstatsvillianstatsvillianstatsvillianstats");
//console.log(villianstats);

  /*
  <td><%=data.users[i+1]%></td>
  <td><%=data.users[i+2]%></td>
  <td><%=data.users[i+3]%></td>
  */



  userss = fs.readFileSync("data/users.csv", {encoding: 'utf8'});
  //console.log(userss);
  var logged_in = false;
  usersar = userss.split(/,|\n/);
  usersarl = userss.split(/\n/);
//  console.log(usersar);

  //  console.log(usersar);
var userstats = [];

 for (var i = 0; i < usersarl.length-1; i++) {
    userstats[i] = {};
    for (var q = 0; q < 11; q++) {
      userstats[i][usersar[q]]=usersar[i*11+q];
    }
  }
  userstats.sort(function(a,b){
if ((b.wins)/(b.tied+b.losses)) {
}
else {
    return(-1);
}
if ((a.wins)/(a.tied+a.losses)) {
}
else {
    return(1);
}
return ((b.wins)/(b.tied+b.losses+b.wins)) - ((a.wins)/(a.tied+a.losses+a.wins));
    }
  );

console.log(userstats);
  var senddata = {
    villains: villianstats,
    users: userstats
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
//  console.log(user_data);
  fileContent = fs.readFileSync("data/users.csv", {encoding: 'utf8'});
//  console.log(fileContent);
  var logged_in = false;
  fileContentar = fileContent.split(/,|\n/);
//  console.log(fileContentar);
  if (fileContentar.includes(user_data.name) && fileContentar.includes(user_data.password) && fileContentar[fileContentar.indexOf(user_data.name)+1] == user_data.password /*&& fileContentar[fileContentar.indexOf(user_data.name)+1] > 4*/) {
    logged_in = true;
  }

  fileContent = fs.readFileSync("data/villains.csv", {encoding: 'utf8'});
//  console.log(fileContent);
  var logged_in = false;
  fileContentar = fileContent.split(/,|\n/);
  filesortar = fileContent.split(/\n/);
  var villianstats = [];
  for (var i = 1; i < filesortar.length-1; i++) {
    villianstats[i] = {};
    for (var q = 0; q < 10; q++) {
      villianstats[i][fileContentar[q]]=fileContentar[i*10+q];
    }
  }
  //console.log(villianstats);

  villianstats.sort(function(a,b){
if ((b.wins)/(b.tied+b.losses)) {
}
else {
    return(-1);
}
if ((a.wins)/(a.tied+a.losses)) {
}
else {
    return(1);
}
return ((b.wins)/(b.tied+b.losses+b.wins)) - ((a.wins)/(a.tied+a.losses+a.wins));
    }
  );
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
