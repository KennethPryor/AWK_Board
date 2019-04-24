$(document).ready(function () {
  $('select').formSelect();
});
// Initialize Firebase

console.log('This was made by Kenneth Pryor')

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


var trackingBoardRef = database.ref('tracking_board');
var trackingBoardNewRef = database.ref('tracking_board/new');
var salespersonRef = database.ref('Salespersons');
var dailyBoardRef = database.ref('daily_board');

var salesBySold = salespersonRef.orderByChild('cars_sold');

salesBySold.on('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var key = childSnapshot.key;
    var childData = childSnapshot.val();

    let dayDividedByMonth = current_date/days_in_month;
    let tracking_sold_math = childData.cars_sold/dayDividedByMonth;

    $('#salesperson_tbody').append(`
        <tr>
            <td>${childData.name}</td>
            <td">${childData.cars_sold}</td>
            <td>${childData.goal}<td>
        </tr>
    `);

    console.log(childData.name + ' is Tracking: ' + tracking_sold_math)
  });
});

$("#reset_sales_board").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  salesperson = 'This is A';
  customer = 'Place Holder Until';
  stock_num = 'We Sell Something';
  trade = 'TODAY!!!!';

  // Code for "Setting values in the database"
  dailyBoardRef.child('Placeholder').set({
    salesperson: salesperson,
    customer: customer,
    stock_num: stock_num,
    trade: trade,
  });
});

dailyBoardRef.on('value', function (snapshot) {
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

