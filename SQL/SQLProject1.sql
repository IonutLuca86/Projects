
----------------------------------------- Create Database -----------------------------------------

	--Creates CompanyInfo Database if not exist
	If Not Exists (Select * From sys.databases Where name='CompanyInfo')
	Begin
		Create Database CompanyInfo
	End
	Go
	--set to use the new created databse
	Use CompanyInfo

----------------------------------------- Create Tables --------------------------------------------
Begin Try
	Begin Transaction
	--creates a new Table that store the company names and info
	Create Table Company(
				CompanyID int Not null Identity(1,1) Primary Key,
				CompanyName nvarchar(50) Not Null,
				OrganisationNumber nvarchar(20) Not Null,
				MainOffice nvarchar(50) 
	);


	--creates a new Table that stores all departaments that companies (can) have
	Create Table Departament (
				DepartamentID int Not Null Identity(10,1) Primary Key,
				DepartamentName nvarchar(50) Not Null,
				CompanyID int Not Null References Company(CompanyID)
	);


	--creates a new Table that stores all jobbs titles that can be found on all companies
	Create Table Position (
				JobID int Not Null Identity(100,1) Primary Key,
				JobName nvarchar(50) Not Null,
				JobDescription nvarchar(100) 
	);


	--creates a new table that stores all employee info from all companies
	Create Table Employee (
				EmployeeID int Not Null Identity(1000,1) Primary Key,
				FirstName nvarchar(50) Not Null,			
				LastName nvarchar(50) Not Null,
				DepartamentID int Not Null References Departament(DepartamentID),
				Salary money Not Null,
				UnionMember bit Not Null
	);

	--creates a new table that stores all relations between each employee and its jobb titles
	Create Table Econnect (
				EmployeeID int Not Null References Employee(EmployeeID),
				JobID int Not Null References Position(JobID),				
				Primary key (EmployeeID,JobID)
	);

	Commit Transaction
End Try
Begin Catch
	Rollback Transaction
	Print 'Error create:' + Error_Message();
End Catch

----------------- Insert Data into Tables ----------------------------------
Begin Try
	Begin Transaction

	--inserts data into Company Table
	Insert Into Company (CompanyName,OrganisationNumber,MainOffice)
		Values('Company1','08-123456','Stockholm'),
			  ('Company2','01-123456','Oslo'),
			  ('Company3','12-456789','Helsinki'),
			  ('Company4','31-123456','Köpenhamn');

	--inserts data into Departament Table
	Insert Into Departament (DepartamentName,CompanyID)
		Values('Administration',1),('Marketing',1),('HR',1),('Accounting',1),('IT',1),('Legal',1),('Production',1),('Engineering',1),
			  ('Administration',2),('Marketing',2),('HR',2),('Accounting',2),('IT',2),('Legal',2),('Production',2),('Engineering',2),
			  ('Administration',3),('Marketing',3),('HR',3),('Accounting',3),('IT',3),('Legal',3),('Production',3),('Engineering',3),
			  ('Administration',4),('Marketing',4),('HR',4),('Accounting',4),('IT',4),('Legal',4),('Production',4),('Engineering',4);
		

	--inserts data into Jobs table
	Insert Into Position(JobName,JobDescription)
		Values('CEO','The high chief'),
			  ('Accountant','Money Handler'),
			  ('HR manager','I love humans'),
			  ('C# Developer','Company geek'),
			  ('Sales Representative','Can sell anything'),
			  ('Product manager','the little boss'),
			  ('Lawyer','Keeps trouble away'),
			  ('Maintenance personnel','Everything needs to be clean'),
			  ('Network engineer','http'),
			  ('Production Engineer','Another geek'),
			  ('IT specialist','TechSupport'),
			  ('Intership personnel','Soon to be developer');

	--insert data into Employee table
	Insert into Employee (FirstName,LastName,DepartamentID,Salary,UnionMember)
		Values('FName','LName', 10,100000,0), ('FName1','LName1', 11,40000,1),
			  ('FName2','LName2', 12,50000,1),('FName3','LName3', 13,50000,1),
			  ('FName4','LName4', 15,70000,0),('FName5','LName5', 16,45000,0),
			  ('FName6','LName6', 17,44000,1),('FName7','LName7', 10,25000,1),
			  ('FName8','LName8', 14,45000,0),('FName9','LName9', 14,35000,1),
			  ('FName10','LName10', 14,40000,1),('FName11','LName11', 11,35000,0),
			  ('FName12','LName12', 11,30000,1),('FName13','LName13', 22,0,0),
			  ('FName14','LName14', 30,30000,1),('FName15','LName15', 22,30000,0),
			  ('FName16','LName16', 18,30000,0),('FName17','LName17', 20,30000,1),
			  ('FName18','LName18', 19,30000,0),('FName19','LName19', 22,30000,1),
			  ('FName20','LName20', 23,30000,0),('FName21','LName21', 18,30000,1),
			  ('FName22','LName22', 26,30000,0),('FName23','LName23', 34,30000,1);

	--inserts data into Positions table
	Insert into Econnect(EmployeeID,JobID)
		Values(1000,100),(1001,104),(1002,102),(1003,101),(1004,106),(1005,105),(1006,109),(1007,108),
			  (1008,103),(1009,103),(1010,104),(1011,110),(1012,111),(1013,111),(1014,110),(1015,110),
			  (1016,100),(1017,102),(1018,101),(1019,103),(1020,106),(1021,107),(1022,107),(1023,107);
	Commit Transaction
End Try
Begin Catch
	Rollback Transaction
	Print 'Error insert:' + Error_Message();
End Catch

--------------------- Create Procedures ------------------------------------

--show all Employees
Create Procedure spShowEmployees
AS
Select e.EmployeeID,
	   e.FirstName,
	   e.LastName,
	   e.Salary,
	   j.JobName as 'Position',
	   j.JobDescription,
	   d.DepartamentName as 'Departament',
	   c.CompanyName as 'Company',
	   c.MainOffice as 'Office'
From Employee e
Inner Join Econnect p On e.EmployeeID = p.EmployeeID
Inner Join Position j On p.JobID = j.JobID
Inner Join Departament d On e.DepartamentID=d.DepartamentID
Inner Join Company c On d.CompanyID=c.CompanyID

------------------------------------------------------------------------------------------
--insert new Employee
Create Procedure spInsertEmployee
@FirstName nvarchar(50),
@LastName nvarchar(50),
@DepID int,
@JobID int,
@Salary money,
@Union bit
AS
Begin Transaction
Insert into Employee (FirstName,LastName,DepartamentID,Salary,UnionMember)
	Values(@FirstName,@LastName,@DepID,@Salary,@Union)
Insert into Econnect(EmployeeID,JobID)
	Values((Select EmployeeID 
			from Employee Where EmployeeID=SCOPE_IDENTITY()),
			@JobID)
Commit Transaction

----------------------------------------------------------------------------------------
-- show only specific employees
Create Procedure spEmployee
@ID int
AS
Select e.EmployeeID,
	   e.FirstName,
	   e.LastName,
	   d.DepartamentName As 'Departament',
	   j.JobName As 'Position',
	   e.Salary
From Employee e
Inner Join Departament d on e.DepartamentID=d.DepartamentID
Inner Join Econnect p on e.EmployeeID=p.EmployeeID
Inner Join Position j on p.JobID=j.JobID
Where e.EmployeeID=@ID


----------------------------------------------------------------------------------------
--remove employee
Create Procedure spDeleteEmployee
@ID int
As
Begin Transaction
Delete from Econnect Where EmployeeID=@ID
Delete from Employee Where EmployeeID=@ID
Commit Transaction
-------------------------------------------------------------------------------------
--update employee
Create Procedure spUpdateSalary
@ID int,
@NewSalary int
AS
Begin Transaction
Update Employee
Set Salary=@NewSalary
Where EmployeeID=@ID
Commit Transaction
-------------------------------------------------------------------------------------------------

Exec spShowEmployees

Begin Try
	Begin Transaction
		
		Exec spInsertEmployee 'John','Doe',15,106,45000,0
		Exec spInsertEmployee 'Jane','Doe',15,106,45000,0
		Exec spInsertEmployee 'Carl','Doe',15,106,45000,0	

	Commit Transaction
	Select e.FirstName,
			   e.LastName,
			   j.JobName,
			   j.JobDescription
		From Employee e
		Inner Join Econnect p On e.EmployeeID = p.EmployeeID
		Inner Join Position j on p.JobId = j.JobID
		Where e.LastName like '%Doe' 
End Try
Begin Catch
	Rollback Transaction
	Print 'Error inserting' + Error_Message()
End Catch

Exec spShowEmployees

Begin Try
	Begin Transaction

	Exec spUpdateSalary 1026,10000
	Exec spUpdateSalary 1025,50000
	
	Commit Transaction
	Select e.FirstName,
		   e.LastName,
		   j.JobName,
	       j.JobDescription,
		   e.Salary
	From Employee e
	Inner Join Econnect p On e.EmployeeID = p.EmployeeID
	Inner Join Position j on p.JobId = j.JobID
	Where e.LastName like '%Doe' 

End Try
Begin Catch
	Rollback Transaction
	Print 'Error' + Error_Message()
End Catch


Begin Try
	Begin Transaction

	Exec spDeleteEmployee 1026
	Exec spDeleteEmployee 1025
	
	Commit Transaction
	Select e.FirstName,
		   e.LastName,
		   j.JobName,
	       j.JobDescription,
		   e.Salary
	From Employee e
	Inner Join Econnect p On e.EmployeeID = p.EmployeeID
	Inner Join Position j on p.JobId = j.JobID
	Where e.LastName like '%Doe' 

End Try
Begin Catch
	Rollback Transaction
	Print 'Error' + Error_Message()
End Catch
Exec spEmployee 1000

--Exec spUpdateSalary 1000,95000
