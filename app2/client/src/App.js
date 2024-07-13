import './App.css';
import {createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import LogInPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element = {<LogInPage/>}/>
        <Route path='/signup' element = {<SignupPage/>}/>
        <Route path='/Home' element = {<HomePage/>}/>
      </Route>
    )
  )
  return <RouterProvider router={router}/>;
}

export default App;
