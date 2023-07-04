using EmployeesInfo.UI;
using System.Diagnostics;
using System.Runtime.InteropServices.ComTypes;

public class Program
{
    private static async Task Main(string[] args)
    {
        IUserInterface io;
        IDataAccessObject employeesDAO;
        

        string connectionString = File.ReadAllText("D:\\ITHS_repositories\\EmployeesInfo\\EmployeesInfo\\MongoDataAccess\\ConnectionString.txt");
        io = new ConsoleIO();       
        employeesDAO = new MongoDAO("EmployeesInfo", connectionString);
        

        EmployeesController employeesController = new EmployeesController(io, employeesDAO);
        await employeesController.Initialize();
    }
}