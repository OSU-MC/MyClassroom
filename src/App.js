import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Instructor_Landing from './pages/Instructor_Landing';
import SiteNavbar from './components/SiteNavbar';
import Signup from './pages/Signup';
import StudentLandingPage from './pages/StudentLandingPage';
import SideNavbar from './components/SideNavbar_Teacher';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import MainPage from './pages/MainPage';

import { instructorSidebarData, studentSidebarData} from './components/sidebarData'


function App() {

  const [userStatus, setUserStatus] = useState();
  

  return (
    <>

      <Routes>
        <Route path='/' element={<><Login setUser={setUserStatus}/></>} />
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


        
        <Route path='/student_live_lecture' element={<><SiteNavbar view={userStatus}/><Sidebar data={instructorSidebarData} /><MainPage view={"student_live_lecture"}/></>}></Route>


      </Routes>


    </>  
    );
}

export default App;
