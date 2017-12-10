// setting up firebase
var config = {
    apiKey: "AIzaSyD-gP7mpGYkgNAXRo1ELWODB-Br-lnVk44",
    authDomain: "traintime-cb631.firebaseapp.com",
    databaseURL: "https://traintime-cb631.firebaseio.com",
    projectId: "traintime-cb631",
    storageBucket: "traintime-cb631.appspot.com",
    messagingSenderId: "200248359242"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// Captures user input from form fields
$("#submit-button").on("click", function(event){
    event.preventDefault();
    var trainAdd = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var startDepart = $("#startDepart").val().trim();
    var departCycle = $("#departCycle").val().trim();
    

// creates local tmeporary object for holding train data
var newTrain = {
    name: trainAdd,
    destination: destination,
    start: startDepart,
    frequency: departCycle
};
// uploads train data to the database
database.ref().push(newTrain);
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.frequency);

alert("Train added");

// clears inputs after submission

$("#trainName").val("")
$("#destination").val("")
$("#startDepart").val("")
$("#departCycle").val("")

});

// create firebase event for adding emplyee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());
//   storing to a variable   
    var trainTitle =childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
    // logging employee info
    console.log(trainTitle);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);

    // add each train's data into the table
    $("#trainTable > tbody").append("<tr><td>" +trainTitle+ "</td><td>" +trainDest+ "</td><td>" +trainStart+"</td><td>"+trainFreq+"</td><td");


})