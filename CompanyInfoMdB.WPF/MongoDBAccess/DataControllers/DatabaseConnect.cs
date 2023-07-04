



namespace MongoDBAccess.DataControllers
{
    public class DatabaseConnect
    {        

        public IMongoDatabase DbConnect()
        {
            string connectionString = File.ReadAllText("D:\\ITHS_repositories\\CompanyInfoMdB.WPF\\MongoDBAccess\\DataControllers\\ConnectionString.txt");
            var mongoURL = new MongoUrl("" + connectionString);
            var mongoClient = new MongoClient(mongoURL);
            var mongoDatabase = mongoClient.GetDatabase("CompanyInfo");
            return mongoDatabase;
        }

    }
}
