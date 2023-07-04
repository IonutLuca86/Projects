
namespace MongoDBAccess.DataModels
{
    public class Employees
    {
        [BsonId]
        public ObjectId employeeID { get; set; }       
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public ObjectId DepartamentId { get; set; }
        public double Salary { get; set; }
        public bool UnionMember { get; set; }
    }
}
