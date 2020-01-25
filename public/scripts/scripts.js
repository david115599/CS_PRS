var player_name = localStorage.getItem("player_name");
var fs = require('fs');


if(!player_name){
  showOrNot(document.getElementById("enter_name"), true);
}else {
  updateNames(player_name);
  showOrNot(document.getElementById("throw_choice"), true);
}

///////////////////Event Listions//////////////////
toggleVisibility(document.getElementById("show_rules_button"), document.getElementById("rules"));
toggleVisibility(document.getElementById("show_stats_button"), document.getElementById("stats"));

document.getElementById("enter_name_button").addEventListener("click", function(){
  var p_name=document.getElementById("enter_name_input").value;
  localStorage.setItem("player_name",p_name);
  showOrNot(document.getElementById("enter_name"), false);
  showOrNot(document.getElementById("throw_choice"), true);
  updateNames(p_name);
});

///////////////////Helper function//////////////////
function updateNames(name){
  var name_spots=document.getElementsByClassName("player_name_span");
  for(var i=0; i<name_spots.length;i++){
    console.log(name_spots[i]);
    name_spots[i].innerHTML = name;
  }
}

function showOrNot(div_element, show){
  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }else if(!show && div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
    }
}

function toggleVisibility(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
  });
}
function script(vill) {

var answer;
if ((document.getElementById("vchoice").value) == "Bones") {
answer = "is known for bieng attacked and eaten by dogs when he walks down the street";
}
if ((document.getElementById("vchoice").value) == "Comic Hans") {
answer = "the son of Comic Sans and has horrible handwriting";
}
if ((document.getElementById("vchoice").value) == "Gato") {
answer = "Gato is Gato and tends to purr and hide when humans approach";
}
if ((document.getElementById("vchoice").value) == "Harry") {
answer = " has dropped out of wizarding school and now makes a living of PRS and does side jobs for voldimort";
}
if ((document.getElementById("vchoice").value) == "Manny") {
answer = "Plays PRS becuase he plans to take over the world with his statistics";
}
if ((document.getElementById("vchoice").value) == "Mickey") {
answer = "is trying to Purchase PRS for Disney Inc";
}
if ((document.getElementById("vchoice").value) == "Mr. Modern") {
answer = "is compensating for using depricated methods";
}
if ((document.getElementById("vchoice").value) == "Pixie") {
answer = "was expelled from wizarding school for distributing dust";
}
if ((document.getElementById("vchoice").value) == "Regal") {
answer = "has lost all of his lands and titles";
}
if ((document.getElementById("vchoice").value) == "Spock") {
answer = "Intends to live long and prosper by playing PRS";
}
if ((document.getElementById("vchoice").value) == "The Boss") {
answer = " is currently peeling potatoes in the kitchen becuase of his demotion";
}
if ((document.getElementById("vchoice").value) == "The Magician") {
answer = " == discount dumbledore";
}
  document.getElementById("waiting").innerHTML = '<img src= "/images/'+(document.getElementById("vchoice").value).replace(" ","_").replace(".","")+'_waiting.svg"alt="Image" height="42" width="42"> <h2>Background:</h2> <h2>'+(document.getElementById("vchoice").value)+'  '+answer+'</h2>';
}

function ref(ref) {
  document.getElementById("wait").innerHTML = '<img src= "/images/ref/watch.svg"alt="Image" height="42" width="42">';
}
