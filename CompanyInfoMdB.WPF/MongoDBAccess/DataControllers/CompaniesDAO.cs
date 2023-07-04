


using MongoDB.Driver;

namespace MongoDBAccess.DataControllers
{
    public class CompaniesDAO
    {
        DatabaseConnect dbConnect = new DatabaseConnect();
        private IMongoCollection<Companies> companiesDB;

        public CompaniesDAO()
        {
            var database = dbConnect.DbConnect();
            companiesDB =  database.GetCollection<Companies>("companies");
        }
        public async Task InsertCompany(Companies company)
        {            
            await companiesDB.InsertOneAsync(company);
        }
        public async Task<List<Companies>> GetAllCompaniesAsync()
        {
             var result = await companiesDB.FindAsync<Companies>(_ => true);
             return result.ToList();            
        }
        public async Task<Companies> GetCompanybyID(string id)
        {
            ObjectId searchID = new ObjectId(id);
            var result = await companiesDB.FindAsync<Companies>(x => x.CompanyId.Equals(searchID));
            return (Companies)result.FirstOrDefault();
        }
        public async Task<Companies> GetCompanybyName(string name)
        {           
            var result = await companiesDB.FindAsync<Companies>(x => x.CompanyName.Equals(name));            
            return (Companies)result.FirstOrDefault();
        }
        public async Task<List<string>> GetAllCompNameAsync()
        {
            List<string> companyNames = new List<string>();
            var result = await companiesDB.FindAsync<Companies>(_ => true);
            foreach (var company in result.ToList()) {
                companyNames.Add(company.CompanyName.ToString());
            }
            return companyNames;
        }
        public async Task<Companies> GetCompanybyOrgNr(string orgNr)
        {
            var result = await companiesDB.FindAsync<Companies>(x => x.OrganisationNummer.Equals(orgNr));
            return (Companies)result.FirstOrDefault();
        }
        public async Task UpdateCompany(string id, Companies company)
        {
            ObjectId searchID = new ObjectId(id);
            company = new Companies() { CompanyId = searchID, CompanyName = company.CompanyName, OrganisationNummer = company.OrganisationNummer, MainOffice = company.MainOffice };
            await companiesDB.ReplaceOneAsync<Companies>(x => x.CompanyId.Equals(searchID), company);
        }
        public async Task DeleteCompany(string id)
        {
            ObjectId searchID = new ObjectId(id);
            await companiesDB.DeleteOneAsync<Companies>(x => x.CompanyId.Equals(searchID));
        }
    }
}
