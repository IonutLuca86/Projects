// import { useEffect, useState } from 'react'

// import './App.css'

// function App() {
  
//   const [currCoords,setCurrCoords] = useState({});
//   const [currLocation,setCurrLocation] = useState({});
//   const [cuisine, setCuisine] = useState([]);
//   const [geoRecipes,setGeoRecipes] = useState([]);

//   useEffect(() => {
//     loadData();
//   },[])

//   const loadData = async () => {
//     getCoords();
//     await getLocation(currCoords.latitude,currCoords.longitude)
//     await getCuisine(currLocation.continent,currLocation.countryCode)
//     await getGeoRecipes(cuisine);
//   }
//   const getCoords = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const {latitude,longitude} = position.coords;
//       setCurrCoords({latitude,longitude});
//     })
//   }

//   const getLocation = async (lat,long) => {
//     const url = `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en&key=bdc_f4cb1400f8ae4072bc0b86a260744892`;
//     const response = await fetch(url);
//     const data = await response.json();
//     setCurrLocation(data);
//   }

//   const getCuisine =  (continet,country) => {
//       const nordic = ["SE", "FI", "NO", "DK", "IS"];
//       const easternEU = ["RO","BG","TR","MD","UA","RS","PL"]
//     switch(continet){
//         case 'Europe': {
//           switch(country){
//             case 'GB':
//               setCuisine("British");
//               break;
//             case 'FR':
//               setCuisine("French");
//               break;
//             case 'DK':
//               setCuisine("German");
//               break;
//             case 'GR':
//               setCuisine("Greek");
//               break;
//             case 'IE':
//               setCuisine("Irish");
//               break;
//             case 'IT':
//               setCuisine(["Italian","Mediterranean"]);
//               break;
//             case 'ES':
//               setCuisine(["Spanish","Mediterranean"]);
//               break;
//             default:
//               if(nordic.includes(country))
//                 setCuisine("Nordic")
//               else
//                 if(easternEU.includes(country))
//                   setCuisine("Eastern European");
//                 else
//                   setCuisine("European");
//             }       
//           }
//           break;
//         case 'Africa':
//           setCuisine("African");
//           break;        
//         case 'North America':
//           setCuisine(["American","Mexican","Cajun"]);
//           break;
//         case 'South America':
//           setCuisine(["Latin American","Mexican","Caribbean"])
//           break;
//         case 'Australia':
//           setCuisine(["American","Thai"]);
//           break;
//         case "Asia": {
//           switch(country) {
//             case 'CN':
//               setCuisine("Chinese");
//               break;
//             case 'JP':
//               setCuisine("Japanese");
//               break;
//             case 'VN':
//               setCuisine("Vietnamese");
//               break;
//             case 'TH':
//               setCuisine("Thai");
//               break;
//             case 'IN':
//               setCuisine("Indian");
//               break;
//             default:
//               setCuisine("Middle Eastern")
//               break;
//             }
//           }
//           break;
//           // default:
//           //   setCuisine("Southern");
//           //   break;

//     }
       
//   }
  
//   const getGeoRecipes = async (search) => {
//     try {
//       const localGeo = sessionStorage.getItem('geoRecipes');
//       if(localGeo) 
//         setGeoRecipes(JSON.parse(localGeo))
//       else {
//         const ApiKey = 'f27d562bd85b4cd5a482eb0b9108beeb';
//         const dataGeo = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&cuisine=${search}&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&number=50`);
//         const response = await dataGeo.json();
//         setGeoRecipes(response);
//         console.log(response.results)
//         sessionStorage.setItem('geoRecipes', JSON.stringify(response))
//       }
//     }
//     catch(e) {console.log(e)}
//   }
//   console.log(cuisine)
//   return (
//     <>
//       <p>{currCoords.latitude}</p>
//       <p>{currCoords.longitude}</p>
//       <p>{currLocation.countryCode}</p>
//       <p>{currLocation.continent}</p>
//       <p>{cuisine}</p>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react';
import './App.css';

const bands = [
  {
    id: 1,
    name: 'Nightwish',
    albums: 9,
    members: 6,
    formed_in: 1996,
  },
  {
    id: 2,
    name: 'Metallica',
    albums: 10,
    members: 4,
    formed_in: 1981,
  },
  {
    id: 3,
    name: 'Nirvana',
    albums: 3,
    members: 3,
    formed_in: 1987,
  },
];

function App() {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('albums');

  useEffect(() => {
    const sortArray = type => {
      const types = {
        albums: 'albums',
        members: 'members',
        formed: 'formed_in',
      };
      const sortProperty = types[type];
      const sorted = [...bands].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]); 

  return (
    <div className="App">
      <select onChange={(e) => setSortType(e.target.value)}> 
        <option value="albums">Albums</option>
        <option value="members">Members</option>
        <option value="formed">Formed in</option>
      </select>

      {data.map(band => (
        <div key={band.id} style={{ margin: '30px' }}>
          <div>{`Band: ${band.name}`}</div>
          <div>{`Albums: ${band.albums}`}</div>
          <div>{`Members: ${band.members}`}</div>
          <div>{`Year of founding: ${band.formed_in}`}</div>
        </div>
      ))}
    </div>
  );
}

export default App;