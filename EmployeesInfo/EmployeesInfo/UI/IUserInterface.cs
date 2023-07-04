using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeesInfo.UI
{
    public interface IUserInterface
    {
        public void Exit();
        public string GetInput();
        public void PrintData(string output);
        public void ClearScreen();
       
    }
}
