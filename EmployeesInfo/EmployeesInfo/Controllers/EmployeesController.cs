using EmployeesInfo.DataModel;
using EmployeesInfo.UI;

internal class EmployeesController
{
    private IUserInterface io;
    private IDataAccessObject employeesDAO;

    public EmployeesController(IUserInterface io, IDataAccessObject employeesDAO)
    {
        this.io = io;
        this.employeesDAO = employeesDAO;
    }

    
    public async Task Initialize()
    {
        
        io.PrintData("=================== The program will display info about employees in a company! ====================");
        if (employeesDAO.CheckConnection())
        {
            PrintMainMenu();
            await ChangeMenu(GetChoice());
        }
        else
        {
            io.PrintData("Not able to connect to the database server! Try again later!");
            io.Exit();
        }
            
        

    }

    public async Task ChangeMenu(int choice)
    {

        switch (choice)
        {

            case 1:
                {
                    io.ClearScreen();
                    var result = await employeesDAO.GetAllEmployees();
                    result.ForEach(employee => io.PrintData(PrintEmployee(employee)));
                    io.PrintData("\n\n");
                    PrintMainMenu();
                    await ChangeMenu(GetChoice());
                    break;
                }
            case 2:
                {
                    io.ClearScreen();
                    io.PrintData("Insert the new employee data:");
                    var newEmployee = Insert();
                    await employeesDAO.InsertEmployee(newEmployee);
                    io.PrintData("Insert complete!\n");                   
                    PrintMainMenu();
                    await ChangeMenu(GetChoice());
                    break; 
                }
            case 3: 
                { 
                    io.ClearScreen();
                    var result = await Search();
                    io.PrintData("Insert the employee's new salary:");
                    double newSalary = GetSalary();
                    await employeesDAO.UpdateEmployee(newSalary, result.employeeID);
                    io.PrintData("Update Complete!\n");
                    PrintMainMenu();
                    await ChangeMenu(GetChoice());
                    break;
                }
            case 4: 
                { 
                    io.ClearScreen();
                    var result = await Search();
                    io.PrintData("You will delete employee : ");
                    io.PrintData(PrintEmployee(result));
                    io.PrintData("Are you sure (y/n) :");
                    if (Confirm() == true)
                    {
                        await employeesDAO.DeleteEmployee(result.employeeID);
                        io.PrintData("Delete complete!\n");
                    }
                    else io.PrintData("Back to main menu!\n");                    
                    PrintMainMenu();
                    await ChangeMenu(GetChoice());
                    break; 
                }
            case 5:
                {
                    io.ClearScreen();
                    await AdvancedQuery();
                    break;
                }
            case 0:
                {
                    io.Exit();
                    break;
                }
        }
    }
    private Employee Insert()
    {
        double salary = 0d;     
        io.PrintData("First Name :");        
        string firstName = ReadInput();
        io.PrintData("Last Name:");
        string lastName = ReadInput();
        io.PrintData("Position:");
        string position = ReadInput();
        io.PrintData("Departament:");
        string departament = ReadInput();
        io.PrintData("Salary:");
        salary = GetSalary();        

        return new Employee()
        {
            FirstName = firstName,
            LastName = lastName,
            Position = position,
            DepartamentName = departament,
            Salary = salary           
        };

    }
    private string ReadInput()
    { 
        string output = string.Empty;
        string input = io.GetInput();
        if (input != null)
        {
            output = char.ToUpper(input[0]) + input.Substring(1).ToLower();
        }
        else
        {
            io.PrintData("No field can be left empty! Try again!");
            ReadInput();
        }
        return output;
    }
    private async Task<Employee> Search()
    {
        Employee? employee = new Employee();
        int input = 0;
        io.PrintData("Write the name of the employee you want to work with:");
        string name = ReadInput();
        var result = await employeesDAO.GetEmployeebyName(name);
        if (result != null && result.Count == 1)
            employee = result.FirstOrDefault();
        else if (result != null && result.Count > 1)
        {
            io.PrintData("There are more then 1 employee with that name:");
            int i = 1;
            foreach (var item in result)
            {
                io.PrintData($"{i}. {item.FirstName} {item.LastName}");
                i++;
            }
            io.PrintData($"Insert the corresponding position in the list of the desired employee you want to work with (1 to {result.Count + 1} :)");
            input = GetChoice();
            employee = result.ElementAt(input - 1);
        }
        else
        {
            io.PrintData("No employee found with that name!");
            await Search();
        }
        return employee;

    }
    private int GetChoice()
    {
        int choice = 0;        
        try { choice = int.Parse(io.GetInput()); }
        catch 
        { 
            io.PrintData("Input not in correct format.Try again!");
            GetChoice();
        }
        return choice;
    }
    private bool Confirm()
    {
        bool result = false;
        string input = io.GetInput();
        if (input != null && input.Equals("y"))
            result = true;
        else if (input != null && input.Equals("n"))
            result = false;
        else
        {
            io.PrintData("Input not in correct format ( y or n) ! Try again!");
            Confirm();
        }
        return result;
    }
    private double GetSalary()
    {
        double result = 0d;
        try { result = Convert.ToDouble(io.GetInput()); }
        catch 
        { 
            io.PrintData("Salary not in accepted format (xxxx or xxx.xx) !");
            GetSalary();
        }
        return result;
    }
    private void PrintMainMenu()
    {
        io.PrintData("=======================================================");
        io.PrintData("Choose an option below:");
        io.PrintData("1.Show All Employees");
        io.PrintData("2.Insert New Employee");
        io.PrintData("3.Update Existing Employee");
        io.PrintData("4.Delete Existing Employee");
        io.PrintData("5.Advanced query");
        io.PrintData("");
        io.PrintData("0. Exit");
        io.PrintData("=======================================================");
    }
    private string PrintEmployee(Employee employee)
    {
        return $"Employee ID {employee.employeeID}  =>  {employee.FirstName + " " + employee.LastName}   =>   Works as {employee.Position}" +
                                         $" on {employee.DepartamentName} departament with a salary of {employee.Salary}$.";
    }
    private async Task AdvancedQuery()
    {
        io.PrintData("Select query:");
        io.PrintData("1.Show all employees that work on a specific Departament");
        io.PrintData("2.Show all employees with salary greater then");
        io.PrintData("3.Show all employees with salary less then");
        io.PrintData("0.Back to main menu\n\n");
        int choice = GetChoice();
        switch (choice)
        {
            case 1:
                {
                    io.ClearScreen();
                    io.PrintData("Insert departament name:");
                    var result = await employeesDAO.GetAllByDepartament(ReadInput());
                    if (result != null)
                    {
                        foreach (var item in result)
                            io.PrintData(PrintEmployee(item));
                    }
                    else
                        io.PrintData("No entries found!\n");
                    await AdvancedQuery();
                    break;
                }
            case 2:
                {
                    io.ClearScreen();
                    io.PrintData("Insert salary:");
                    var result = await employeesDAO.GreatherThen(GetSalary());
                    if (result != null)
                    {
                        foreach (var item in result)
                            io.PrintData(PrintEmployee(item));
                    }
                    else
                        io.PrintData("No entries found!\n");
                    await AdvancedQuery();
                    break;
                }
            case 3: 
                {
                    io.ClearScreen();
                    io.PrintData("Insert salary:");
                    var result = await employeesDAO.LessThen(GetSalary());
                    if (result != null)
                    {
                        foreach (var item in result)
                            io.PrintData(PrintEmployee(item));
                    }
                    else
                        io.PrintData("No entries found!\n");
                    await AdvancedQuery();
                    break;
                }
            case 0:
                {
                    PrintMainMenu();
                    await ChangeMenu(GetChoice());
                    break;
                }
        }
    }
}