DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT  NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price decimal(10,4) NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "apples", "produce", 1.50, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "bananas", "produce", 1.00, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "mangoes", "produce", 3.00, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "steak", "meat", 10.00, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "bacon", "meat", 5.00, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "pork", "meat", 5.50, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "crab", "seafood", 18.00, 18);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "salmon", "seafood", 7.00, 22);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "chocolate", "candy", 2.50, 125);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "shockers", "candy", 3.00, 200);

SELECT * FROM products;