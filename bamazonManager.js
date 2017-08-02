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

function managerStart() {

	inquirer
	.prompt({
		name: "action",
		type: "list",
		message: "Hello! What would you like to do?",
		choices: ["View products for sale", 'View low inventory', "Add to inventory", "Add a new product", 'Exit']

	}).then(function(answer) {
		switch (answer.action) {
			case 'View products for sale':
			showInventory();
			break;

			case 'View low inventory':
			lowInventory();
			break;

			case 'Add to inventory':
			addInventory();
			break;

			case 'Add a new product':
			newProduct();
			break;
                //THIS IS AN EXTRA CHOICE ADDED TO EXIT THE NODE RUNNING
                case 'Exit':
                connection.end();
                break;

                default:
                console.log("Command not valid. Please try again!");

            }
        })
};

function showInventory(){

	connection.query("SELECT * FROM products", function(err, res) {

		for (var i = 0; i < res.length; i++) {

			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);

		}
		console.log("-----------------------------------");

	});

	managerStart();
}

function lowInventory(){

	connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res) {

		if (err) throw err;
		console.log("Bamazon's Inventory");

		for(var i = 0; i < res.length; i++) {

			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);

		}

		console.log("-----------------------------------");

	})

	managerStart();

};

function addInventory(){

	inquirer
	.prompt([
	{
		type: "input",
		message: "What is the id of the item you would like to add to?",
		name: "itemId"
	},
	{
		type: "input",
		message: "What is the quantity?",
		name: "amount"
	}

	]).then(function (request) {

		connection.query('SELECT * FROM products WHERE item_id=' + request.itemId, function(err, item) {

			if (err) throw err;

			console.log("You have added " + request.amount + " " + item[0].product_name + " to the inventory.");

			connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [item[0].stock_quantity + Number(request.amount), request.itemId],

				function(err, inventory) {

					if (err) throw err;

					showInventory();

				})
		})

	});

	managerStart()

};

function newProduct() {

	inquirer
	.prompt([

	{
		type: "input",
		message: "What name of the product you would like to add?",
		name: "product_name"
	},
	{
		type: "input",
		message: "What department?",
		name: "department_name"
	},
	{
		type: "input",
		message: "Price of the item?",
		name: "price"
	},
	{
		type: "input",
		message: "Quantity?",
		name: "stock_quantity"
	}

	]).then(function (newProd) {

		connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",[newProd.product_name, newProd.department_name, newProd.price, newProd.stock_quantity],
			function(err, inventory) {
				if (err) throw err;

				console.log(newProd.product_name + " has been added to the inventory.");
				showInventory();
			});  

	}); 

	managerStart();
};  



managerStart();

