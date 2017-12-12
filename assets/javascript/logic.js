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
// console.log(newTrain.name);
// console.log(newTrain.destination);
// console.log(newTrain.start);
// console.log(newTrain.frequency);

// alert("Train added");

// clears inputs after submission

$("#trainName").val("")
$("#destination").val("")
$("#startDepart").val("")
$("#departCycle").val("")

});

// create firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    // console.log(childSnapshot.val());
//   storing to a variable   
    var trainTitle =childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
    // logging train info
    // console.log(trainTitle);
    // console.log(trainDest);
    // console.log(trainStart);
    // console.log(trainFreq);
// current time display
var now = moment();
$("#currTime").text(moment(now).format("h:mm a"));
// console.log("hi, the time is " +moment(now).format("hh:mm"));

// Using moment to calculate the next train arrival based on current time
     
    // times need to be converted from military time (as entered by the user)
    var milTimeConv = moment(trainStart,"hh:mm a").subtract(1, "years");
    // console.log("This is the Conversion " +milTimeConv);

    // after first train conversion, subtract it from the current time to find the time difference
   var timeDiff = moment().diff(moment(milTimeConv), "minutes");
//    console.log(timeDiff +" is the difference");

    // calculate the frequency of the trains
    var timeRemainder = timeDiff % trainFreq;
    // console.log(timeRemainder + " is the remainder");

// min till next train
    var timeNextArr = trainFreq - timeRemainder;
    console.log("Next train in " + timeNextArr+ " mins");

    // add each train's data into the table
    $("#trainTable > tbody").prepend("<tr><td>" +trainTitle+ "</td><td>" +trainDest+ "</td><td>" +trainStart+"</td><td>"+trainFreq+ " mins"+"</td><td>" +timeNextArr+ " mins"+ "</td>");





})


