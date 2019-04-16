function salesperson(name,cars_sold) {
    this.name = name;
    this.cars_sold = cars_sold;
};
let Ifeanyi = new salesperson(
    'Ifeanyi',
    'XXXXXXXXXXXXXXXXX',
);
let Steve = new salesperson(
    'Steve',
    '9.5',
);
let Pierre = new salesperson(
    'Pierre',
    '6',
);
let Val = new salesperson(
    'Val',
    '3',
);
let Queen = new salesperson(
    'Queen',
    '2.5',
);
let Norris = new salesperson(
    'Norris',
    '3.5',
);
let Kenny = new salesperson(
    'Kenny',
    '0.5',
);
let House = new salesperson(
    'House',
    '0',
);
let JQ = new salesperson(
    'JQ',
    '3.5',
);

const salespersonArray = [Ifeanyi,Steve,Pierre,Queen,Norris,Val,Kenny,JQ,House];

salespersonArray.forEach(function(i) {

    $('#salesperson_tbody').append(`
        <tr>
            <td>${i.name}</td>
            <td>${i.cars_sold.replace('[0-9]', 'X')}</td>
        </tr>
    `);
});

// day of the month/days in the month

// /amount of cars sold

// =tracking number