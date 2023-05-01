import { useState } from 'react'
import './Home.css'

export default function Home() {

    const [recipes,setRecipes] = useState([]);
    return(
        <div className='main-container'>
        <h1>home</h1>
        </div>
    )
}