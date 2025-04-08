https://www.mycompiler.io/new/sql

CREATE TABLE employee(name varchar(10), age int, salary int, position varchar(10), gender varchar(10));

insert into employee values ("hello", 20, 20000, "junior", "male");

insert into employee values ("hey", 30, 30000, "senior", "male");

insert into employee values ("wow", 35, 27000, "senior", "male");

insert into employee values ("wonder", 27, 22000, "junior", "female");

insert into employee values ("thunder", 28, 40000, "senior", "female");

insert into employee values ("tender", 58, 40000, "senior", "female");



select * from employee where 25<age and age<50;

select sum(salary) from employee where position == "senior";