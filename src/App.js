import './App.css';
import { Route, Routes } from 'react-router-dom';

/*
  Page Imports
*/
import Login from './pages/Login'
import Profile from './pages/Profile';
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import Confirm from './pages/Confirm'
import Landing from './pages/Landing'
import Course from './pages/Course'
import SingleCoursePage from './pages/SingleCoursePage'
import AddCourse from './pages/AddCourse'
import Home from './pages/Home'
import Navigation from './components/nav/Navigation'
import useAuth from './hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'

function App() {

  const [ loggedIn, message, error, loading ] = useAuth()

  return (
    <>
      { loading ? <TailSpin visible={true}/> : <Routes>
        {/* There are only 3 accessible pages for users who are not logged in:
            - create account
            - login
            - password reset
          */}
        <Route path='/home' element={ <Home/> }/>
        <Route element={ loggedIn === true ? <Navigate to='/'/> : <><Outlet/></>}>
          <Route path='/login' element={ <Login/> } />
          <Route path='/create' element={ < Signup /> } /> {/* redirects to landing page if a user is logged in already */}
          <Route path='/reset' element={ < ResetPassword /> } /> {/* redirects to landing page if a user is logged in already */}
        </Route>

        { /* All routes below require a user be loggied in */}
        <Route element={ <Navigation></Navigation> }>
          <Route path='/' element= {<Landing/> }/>
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/confirm' element={ <Confirm /> } />
          <Route path='/createcourse' element={ <AddCourse/> }/>
          <Route path='/:courseId'>
              <Route path='' element={ <SingleCoursePage /> } />
              {/* TODO: the remainder of the nested routes should go here */}
          </Route>
        </Route>
      </Routes>}
    </>  
    );
}

export default App;
