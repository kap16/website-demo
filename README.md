# Website Demo #

### What is this repository for? ###

* This is a small web app to demo SQL injection for a (Final year) University Module.
* **Scenario**: There is an sql injection vulnerability for a supermarket that uses a MySQL server. I want to exploit this by injecting code into the products table for this supermarket and change the prices for goods.
* **PLEASE NOTE**: this repo is only for demo purposes and the code should not be used for malicous intent.

### How do I get set up? ###

* Ensure that you have the latest version of Nodejs installed
* Have an instance of MySQL installed on your machine (v5 or later to be on the safe side). This guide will be using XAMPP (phpMyAdmin)
* Download a copy of the repo
* run ```npm install```

### How do I use it
 
1. Start your MySQL server by clicking 'Start' next to Apache and MySQL
2. Copy and paste the quiries stored in the ```mock.sql``` file into phpMyAdmin to populate the database.
3. Put all the necessary credentials in the config.js file
    - ensure that you have login credentials for your instance of mysql and the ```supermarket``` database created if you havent already
4. Run ``` npm start ``` in the to start the server.
5. Visit ```localhost:4050/``` in your web browser.
6. In the search bar, paste in an sql query e.g. ```UPDATE products SET price = 79.99 WHERE id = 1;```
7. Click Show all (This should update the page with all the current data).
