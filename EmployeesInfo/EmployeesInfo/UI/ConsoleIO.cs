using EmployeesInfo.UI;

public class ConsoleIO : IUserInterface
{
    public void Exit()
    {
        System.Environment.Exit(0);
    }

    public string GetInput()
    {
        return Console.ReadLine();
    }

    public void PrintData(string output)
    {
        Console.WriteLine(output);
    }
    
    public void ClearScreen()
    { 
    System.Console.Clear();
    }

    
}