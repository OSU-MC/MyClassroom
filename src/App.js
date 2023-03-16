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

import Navigation from './components/nav/Navigation'

import { useSelector } from 'react-redux'
import { getUserState } from './redux/selectors'
import { Navigate, Outlet } from 'react-router-dom';

function App() {

  const user = useSelector(getUserState)

  return (
    <>

      <Routes>
        {/* There are only 3 accessible pages for users who are not logged in:
            - create account
            - login
            - password reset
          */}
        <Route element={(user.status != null && user.status >= 0) ? <Navigate to='/'/> : <><Outlet/></>}>
          <Route path='/login' element={ <Login/> } />
          <Route path='/create' element={ < Signup /> } /> {/* redirects to landing page if a user is logged in already */}
          <Route path='/reset' element={ < ResetPassword /> } /> {/* redirects to landing page if a user is logged in already */}
        </Route>

        { /* All routes below require a user be loggied in */}
        <Route element={ <Navigation></Navigation> }>
          <Route path='/' element= {<Landing/> }/>
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/confirm' element={ <Confirm /> } />
          <Route path='/:courseId' element={ <Course /> } >
            {/* TODO: the remainder of the nested routes should go here */}
          </Route>
        </Route>

        {/* <Route path='/' element={<><Login setUser={setUserStatus}/></>} />
        <Route path='/landing' element={<><SiteNavbar/><Sidebar data={studentSidebarData} /><MainPage view={"student"}/></>} />


        <Route path='/edit_profile' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"edit"}/></>} />
        
        
        <Route path='/instructor/landing' element={<><SiteNavbar/><Sidebar data={instructorSidebarData} /><MainPage view={"instructor"}/></>} />

        <Route path='/student/gradebook/course/lecture/1' element={<><SiteNavbar/><Sidebar data={studentSidebarData} /><MainPage view={"studentLectureGrade"}/></>} />  
        <Route path='/student/landing/student_gradebook' element={<><SiteNavbar/><Sidebar data={studentSidebarData} /><MainPage view={"studentGradeBook"}/></>} />

        <Route path='/edit_profile' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"edit"}/></>} />
        <Route path='/instructor/edit_course' element={<><SiteNavbar/><Sidebar data={instructorSidebarData} /><MainPage view={"edit_course"}/></>} />
        
        <Route path='/instructor_questions' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"instructor_questions"}/></>}></Route>
        <Route path='/instructor_students' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"instructor_roster"}/></>}></Route>
        <Route path='/instructor_gradebook' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={""}/></>}></Route>
        <Route path='/instructor_calendar' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"instructor_calendar"}/></>}></Route>
        <Route path='/instructor_calendar' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"instructor_calendar"}/></>}></Route>
        
        
        <Route path='/basic_table' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"basicTable"}/></>}></Route>

        <Route path='/instructor/lectures/:id' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"instructor_lectures"}/></>}></Route>

        <Route path='/instructor_live_lecture/:id' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"instructor_live_lecture"}/></>}></Route>


        
        <Route path='/student_live_lecture' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"student_live_lecture"}/></>}></Route> */}


      </Routes>


    </>  
    );
}

export default App;
