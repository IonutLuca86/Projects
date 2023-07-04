

namespace MongoDBAccess.DataModels
{
    public class Departaments
    {
        [BsonId]
        public ObjectId departamentId { get; set; }
        
        public string DepartamentName { get; set; } = string.Empty;       
        
        public ObjectId CompanyId { get; set; }
    }
}
