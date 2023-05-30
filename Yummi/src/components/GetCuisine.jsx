
export default async function GetCuisine (continent,country)  {
    console.log(continent,country)
    let region;
    const nordic = ["SE", "FI", "NO", "DK", "IS"];
    const easternEU = ["RO","BG","TR","MD","UA","RS","PL"];
        if(continent === "Europe")
          {
            if(nordic.includes(country))
                region = ("Nordic");
            else if(easternEU.includes(country))
                region = ("Eastern European");
            else if(country === "GB")
                region = ("British");
            else if(country === "FR")
                region = ("French")
            else if(country === "DK")
                region = ("German");
            else if(country === "GR")
                region = ("Greek");
            else if(country === "IE")
                region = ("Irish");
            else if(country === "IT")
                region = ("Italian");
            else if(country === "ES")
                region = ("Spanish");
                else
                region = ("European");             
             }
        
        else if(continent === "Africa")
          region = ("African");
               
        else if(continent === "North America") {
                if(country === "MX")
                    region = ("Mexican")
                else
                    region = ("American")
            }         
        else if(continent === "South America")
          region = ("Latin American");
        else if(continent === "Australia")
          region = ("American");
        else if(continent === "Asia")
            {
                if(country === "CN")
                    region = ("Chinese");
                else if(country === "JP")
                    region = ("Japanese");
                else if(country === "VN")
                    region = ("Vietnamese");
                else if(country === "TH")
                    region = ("Thai");
                else if(country === "IN")
                    region = ("Indian");
                else
                    region = ("Asian");

            }                    
        else
                console.log("No cuisine found!")
           
        return (region);
    }   

