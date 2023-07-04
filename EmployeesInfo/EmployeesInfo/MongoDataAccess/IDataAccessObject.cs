using EmployeesInfo.DataModel;
using MongoDB.Bson;

internal interface IDataAccessObject
{
    bool CheckConnection();
    Task InsertEmployee(Employee employee);
    Task<List<Employee>> GetAllEmployees();
    Task<List<Employee>> GetAllByDepartament( string departament);
    Task<Employee> GetEmployeebyID(ObjectId id);
    Task<List<Employee>> GetEmployeebyName(string name);

    Task UpdateEmployee(double salary, ObjectId id);
    Task DeleteEmployee(ObjectId id);
    Task<List<Employee>> GreatherThen(double salary);
    Task<List<Employee>> LessThen(double salary);
    

}