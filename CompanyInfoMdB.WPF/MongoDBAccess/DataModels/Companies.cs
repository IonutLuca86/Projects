

namespace MongoDBAccess.DataModels
{
    public class Companies
    {
        [BsonId]
        //[BsonElement("_id")]
        public ObjectId CompanyId { get; set; }
        
        public string CompanyName { get; set; } = string.Empty;
       
        public string OrganisationNummer { get; set; } = string.Empty;
        
        public string MainOffice { get; set; } = string.Empty;


    }
}
