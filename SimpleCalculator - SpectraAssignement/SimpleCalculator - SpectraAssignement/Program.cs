






Calculator calculator = new Calculator();
Menu();


 void Menu()
{
    Console.WriteLine("Choose how do you want to do registry calculations:");
    Console.WriteLine("1.From file");
    Console.WriteLine("2.From keyboard");
    Console.WriteLine();
    string choice = Console.ReadLine();
    if (choice == "1")
    {
        String line;
        try
        {
            //Pass the file path and file name to the StreamReader constructor
            StreamReader sr = new StreamReader("D:\\Projects\\SimpleCalculator - SpectraAssignement\\SimpleCalculator - SpectraAssignement\\registryCalc.txt");
            //Read the first line of text
            line = sr.ReadLine();
            //Continue to read until you reach end of file
            while (line != null)
            {
                //write the line to console window
                calculator.CalculateFromFile(line);
                //Read the next line
                line = sr.ReadLine();
            }
            //close the file
            sr.Close();
            Console.ReadLine();
        }
        catch (Exception e)
        {
            Console.WriteLine("Exception: " + e.Message);
        }
        finally
        {
            Console.WriteLine("Executing finally block.");
        }
    }
    else if (choice == "2")
    {
        calculator.CalculateFromKeyBoard();
    }
    else
    {
        Console.WriteLine("Invalid choice! (1 or 2)");
        Menu();
    }
}

public class Calculator
{  
    private Dictionary<string,string> registries = new Dictionary<string,string>();
    public void CalculateFromKeyBoard()    {
       
        string value = Console.ReadLine();
        var valueArray = value.ToLower().Split(" ");
        if (valueArray.Length <= 2)
        {
            if (valueArray.Length == 2 && valueArray[0].Equals("print"))
            {
               
                    if (registries.TryGetValue(valueArray[1], out var registry))
                    {
                        PrintResult(int.Parse(registry));
                        CalculateFromKeyBoard();
                    }
                        
                    else
                    {
                        Console.WriteLine($"No registry with name {valueArray[0]} was found! Try Again!");
                        CalculateFromKeyBoard();
                    }

            }
            else if (valueArray.Length == 1 && valueArray[0].Contains("quit")) ;
            {
                Console.WriteLine("Quiting...");
                System.Environment.Exit(0);
            }
        }        
        else if (valueArray.Length == 3)
        {
            if (registries.TryGetValue(valueArray[0], out var registry1))
            {
                if (registries.TryGetValue(valueArray[2], out var registry2))
                {
                    registries[valueArray[0]] = RunOperation(int.Parse(registry1), int.Parse(registry2), valueArray[1]).ToString();
                    CalculateFromKeyBoard();
                }
                else
                {
                    registries[valueArray[0]] = RunOperation(int.Parse(registry1), int.Parse(valueArray[2]), valueArray[1]).ToString();
                    CalculateFromKeyBoard();
                }
            }
            else
            {
                if (!valueArray[1].Equals("add"))
                {
                    Console.WriteLine("Operation cannot be done because registry does not exist!");
                    CalculateFromKeyBoard();
                }                    
                else
                {
                    registries.Add(valueArray[0], RunOperation(0, int.Parse(valueArray[2]), valueArray[1]).ToString());
                    CalculateFromKeyBoard();
                }                           
                
            }
        }
        else
        {
            Console.WriteLine("Operation not in correct format : <registry> <operation> <value> . Try Again!");
            CalculateFromKeyBoard();
        }

    }

    public void CalculateFromFile(string value)
    {        
        var valueArray = value.ToLower().Split(" ");
        if (valueArray.Length <= 2)
        {
            if (valueArray.Length == 2 && valueArray[0].Equals("print"))
            {

                if (registries.TryGetValue(valueArray[1], out var registry))
                {
                    PrintResult(int.Parse(registry));                   
                }

                else
                {
                    Console.WriteLine($"No registry with name {valueArray[0]} was found! Try Again!");                   
                }

            }
            else if (valueArray.Length == 1 && valueArray[0].Contains("quit")) ;
            {
                Console.WriteLine("Quiting...");
                System.Environment.Exit(0);
            }
        }
        else if (valueArray.Length == 3)
        {
            if (registries.TryGetValue(valueArray[0], out var registry1))
            {
                if (registries.TryGetValue(valueArray[2], out var registry2))
                {
                    registries[valueArray[0]] = RunOperation(int.Parse(registry1), int.Parse(registry2), valueArray[1]).ToString();                    
                }
                else
                {
                    registries[valueArray[0]] = RunOperation(int.Parse(registry1), int.Parse(valueArray[2]), valueArray[1]).ToString();                   
                }
            }
            else
            {
                if (!valueArray[1].Equals("add"))
                {
                    Console.WriteLine("Operation cannot be done because registry does not exist!");                 
                }
                else
                {
                    registries.Add(valueArray[0], RunOperation(0, int.Parse(valueArray[2]), valueArray[1]).ToString());                   
                }

            }
        }
        else
             Console.WriteLine("Operation not in correct format : <registry> <operation> <value> . Try Again!");
        

    }

    private static int RunOperation(int value1, int value2,string operation)
    {
        int result = 0;
        if (operation.Equals("add"))
            result = value1 + value2;
        if(operation.Equals("substract"))
            result= value1 - value2;
        if(operation.Equals("multiply"))
            result = value1 * value2;
        return result;
    }   

    private void PrintResult(int value)
    {
        Console.WriteLine(value);
    }
       


}
