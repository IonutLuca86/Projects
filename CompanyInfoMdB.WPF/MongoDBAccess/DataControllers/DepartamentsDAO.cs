

using MongoDBAccess.DataModels;

namespace MongoDBAccess.DataControllers
{
    public class DepartamentsDAO
    {
        DatabaseConnect dbConnect = new DatabaseConnect();
        private IMongoCollection<Departaments> departamentsDB;
        CompaniesDAO companiesDAO = new CompaniesDAO();

        public DepartamentsDAO()
        {
            var database = dbConnect.DbConnect();
            departamentsDB = database.GetCollection<Departaments>("departaments");
        }
        public async Task InsertDepartamet(Departaments departament)
        {
            await departamentsDB.InsertOneAsync(departament);
        }
        public async Task<List<Departaments>> GetAllDepartamentsAsync()
        {
            var result = await departamentsDB.FindAsync<Departaments>(_ => true);
            return result.ToList();
        }
        public async Task<Departaments> GetDepartamentbyID(string id)
        {
            ObjectId searchID = new ObjectId(id);
            var result = await departamentsDB.FindAsync<Departaments>(x => x.departamentId.Equals(searchID));
            return (Departaments)result.FirstOrDefault();
        }
        public async Task<Departaments> GetDepartamentbyName(string name)
        {
            var result = await departamentsDB.FindAsync<Departaments>(x => x.DepartamentName.Equals(name));
            return (Departaments)result.FirstOrDefault();
        }
        public async Task<List<string>> GetAllDepartNameAsync()
        {
            List<string> departamentsNames = new List<string>();
            var result = await departamentsDB.FindAsync<Departaments>(_ => true);
            foreach (var departamet in result.ToList())
            {
                var companyName = await companiesDAO.GetCompanybyID(departamet.CompanyId.ToString());
                departamentsNames.Add(departamet.DepartamentName.ToString() +" , "+ companyName.CompanyName.ToString());
            }
            return departamentsNames;
        }        
        public async Task UpdateDepartament(string id, Departaments departament)
        {
            ObjectId searchId = new ObjectId(id);
            departament = new Departaments() { departamentId = searchId, DepartamentName = departament.DepartamentName, CompanyId = departament.CompanyId };
            await departamentsDB.ReplaceOneAsync<Departaments>(x => x.departamentId.Equals(searchId), departament);
        }
        public async Task DeleteDepartament(string id)
        {
            ObjectId searchId = new ObjectId(id);
            await departamentsDB.DeleteOneAsync<Departaments>(x => x.departamentId.Equals(searchId));
        }
        public async Task<List<Departaments>> GetConnections(string compID)
        {
            ObjectId id = new ObjectId(compID);
            var result = await departamentsDB.FindAsync<Departaments>(x => x.CompanyId.Equals(id));
            return result.ToList();
        }
    }
}

