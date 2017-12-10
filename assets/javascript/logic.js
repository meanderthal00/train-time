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
    

// creates local tmeporary object for holding Employee data
var newEmp = {
    name: employee,
    role: role,
    start: startD,
    rate: payRate
};
// uploads emplyee data to the database
database.ref().push(newEmp);
console.log(newEmp.name);
console.log(newEmp.role);
console.log(newEmp.start);
console.log(newEmp.rate);

alert("Employee added");

$("#employee-name").val("")
$("#role").val("")
$("#start-date").val("")
$("#monthly-rate").val("")

});

// create firebase event for adding emplyee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());
//   storing to a variable   
    var empName =childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().startD;
    var empRate = childSnapshot.val().payRate
    // logging employee info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    // add each train's data into the table
    $("#empTable > tbody").append(`<tr><td>${empName}</td><td>${empRole}</td><td>${empStart}</td><td>${empStart}</td><td>${empRate}</td></tr>`);


})