import GeoRecipes from "../components/GeoRecipes"


function LocationRecipes() {
  return (
            <div className='main-container'>
                <div className="popular">
                    <GeoRecipes limit={50}></GeoRecipes>
                </div>
              
           </div>
  )
}

export default LocationRecipes
