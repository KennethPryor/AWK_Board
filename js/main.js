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

// Initial Values
var name = "";
var cars_sold = "";

var salespersonRef = database.ref('Salespersons');
var trackingBoardRef = database.ref('tracking_board');
var dailyBoardRef = database.ref('daily_board');

salespersonRef.once('value')
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      $('#salesperson_tbody').append(`
        <tr>
            <td>${childData.name}</td>
            <td>${childData.cars_sold}</td>
        </tr>
    `);
    });
  });

// Capture Button Click
$("#add-user").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  name = $("#name-input").val().trim();

  // Code for "Setting values in the database"
  salespersonRef.push({
    name: name,
    cars_sold: 0,
  });

});

$("#add-daily_board").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  salesperson = $("#salesperson_name-input").val().trim();
  customer = $("#customer_name-input").val().trim();
  stock_num = $("#stock_num-input").val().trim();
  trade = $("#trade_in-input").val().trim();

  // Code for "Setting values in the database"
  dailyBoardRef.push({
    salesperson: salesperson,
    customer: customer,
    stock_num: stock_num,
    trade: trade,
  });
});

dailyBoardRef.once('value')
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      $('#daily_board-tbody').append(`
        <tr>
            <td>${childData.salesperson}</td>
            <td>${childData.customer}</td>
            <td>${childData.stock_num}</td>
            <td>${childData.trade}</td>
        </tr>
    `);
    });
  });

// Firebase watcher + initial loader HINT: .on("value")
salespersonRef.on("value", function (snapshot) {

  // Change the HTML to reflect
  $("#name-display").text(snapshot.val().name);
  $("#cars_sold-display").text(snapshot.val().cars_sold);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

trackingBoardRef.on("value", function (snapshot) {

  $("#new-display").text(snapshot.val().new);
  $("#tracking_new-display").text(snapshot.val().tracking_new);
  $("#used-display").text(snapshot.val().used);
  $("#tracking_used-display").text(snapshot.val().tracking_used);
  $("#total_sold-display").text(snapshot.val().total_sold);
  $("#tracking_total-display").text(snapshot.val().tracking_total);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// day of the month/days in the month

// /amount of cars sold

// =tracking number