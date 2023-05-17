import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Pages/Root';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Searched from './Pages/Searched'
import Recipe from './Pages/Recipe';
import ErrorPage from './Pages/ErrorPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='/searched/:search' element={<Searched />} />
      <Route path='/recipe/:id' element={<Recipe />} />
    </Route>
  )
)
  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
