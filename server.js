var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

var bodyParser = require('body-parser')

var app = express(); //Create an Express route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
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

//console.log(userstats);
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

  fileContent = fs.readFileSync("data/villains.csv", {encoding: 'utf8'});
  //  console.log(fileContent);
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




var user_data = {
  name: request.query.username,
  password: request.query.password,
  villians: villianstats
};
//  console.log(user_data);
fileContent = fs.readFileSync("data/users.csv", {encoding: 'utf8'});
//  console.log(fileContent);
var logged_in = false;
fileContentar = fileContent.split(/,|\n/);
//  console.log(fileContentar);
if (fileContentar.includes(user_data.name) && fileContentar.includes(user_data.password) && fileContentar[fileContentar.indexOf(user_data.name)+1] == user_data.password/* && fileContentar[fileContentar.indexOf(user_data.name)+1] > 4*/) {
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
    weapon: request.body.weapon,
    villain: request.body.Villain,
    vallianroll: 0,
    winner: 0,
    userindex: 0,
    villainindex: 0,
    allusers: [],
    allvillains: []
  };

  //  console.log(user_data.weapon);
  //  console.log(user_data.villain);
  userss = fs.readFileSync("data/users.csv", {encoding: 'utf8'});
  var logged_in = false;
  usersar = userss.split(/,|\n/);
  usersarl = userss.split(/\n/);
  var userstats = [];
  for (var i = 1; i < usersarl.length-1; i++) {
    userstats[i-1] = {};
    for (var q = 0; q < 11; q++) {
      userstats[i-1][usersar[q]]=usersar[i*11+q];
    }
  }


  fileContent = fs.readFileSync("data/villains.csv", {encoding: 'utf8'});
  fileContentar = fileContent.split(/,|\n/);
  filesortar = fileContent.split(/\n/);
  var villianstats = [];
  for (var i = 1; i < filesortar.length-1; i++) {
    villianstats[i-1] = {};
    for (var q = 0; q < 10; q++) {
      villianstats[i-1][fileContentar[q]]=fileContentar[i*10+q];
    }
  }
  index = 0;
  //console.log(villianstats);
  for (var i = 0; i < villianstats.length; i++) {
    //villianstats[i].name.split(' ').join('_');
    if (villianstats[i].name == (user_data.villain)) {
      index = i;
    }
  }
  var paperstrat = parseFloat(villianstats[index].paper_strategy);
  var rockstrat = parseFloat(villianstats[index].rock_strategy);
  var scissorsstrat = parseFloat(villianstats[index].scissors_strategy);
  var villainroll=Math.random();
  var villainrollactual = 0;
  var userindex;
  var villianindex;
  //  console.log(paperstrat +" "+rockstrat +" "+scissorsstrat +" "+villainroll);
  for (var i = 0; i < userstats.length; i++) {
    if (userstats[i].name == user_data.name) {
      userindex = i;
    }
  }
  for (var i = 0; i < villianstats.length; i++) {
    if (villianstats[i].name == user_data.villain) {
      villianindex = i;
    }
  }
  if (villainroll<=paperstrat) {
  villainrollactual=1
  villianstats[villianindex].paper = parseInt(villianstats[villianindex].paper)+1;
  }
  else if (villainroll>paperstrat && villainroll<=(paperstrat+rockstrat)) {
    villainrollactual=2
  villianstats[villianindex].rock = parseInt(villianstats[villianindex].rock)+1;
  }
  else if (villainroll>(rockstrat+paperstrat)) {
    villainrollactual=3
  villianstats[villianindex].scissors = parseInt(villianstats[villianindex].scissors)+1;
  }
  else {
    villainrollactual = villainroll
  }
  user_data.vallianroll = villainrollactual
  //console.log(index);
  var userchoice = 0;
  if (user_data.weapon == "paper") {
    userchoice=1;
    userstats[userindex].paper = parseInt(userstats[userindex].paper)+1;
  }
  if (user_data.weapon == "rock") {
    userchoice=2;
    userstats[userindex].rock = parseInt(userstats[userindex].rock)+1;
  }
  if (user_data.weapon == "scissors") {
    userchoice=3;
    userstats[userindex].scissors = parseInt(userstats[userindex].scissors)+1;
  }

  if (userchoice == villainrollactual) {
    user_data.winner = 0;
    userstats[userindex].tied = parseInt(userstats[userindex].tied)+1;
    villianstats[villianindex].tied = parseInt(villianstats[villianindex].tied)+1;
  }
  else if (userchoice == 1 && villainrollactual == 2) {
    user_data.winner = 1;
    userstats[userindex].wins = parseInt(userstats[userindex].wins)+1;
    villianstats[villianindex].losses = parseInt(villianstats[villianindex].losses)+1;
  }
  else if (userchoice == 1 && villainrollactual == 3) {
    user_data.winner = 2;
    userstats[userindex].losses = parseInt(userstats[userindex].losses)+1;
    villianstats[villianindex].wins = parseInt(villianstats[villianindex].wins)+1;
  }
  else if (userchoice == 2 && villainrollactual == 1) {
    user_data.winner = 2;
    userstats[userindex].losses = parseInt(userstats[userindex].losses)+1;
    villianstats[villianindex].wins = parseInt(villianstats[villianindex].wins)+1;
  }
  else if (userchoice == 2 && villainrollactual == 3) {
    user_data.winner = 1;
    userstats[userindex].wins = parseInt(userstats[userindex].wins)+1;
    villianstats[villianindex].losses = parseInt(villianstats[villianindex].losses)+1;
  }
  else if (userchoice == 3 && villainrollactual == 1) {
    user_data.winner = 1;
    userstats[userindex].wins = parseInt(userstats[userindex].wins)+1;
    villianstats[villianindex].losses = parseInt(villianstats[villianindex].losses)+1;
  }
  user_data.userindex = userindex;
  user_data.villianindex = villianindex;
  user_data.allusers = userstats;
  user_data.allvillains = villianstats;
console.log(usersarl.length);
console.log(filesortar.length);
  var temparray = []
  temparray[0] = usersarl[0];
  for (var i = 1; i < usersarl.length-1; i++) {
    var temparray2 = []
    //console.log(temparray.length)
    temparray2.push(userstats[i-1].name);
    temparray2.push(userstats[i-1].password);
    temparray2.push(userstats[i-1].paper);
    temparray2.push(userstats[i-1].rock);
    temparray2.push(userstats[i-1].scissors);
    temparray2.push(userstats[i-1].paper_strategy);
    temparray2.push(userstats[i-1].rock_strategy);
    temparray2.push(userstats[i-1].scissors_strategy);
    temparray2.push(userstats[i-1].wins);
    temparray2.push(userstats[i-1].tied);
    temparray2.push(userstats[i-1].losses);
    temparray[i] = temparray2.join()
  }
  // = fileContentar
  //fs.writeFileSync('data/users.csv', temparray.join('\n'), 'utf8', function (err) {
  //});

  temparray = []
  temparray[0] = filesortar[0];
  for (var i = 1; i < filesortar.length-1; i++) {
    var temparray2 = []
    //console.log(temparray.length)
    temparray2.push(villianstats[i-1].name);
    temparray2.push(villianstats[i-1].paper);
    temparray2.push(villianstats[i-1].rock);
    temparray2.push(villianstats[i-1].scissors);
    temparray2.push(villianstats[i-1].paper_strategy);
    temparray2.push(villianstats[i-1].rock_strategy);
    temparray2.push(villianstats[i-1].scissors_strategy);
    temparray2.push(villianstats[i-1].wins);
    temparray2.push(villianstats[i-1].tied);
    temparray2.push(villianstats[i-1].losses);
    temparray[i] = temparray2.join()
  }
  // = fileContentar
  //fs.writeFileSync('data/villains.csv', temparray.join('\n'), 'utf8', function (err) {
  //});


  response.status(200);
  response.setHeader('Content-Type', 'text/html'); ////this line is causing the error "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
  //response.send(JSON.stringify(user_data))
  response.render('results', {
    user: user_data
  });

});
