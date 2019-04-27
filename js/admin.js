$(document).ready(function () {
    $('select').formSelect();
    $('.tooltipped').tooltip();
});


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

var trackingBoardRef = database.ref('tracking_board');
var trackingBoardNewRef = database.ref('tracking_board/new');
var salespersonRef = database.ref('Salespersons');
var dailyBoardRef = database.ref('daily_board');

var salesBySold = salespersonRef.orderByChild('cars_sold');

salesBySold.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        let dayDividedByMonth = current_date / days_in_month;
        let tracking_sold_math = childData.cars_sold / dayDividedByMonth;
        var cls = '';
        if (tracking_sold_math < childData.goal) {
            cls = 'red-text';
        } else {
            cls = 'green-text';
        };

        $('#sp_admin_tbody').append(`
          <tr>
              <td>${childData.name}</td>
              <td id='cars_sold' class="${cls}">${childData.cars_sold}</td>
              <td>${childData.goal}<td>
          </tr>
      `);

        console.log(childData.name + ' is Tracking: ' + tracking_sold_math)
    });
});

$("#add-daily_board").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    salesperson = $("#salesperson_name-input").val().trim();
    customer = $("#customer_name-input").val().trim();
    new_or_used = $('#new_or_used-input option:selected').text();
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

$("#update-sold-counter").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#salesperson_name-update").val().trim();
    cars_sold_update = $("#salesperson_sold-update").val().trim();

    salespersonRef.orderByChild('name').equalTo(name).on("value", function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            childData.update({
                cars_sold: cars_sold_update,
            })
    });
    });

    // // Code for "Setting values in the database"
    // dailyBoardRef.push({
    //     name: name,
    //     cars_sold: cars_sold,

    // });
});

$('#update_new-counter').one('click', function (event) {
    event.preventDefault();

       let updated_new_counter = parseInt($('#new_sold-update').val().trim());

    trackingBoardRef.once("value", function(snapshot) {
        if (updated_new_counter == '') {
            console.log('New Cars remained the same.')
        } else {
            trackingBoardRef.update({
                new: updated_new_counter,
            })
        };
    });
});

$('#update_used-counter').one('click', function (event) {
    event.preventDefault();

       let updated_used_counter = parseInt($('#used_sold-update').val().trim());
     
        if (updated_used_counter == '') {
            console.log(updated_used_counter);
        } else {
            trackingBoardRef.update({
                used: updated_used_counter,
            })
        };
});


$("#reset_sales_board").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes

    placeholder = '**Do NOT Delete**';

    console.log('Reset Daily Board');
    console.log(dailyBoardRef.child('Placeholder').salesperson)

    // Code for "Setting values in the database"

    dailyBoardRef.set({
        placeholder: placeholder,
    });
});