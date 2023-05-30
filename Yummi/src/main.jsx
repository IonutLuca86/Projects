import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Pages/Root';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Recipe from './Pages/Recipe';
import ErrorPage from './Pages/ErrorPage'
import Populars from './Pages/Populars';
import LocationRecipes from './Pages/LocationRecipes';
import Favorites from './Pages/Favorites';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />     
      <Route path='/recipe/:id' element={<Recipe />} />
      <Route path='/populars' element={<Populars />} />
      <Route path='/georecipes' element={<LocationRecipes />} />
      <Route path='/favorites' element={<Favorites />} />
    </Route>
  )
)
  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
