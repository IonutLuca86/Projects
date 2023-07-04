USE AdventureWorksLT2019

SELECT *
FROM SalesLT.Address; 

SELECT AddressID,
	   AddressLine1,
	   AddressLine2,
	   City,
	   StateProvince,
	   CountryRegion,
	   PostalCode,
	   rowguid,
	   ModifiedDate
FROM SalesLT.Address;

SELECT CustomerID,
	   FirstName,
	   LastName,
	   EmailAddress
FROM SalesLT.Customer;

SELECT Name,
	   Color,
	   ListPrice,
	   Size,
	   Weight
FROM SalesLT.Product;

SELECT Name,
	   ModifiedDate,
	   rowguid
FROM SalesLT.ProductCategory;

SELECT SalesOrderID,
	   ProductID,
	   OrderQty,
	   UnitPrice,
	   OrderQty * UnitPrice as 'Price'
FROM SalesLT.SalesOrderDetail;

SELECT FirstName + ' ' + LTRIM(ISNULL(MiddleName,'') + ' ' + RTRIM(LastName +' ' + ISNULL(Suffix,''))) As 'FullName'
FROM SalesLT.Customer;

SELECT SalesOrderID,
	   ProductID,
	   OrderQty,
	   UnitPriceDiscount,
	   UnitPrice,
	   OrderQty * (UnitPrice - UnitPriceDiscount) as 'Price'
FROM SalesLT.SalesOrderDetail;

SELECT CustomerID,
	   FirstName,
	   LastName,
	   EmailAddress
FROM SalesLT.Customer
--Where CustomerID = 10;
--Where LastName = 'Smith';
--Where ModifiedDate between '2005-11-01' and '2005-11-30';
Where LastName Like '%mm%' and (FirstName like 'K%' or FirstName like '%Y');

SELECT ProductID,
	   Name,
	   Size,
	   Weight
FROM SalesLT.Product
--WHERE Size <> NULL AND Weight = NULL;
WHERE Size IS NOT NULL AND Weight IS NULL;

SELECT AddressID,
	   AddressLine1,
	   AddressLine2,
	   City,
	   PostalCode
FROM SalesLT.Address
--WHERE AddressLine2 IS NOT NULL;
--WHERE AddressLine2 IS NULL AND City LIKE '%KEY%';
WHERE AddressLine2 Is NOT NULL OR City LIKE 'Round%';

SELECT ProductID,
	   Name AS 'Product',
	   ListPrice
FROM SalesLT.Product
WHERE ListPrice BETWEEN 100 AND 200 AND Name LIKE 'HL%'; 

SELECT *
FROM SalesLT.Product
WHERE SellStartDate BETWEEN '2005-07-01' AND '2005-07-02' AND SellEndDate IS NULL;