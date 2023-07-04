


using MongoDBAccess.DataModels;

namespace MongoDBAccess.DataControllers
{
    public class EmployeesDAO
    {
        DatabaseConnect dbConnect = new DatabaseConnect();
        private IMongoCollection<Employees> employeesDB;
        

        public EmployeesDAO()
        {
            var database = dbConnect.DbConnect();
            employeesDB = database.GetCollection<Employees>("employees");
        }
        public async Task InsertEmployee(Employees employee)
        {
            await employeesDB.InsertOneAsync(employee);
        }
        public async Task<List<Employees>> GetAllEmployeesAsync()
        {
            var result = await employeesDB.FindAsync<Employees>(_ => true);
            return result.ToList();
        }
        public async Task<Employees> GetEmployeebyID(string id)
        {
            ObjectId searchID = new ObjectId(id);
            var result = await employeesDB.FindAsync<Employees>(x => x.employeeID.Equals(searchID));
            return (Employees)result.FirstOrDefault();
        }
        public async Task<List<Employees>> GetEmployeebyName(string name)
        {
            var result = await employeesDB.FindAsync<Employees>(x => x.FirstName.Equals(name) || x.LastName.Equals(name));
            return result.ToList();
        }
        
        public async Task UpdateEmployee(string id, Employees employee)
        {
            ObjectId searchid = new ObjectId(id);
            Employees newEmp = new Employees() { employeeID = searchid,FirstName = employee.FirstName,LastName = employee.LastName,Position = employee.Position,DepartamentId = employee.DepartamentId,Salary = employee.Salary,UnionMember= employee.UnionMember};
            await employeesDB.ReplaceOneAsync<Employees>(x => x.employeeID.Equals(searchid), newEmp);
        }
        public async Task DeleteEmployee(string id)
        {
            ObjectId searchid = new ObjectId(id);
            await employeesDB.DeleteOneAsync<Employees>(x => x.employeeID.Equals(searchid));
        }
        public async Task<List<Employees>> GetConnections(string depID)
        {
            ObjectId id = new ObjectId(depID);
            var result = await employeesDB.FindAsync<Employees>(x => x.DepartamentId.Equals(id));
            return result.ToList();
        }
    }
}

