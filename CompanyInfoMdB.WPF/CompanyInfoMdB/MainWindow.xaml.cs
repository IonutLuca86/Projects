using MongoDB.Bson;
using MongoDBAccess.DataControllers;
using MongoDBAccess.DataModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace CompanyInfoMdB
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        CompaniesDAO companiesDAO = new CompaniesDAO();
        DepartamentsDAO departamentsDAO= new DepartamentsDAO();
        EmployeesDAO employeesDAO= new EmployeesDAO();
        string[] unionItems = new string[] { "True", "False"};


        public MainWindow()
        {
            InitializeComponent();
            unionBox.ItemsSource = unionItems;            
        }
        // Functions on Companies tab
        private async void showAllCompanies_Click(object sender, RoutedEventArgs e)
        {
            allCompaniesDG.ItemsSource = await companiesDAO.GetAllCompaniesAsync();

        }
        private async void cInsert_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(companiesNameTb.Text) || !string.IsNullOrWhiteSpace(companiesNameTb.Text))
            {
                string name = companiesNameTb.Text;
                if (!string.IsNullOrEmpty(orgNrTb.Text) || !string.IsNullOrWhiteSpace(orgNrTb.Text))
                {
                    string orgNr = orgNrTb.Text;
                    if (!string.IsNullOrEmpty(mOfficeTb.Text) || !string.IsNullOrWhiteSpace(mOfficeTb.Text))
                    {
                        string mOffice = mOfficeTb.Text;
                        await companiesDAO.InsertCompany(new Companies() { CompanyName = name, OrganisationNummer = orgNr, MainOffice = mOffice });
                        compCBox.ItemsSource = await companiesDAO.GetAllCompNameAsync();
                        MessageBox.Show("The entry was inserted succesfully into database!");
                        ClearCompanyBoxes();
                    }
                    else
                        MessageBox.Show("All fields except ID are required! Try again!");
                }
                else
                    MessageBox.Show("All fields except ID are required! Try again!");
            }
            else
                MessageBox.Show("All fields except ID are required! Try again!");
        }
        private async void cUpdate_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(companiesIdTb.Text) || !string.IsNullOrWhiteSpace(companiesIdTb.Text)
               && !string.IsNullOrEmpty(companiesNameTb.Text) || !string.IsNullOrWhiteSpace(companiesNameTb.Text)
               && !string.IsNullOrEmpty(orgNrTb.Text) || !string.IsNullOrWhiteSpace(orgNrTb.Text)
               && !string.IsNullOrEmpty(mOfficeTb.Text) || !string.IsNullOrWhiteSpace(mOfficeTb.Text))
            {
                await companiesDAO.UpdateCompany(companiesIdTb.Text, new Companies() { CompanyName = companiesNameTb.Text, OrganisationNummer = orgNrTb.Text, MainOffice = mOfficeTb.Text });
                MessageBox.Show("Update complete!");
                allCompaniesDG.ItemsSource = await companiesDAO.GetAllCompaniesAsync();
                compCBox.ItemsSource = await companiesDAO.GetAllCompNameAsync();
                ClearCompanyBoxes();

            }
            else
                MessageBox.Show("All fields are required to be fylled to update the entry! You can do this by selecting an entry from the list below!");
        }              
        private async void cDelete_Click(object sender, RoutedEventArgs e)
        {

            if (!string.IsNullOrEmpty(companiesIdTb.Text) || !string.IsNullOrWhiteSpace(companiesIdTb.Text))
            {
                var result = await departamentsDAO.GetConnections(companiesIdTb.Text);
                if (result != null)
                {
                    MessageBox.Show("Company cannot be deleted because there are departaments in the database that still use its ID!");
                }
                else
                {
                    await companiesDAO.DeleteCompany(companiesIdTb.Text);
                    MessageBox.Show("Delete complete!");
                    allCompaniesDG.ItemsSource = await companiesDAO.GetAllCompaniesAsync();
                    compCBox.ItemsSource = await companiesDAO.GetAllCompNameAsync();
                    ClearCompanyBoxes();
                }

            }
            else
                MessageBox.Show("ID field is required to delete the entry!");
        }
        private async void cSearch_Click(object sender, RoutedEventArgs e)
        {
            List<Companies> input = new List<Companies>();
            if (!string.IsNullOrEmpty(companiesIdTb.Text) || !string.IsNullOrWhiteSpace(companiesIdTb.Text))
            {
                var result = await companiesDAO.GetCompanybyID(companiesIdTb.Text);
                if (result != null)
                {
                    input.Add(result);
                    allCompaniesDG.ItemsSource = input;
                }
                else MessageBox.Show("There is no entry in the database with the provided ID! Try again!");
                
            }
            else if (!string.IsNullOrEmpty(companiesNameTb.Text) || !string.IsNullOrWhiteSpace(companiesNameTb.Text))
            {
                var result = await companiesDAO.GetCompanybyName(companiesNameTb.Text);
                if (result != null)
                {
                    input.Add(result);
                    allCompaniesDG.ItemsSource = input;
                }
                else  MessageBox.Show("There is no entry in the database with the provided Name! Try again!");
                
            }
            else if (!string.IsNullOrEmpty(orgNrTb.Text) || !string.IsNullOrWhiteSpace(orgNrTb.Text))
            {
                var result = await companiesDAO.GetCompanybyOrgNr(orgNrTb.Text);
                if (result != null)
                {
                    input.Add(result);
                    allCompaniesDG.ItemsSource = input;
                }
                else MessageBox.Show("There is no entry in the database with the provided Organisation Number! Try again!");

            }
            else MessageBox.Show("Insert a Company ID, name or organisation number to search for data into database!");
        }


        //Functions on Departaments tab
        private async void showAllDepBtn_Click(object sender, RoutedEventArgs e)
        {
           depDG.ItemsSource = await departamentsDAO.GetAllDepartamentsAsync();
        }
        private async void depInsert_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(depNameTb.Text) || !string.IsNullOrWhiteSpace(depNameTb.Text))
            {
                if (compCBox.SelectedItem != null)
                {
                    string compName = compCBox.Text;
                    var company = await companiesDAO.GetCompanybyName(compName);                    
                    await departamentsDAO.InsertDepartamet(new Departaments() { DepartamentName = depNameTb.Text, CompanyId = company.CompanyId });
                    MessageBox.Show("Departament has been inserted into database!");
                    ClearDepBoxes();
                }
                else
                    MessageBox.Show("All fields except Departament ID are required!Try again!");
            }
            else
                MessageBox.Show("All fields except Departament ID are required!Try again!");
        }    
        private async void depUpdate_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(depIdTb.Text) || !string.IsNullOrWhiteSpace(depIdTb.Text)
                && !string.IsNullOrEmpty(depNameTb.Text) || !string.IsNullOrWhiteSpace(depNameTb.Text)
                && compCBox.SelectedItem != null)
            {
                string compName = compCBox.Text;
                var company = await companiesDAO.GetCompanybyName(compName);                
                await departamentsDAO.UpdateDepartament(depIdTb.Text, new Departaments() { DepartamentName = depNameTb.Text, CompanyId = company.CompanyId });
                MessageBox.Show("Update complete!");
                depDG.ItemsSource = await departamentsDAO.GetAllDepartamentsAsync();
                ClearDepBoxes();
            }
            else
                MessageBox.Show("All fields are required to be fylled to update the entry! You can do this by selecting an entry from the list below!");
        }
        private async void depDelete_Click(object sender, RoutedEventArgs e)
        {

            if (!string.IsNullOrEmpty(depIdTb.Text) || !string.IsNullOrWhiteSpace(depIdTb.Text))
            {
                var result = await employeesDAO.GetConnections(depIdTb.Text);
                if (result != null) { MessageBox.Show("Departament cannot be deleted for there are employees that still use its ID!"); }
                else
                {
                    await departamentsDAO.DeleteDepartament(depIdTb.Text);
                    MessageBox.Show("Delete complete!");
                    depDG.ItemsSource = await departamentsDAO.GetAllDepartamentsAsync();
                    ClearDepBoxes();
                }
            }
            else
                MessageBox.Show("Departament ID field is required to delete an entry!");

        }
        private async void depSearch_Click(object sender, RoutedEventArgs e)
        {
            List<Departaments> input = new List<Departaments>();
            if (!string.IsNullOrEmpty(depIdTb.Text) || !string.IsNullOrWhiteSpace(depIdTb.Text))
            {
                var result = await departamentsDAO.GetDepartamentbyID(depIdTb.Text);
                if (result != null)
                {
                    input.Add(result);
                    depDG.ItemsSource = input;
                }
                else MessageBox.Show("There is no entry in the database with the provided ID! Try again!");
                               
            }
            else if (!string.IsNullOrEmpty(depNameTb.Text) || !string.IsNullOrWhiteSpace(depNameTb.Text))
            {
                var result = await departamentsDAO.GetDepartamentbyName(depNameTb.Text);
                if (result != null)
                {
                    input.Add(result);
                    depDG.ItemsSource = input;
                }
                else MessageBox.Show("There is no entry in the database with the provided Name! Try again!");

            }
            else MessageBox.Show("Insert a Departament Id or Name to search for data into database!");
        }



        //Functions on Employees tab
        private async void showAllEmploeesBtn_Click(object sender, RoutedEventArgs e)
        {
            showAllEmployeesGrid.ItemsSource = await employeesDAO.GetAllEmployeesAsync();
        }
        private async void eInsertBtn_Click(object sender, RoutedEventArgs e)
        {
            double salary = 0d;
            bool union = false;
            if (!string.IsNullOrEmpty(fNameTb.Text) || !string.IsNullOrWhiteSpace(fNameTb.Text))
            {
                if (!string.IsNullOrEmpty(lNameTb.Text) || !string.IsNullOrWhiteSpace(lNameTb.Text))
                {
                    if (!string.IsNullOrEmpty(positionTb.Text) || !string.IsNullOrWhiteSpace(positionTb.Text))
                    {
                        if (eDepIdBox.SelectedItem != null)
                        {
                            string readBox = eDepIdBox.Text;
                            string[] depName = readBox.Split(" , ");
                            var departament = await departamentsDAO.GetDepartamentbyName(depName[0]);
                            if (!string.IsNullOrEmpty(salaryTb.Text) || !string.IsNullOrWhiteSpace(salaryTb.Text))
                            {
                                try { salary = Convert.ToDouble(salaryTb.Text); }
                                catch { MessageBox.Show("Inserted salary is not in desired format! Try xxxx eller xxxx.xx"); }

                                if (unionBox.SelectedItem != null)
                                {

                                    
                                        if (unionBox.Text.Equals("True"))
                                            union = true;
                                        else if (unionBox.Text.Equals("False"))
                                            union = false;
                                        await employeesDAO.InsertEmployee(new Employees()
                                        {
                                            FirstName = fNameTb.Text,
                                            LastName = lNameTb.Text,
                                            Position = positionTb.Text,
                                            DepartamentId = departament.departamentId,
                                            Salary = salary,
                                            UnionMember = union
                                        });
                                        showAllEmployeesGrid.ItemsSource = await employeesDAO.GetAllEmployeesAsync();
                                        ClearEmployees();
                                        MessageBox.Show("Insert complete!");
                                    
                                }
                                else MessageBox.Show("All fields except ID are required to insert new employee into database!");
                            }
                            else MessageBox.Show("All fields except ID are required to insert new employee into database!");
                        }
                        else MessageBox.Show("All fields except ID are required to insert new employee into database!");
                    }
                    else MessageBox.Show("All fields except ID are required to insert new employee into database!");
                }
                else MessageBox.Show("All fields except ID are required to insert new employee into database!");
            }
            else MessageBox.Show("All fields except ID are required to insert new employee into database!");
        }
        private async void eUpdateBtn_Click(object sender, RoutedEventArgs e)
        {
            double salary = 0d;
            bool union = false;
            if (!string.IsNullOrEmpty(employeeIdTb.Text) || !string.IsNullOrWhiteSpace(employeeIdTb.Text)
                && !string.IsNullOrEmpty(fNameTb.Text) || !string.IsNullOrWhiteSpace(fNameTb.Text)
                && !string.IsNullOrEmpty(lNameTb.Text) || !string.IsNullOrWhiteSpace(lNameTb.Text)
                && !string.IsNullOrEmpty(positionTb.Text) || !string.IsNullOrWhiteSpace(positionTb.Text))
            {
                if (eDepIdBox.SelectedItem != null)
                {
                    string readBox = eDepIdBox.Text;
                    string[] depName = readBox.Split(" , ");
                    var departament = await departamentsDAO.GetDepartamentbyName(depName[0]);
                    if (!string.IsNullOrEmpty(salaryTb.Text) || !string.IsNullOrWhiteSpace(salaryTb.Text))
                    {
                        try { salary = Convert.ToDouble(salaryTb.Text); }
                        catch { MessageBox.Show("Inserted salary is not in desired format! Try xxxx eller xxxx.xx"); }

                        if (unionBox.SelectedItem != null)
                        {
                            if (unionBox.Text.Equals("true"))
                                union = true;
                            else if (unionBox.Text.Equals("false"))
                                union = false;
                            await employeesDAO.UpdateEmployee(employeeIdTb.Text, new Employees()
                            {
                                FirstName = fNameTb.Text,
                                LastName = lNameTb.Text,
                                Position = positionTb.Text,
                                DepartamentId = departament.departamentId,
                                Salary = salary,
                                UnionMember = union
                            });
                            MessageBox.Show("Update Complete!");
                            showAllEmployeesGrid.ItemsSource = await employeesDAO.GetAllEmployeesAsync();
                            ClearEmployees();

                        }
                        else
                            MessageBox.Show("All fields are required to be fylled to update the entry! You can do this by selecting an entry from the list below!");
                    }
                    else
                        MessageBox.Show("All fields are required to be fylled to update the entry! You can do this by selecting an entry from the list below!");
                }
                else
                    MessageBox.Show("All fields are required to be fylled to update the entry! You can do this by selecting an entry from the list below!");
            }
            else
                MessageBox.Show("All fields are required to be fylled to update the entry! You can do this by selecting an entry from the list below!");

        }
        private async void eDeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            if (!string.IsNullOrEmpty(employeeIdTb.Text) || !string.IsNullOrWhiteSpace(employeeIdTb.Text))
            {
                await employeesDAO.DeleteEmployee(employeeIdTb.Text);
                MessageBox.Show("Delete complete!");
                showAllEmployeesGrid.ItemsSource = await employeesDAO.GetAllEmployeesAsync();
                ClearEmployees();
            }
            else MessageBox.Show("ID field is required to be able to delete entry!");
        }
        private void eSearchBtn_Click(object sender, RoutedEventArgs e)
        {

        }

        // first initialize functions to populate tha comboBoxes from Departaments and Employees tabs
        private async void DepTabItem_Initialized(object sender, EventArgs e) => compCBox.ItemsSource = await companiesDAO.GetAllCompNameAsync();
        private async void EmpTabItem_Initialized(object sender, EventArgs e) => eDepIdBox.ItemsSource = await departamentsDAO.GetAllDepartNameAsync();


        // functions that will clear all content from textboxes in each respective tab
        private void ClearEmpBtn_Click(object sender, RoutedEventArgs e) => ClearEmployees();
        private void clearDepBtn_Click(object sender, RoutedEventArgs e) => ClearDepBoxes();
        private void clearCbtn_Click(object sender, RoutedEventArgs e)  => ClearCompanyBoxes();
        private void ClearCompanyBoxes()
        {
            companiesIdTb.Clear();
            companiesNameTb.Clear();
            orgNrTb.Clear();
            mOfficeTb.Clear();
        }
        private void ClearDepBoxes()
        {
            compCBox.Text = "";
            depIdTb.Clear();
            depNameTb.Clear();
        }
        private void ClearEmployees()
        {
            employeeIdTb.Clear();
            fNameTb.Clear();
            lNameTb.Clear();
            positionTb.Clear();
            eDepIdBox.Text = "";
            salaryTb.Clear();
            unionBox.Text = "";
        }


        //function that will populate the textboxes with selected item from respective dataGrid
        private void allCompaniesDG_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var data = allCompaniesDG.SelectedItem;
            Companies? companies = data as Companies;
            if (companies != null)
            {
                companiesIdTb.Text = companies.CompanyId.ToString();
                companiesNameTb.Text = companies.CompanyName.ToString();
                orgNrTb.Text = companies.OrganisationNummer.ToString();
                mOfficeTb.Text = companies.MainOffice.ToString();
            }

        }
        private async void depDG_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var data = depDG.SelectedItem as Departaments;
            if (data != null)
            {
                depIdTb.Text = data.departamentId.ToString();
                depNameTb.Text = data.DepartamentName;
                var company = await companiesDAO.GetCompanybyID(data.CompanyId.ToString());
                compCBox.Text = company.CompanyName;
            }
        }
        private async void showAllEmployeesGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var data = showAllEmployeesGrid.SelectedItem as Employees;
            if (data != null)
            {
                employeeIdTb.Text = data.employeeID.ToString();
                fNameTb.Text = data.FirstName.ToString();
                lNameTb.Text = data.LastName.ToString();
                positionTb.Text = data.Position.ToString();
                var departament = await departamentsDAO.GetDepartamentbyID(data.DepartamentId.ToString());
                var company = await companiesDAO.GetCompanybyID(departament.CompanyId.ToString());
                eDepIdBox.Text = departament.DepartamentName + " , " + company.CompanyName;
                salaryTb.Text = data.Salary.ToString();
                unionBox.Text = data.UnionMember.ToString();
            }
        }

        
    }
}
