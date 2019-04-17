 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD53WlXc8pGKKZKLtmzlYYqvGgp0FWJA5Q",
    authDomain: "awk-board.firebaseapp.com",
    databaseURL: "https://awk-board.firebaseio.com",
    projectId: "awk-board",
    storageBucket: "awk-board.appspot.com",
    messagingSenderId: "736569817172"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

console.log(database);

  // Initial Values
  var name = "";
  var cars_sold = "";

  // Capture Button Click
  $("#add-user").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#name-input").val().trim();
    cars_sold = $("#cars_sold-input").val().trim();

    // Code for "Setting values in the database"
    database.ref().set({
      name: name,
      cars_sold: cars_sold,
    });

  });

  // Firebase watcher + initial loader HINT: .on("value")
  database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().cars_sold);
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#cars_sold-display").text(snapshot.val().cars_sold);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


// salespersonArray.forEach(function (i) {

//     $('#salesperson_tbody').append(`
//         <tr>
//             <td>${$("#name-display").text(snapshot.val().name)}</td>
//             <td>${$("#cars_sold-display").text(snapshot.val().cars_sold)}</td>
//         </tr>
//     `);
// });

// day of the month/days in the month

// /amount of cars sold

// =tracking number