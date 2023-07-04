using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesInfo.DataModel
{
    public class Employee
    {
        [BsonId]
        public ObjectId employeeID { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string DepartamentName { get; set; } = string.Empty;
        public double Salary { get; set; }

    }
}
