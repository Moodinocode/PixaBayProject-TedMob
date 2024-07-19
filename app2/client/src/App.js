import './App.css';
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider,Routes} from 'react-router-dom'
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
        <Route path='/signup' element = {<SignupPage/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/home' element = {<HomePage/>}/>
          <Route path='/favorites' element = {<FavoritesPage/>}/>
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router}/>;
}

export default App;
