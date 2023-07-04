using EmployeesInfo.DataModel;
using MongoDB.Bson;
using MongoDB.Driver;

internal class MongoDAO : IDataAccessObject
{
    IMongoCollection<Employee> employeesDB;
    IMongoDatabase mongoDatabase;
    public MongoDAO( string db, string connection)
    { 
        var client = new MongoClient(connection);
        mongoDatabase = client.GetDatabase(db);
        this.employeesDB = mongoDatabase.GetCollection<Employee>("employees");
        
    }
    public bool CheckConnection()
    {        
        bool isMongoConnected;
        try
        {
            mongoDatabase.RunCommandAsync((Command<BsonDocument>)"{ping:1}");
            isMongoConnected = true;
        }
        catch (Exception)
        {
            isMongoConnected = false;
        }
        return isMongoConnected;
    }
    public async Task InsertEmployee(Employee employee)
    {
        await employeesDB.InsertOneAsync(employee);
    }
    public async Task<List<Employee>> GetAllEmployees()
    {
        var result = await employeesDB.FindAsync<Employee>(_ => true);
        return result.ToList();
    }
    public async Task<Employee> GetEmployeebyID(ObjectId id)
    {       
        var result = await employeesDB.FindAsync<Employee>(x => x.employeeID.Equals(id));
        return (Employee)result.FirstOrDefault();
    }
    public async Task<List<Employee>> GetEmployeebyName(string name)
    {
        string searchName = char.ToUpper(name[0]) + name.Substring(1).ToLower();
        var result = await employeesDB.FindAsync<Employee>(x => x.FirstName.Equals(searchName) || x.LastName.Equals(searchName));
        return result.ToList();
    }

    public async Task UpdateEmployee(double salary, ObjectId id)
    {
        var filter = Builders<Employee>.Update.Set("Salary", salary);
        await employeesDB.UpdateOneAsync<Employee>(x => x.employeeID.Equals(id), filter);
    }
    public async Task DeleteEmployee(ObjectId id)
    {
        await employeesDB.DeleteOneAsync<Employee>(x => x.employeeID.Equals(id));
    }

    public async Task<List<Employee>> GetAllByDepartament(string departament)
    {
        string dep = char.ToUpper(departament[0]) + departament.Substring(1).ToLower();
        var result = await employeesDB.FindAsync<Employee>(x => x.DepartamentName.Equals(dep));
        return result.ToList();
    }
    public async Task<List<Employee>> GreatherThen(double salary)
    {
        var result = await employeesDB.FindAsync<Employee>(x => x.Salary >= salary);
        return result.ToList();
    }
    public async Task<List<Employee>> LessThen(double salary)
    {
        var result = await employeesDB.FindAsync<Employee>(x => x.Salary <= salary);
        return result.ToList();
    }
}