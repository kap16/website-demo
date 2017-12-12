/* CREATES AND INSERTS */
CREATE DATABASE supermarket;

CREATE TABLE products(
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO products VALUES(1,"Wholewheat Bread",0.79);
INSERT INTO products VALUES(2,"PG tips Pyramid Tea Bags",3.0);
INSERT INTO products VALUES(3,"Oaklands Grape fruit",0.39);
INSERT INTO products VALUES(4,"Chicago Town Takeaway Pepperoni Pizza",3.0);
INSERT INTO products VALUES(5,"Deluxe 2 Lamb Wellingtons",5.99);
INSERT INTO products VALUES(6,"Ben & Jerry's Ice Cream Peanut Butter Cup 500ml",0.5);
INSERT INTO products VALUES(7,"Princes Tuna Chunks in Spring Water 4x160g ",4.0);
INSERT INTO products VALUES(8,"Tropicana Smooth Orange Juice 1.6L",2.0);
INSERT INTO products VALUES(9,"Vita Coco Coconut Water 1L",2.5);
INSERT INTO products VALUES(10,"Copella Apple And Elderflower Juice 900 Ml",2.0);