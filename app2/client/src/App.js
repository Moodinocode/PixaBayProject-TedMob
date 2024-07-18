import './App.css';
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import LogInPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';
import FavoritesPage from './Pages/FavoritesPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element = {<LogInPage/>}/>
        <ProtectedRoute path='/signup' element = {<SignupPage/>}/>
        <ProtectedRoute path='/Home' element = {<HomePage/>}/>
        <ProtectedRoute path='/favorites' element = {<FavoritesPage/>}/>
      </Route>
    )
  )
  return <RouterProvider router={router}/>;
}

export default App;
