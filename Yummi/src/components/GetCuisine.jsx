
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

// import { createRoutesFromChildren } from "react-router-dom";

// export default function GetCuisine (continent,country)  {
//     console.log(continent)
//     createRoutesFromChildren
//     let region;
     
//     switch(continent){
//         case 'Europe':
//           region = caseEurope(country);
//           break;
//         case 'Africa':
//           region = ["African"];
//           break;        
//         case 'North America':
//           region = ["American","Mexican","Cajun"];
//           break;
//         case 'South America':
//           region = ["Latin American","Mexican","Caribbean"];
//           break;
//         case 'Australia':
//           region = ["American","Thai"];
//           break;
//         case "Asia": 
//             region = caseAsia(country);
//             break;
//         default:
//             console.log("No region found!")
//             break;

//     }   
//     console.log(region)
//     region = (region);
    
       
//   }

//    function caseEurope (country)  {
//     let region;
//     const nordic = ["SE", "FI", "NO", "DK", "IS"];
//     const easternEU = ["RO","BG","TR","MD","UA","RS","PL"]
//         switch(country){
            
//             case 'GB':
//             region =  ["British"];
//               break;
//             case 'FR':
//               region = ["French"];
//               break;
//             case 'DK':
//               region = ["German"];
//               break;
//             case 'GR':
//               region = ["Greek"];
//               break;
//             case 'IE':
//               region = ["Irish"];
//               break;
//             case 'IT':
//               region = ["Italian","Mediterranean"];
//               break;
//             case 'ES':
//               region = ["Spanish","Mediterranean"];
//               break;
//             case 'SE':
//                 region = "Nordic";
//                 break;
//             case  easternEU.includes(country):
//                    region = ["Eastern European"];
//                    break;
//             default: 
//                    region = ["European"];           
//                     break;
//             } 
//             region = (region);      
//           }

//  function caseAsia(country){
//     let region;
//           switch(country) {
//             case 'CN':
//               region = ["Chinese"];
//               break;
//             case 'JP':
//               region = ["Japanese"];
//               break;
//             case 'VN':
//               region = ["Vietnamese"];
//               break;
//             case 'TH':
//               region = ["Thai"];
//               break;
//             case 'IN':
//               region = ["Indian"];
//               break;
//             default:
//               region = ["Middle Eastern"];
//               break;
//             }
//             region = (region);
//           }

