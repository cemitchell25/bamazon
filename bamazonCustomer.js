var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"

});


connection.connect(function(err) {

	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	queryAllProducts();

});

function queryAllProducts() {

	connection.query("SELECT * FROM products", function(err, res) {

		if (err) throw err;

		for (var i = 0; i < res.length; i++) {

			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);

		}
		console.log("-----------------------------------");

	});

	productRequest();
}

function productRequest() {

	inquirer
	.prompt({
		name: "id",
		type: "input",
		message: "What is the ID of the product you would like to buy?"
	},

	{
		name: "quantity",
		type: "input",
		message: "How many would you like to buy?"
	})

	.then(function (id, quantity){

		connection.query('SELECT * FROM Products WHERE item_id = ' + id, function (err, result){
			if (err) throw err;

			if (result[0].stock_quantity - quantity >= 0) {
				// console.log("Bamazon's Inventory has enough of that item "result[0].product_name + "!");
				console.log("Quantity in Stock: "+ result[0].stock_quantity + " Order Quantity: "+ quantity);
				console.log("Cost is " + (order.quantity * result[0].Price) +  " dollars.");

				connection.query('UPDATE products SET StockQuantity=? WHERE id=?', [result[0].stock_quantity - quantity, item_id],

					function(err, inventory) {

						if (err) throw err;
						queryAllProducts();
					});

			}

			else {
				console.log("Bamazon only has "+ result[0].stock_quantity + " " + result[0].product_name + " in stock at this moment.");
				queryAllProducts();
			}
		});
	});
};




