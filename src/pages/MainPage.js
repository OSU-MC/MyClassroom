import React, { useState} from 'react';
import './pages.css'

import Instructor_Landing from './Instructor_Landing';
import StudentLandingPage from './StudentLandingPage';
import Profile from './Profile';
import StudentGradeforSingleLecture from './StudentGradeforSingleLecture';
import StudentGradeBook from './StudentGradeBook';

import Instructor_Course from './Instructor_Course';
import Instructor_Calendar from './Instructor_Calendar';
import InstructorRoster from './InstructorRoster';
import Instructor_Questions from './Instructor_Questions';
import InstructorLiveLecture from './InstructorLiveLecture';

import InstructorLectures from './InstructorLectures';

import StudentLiveLecture from './StudentLiveLecture';



function MainPage(props) {

    const [ data, setData ] = useState();
    
   if(props.view === "instructor"){
    return (
        
        <div className='mainPageBody'>
            <Instructor_Landing setData={setData}/>
        </div>
        );
    }
    else if(props.view === "edit"){
        return (
            
            <div className='mainPageBody'>
                <Profile />
            </div>
        );
    }
   else if(props.view === "studentLectureGrade"){
        return (
        
        <div className='mainPageBody'>
            <StudentGradeforSingleLecture />
        </div>
        );
    }
    else if(props.view === "studentGradeBook"){
        return (
        
        <div className='mainPageBody'>
            <StudentGradeBook />
        </div>
        );
    }
   else if(props.view === "edit_course"){
       console.log(data)
        return(
            <div className='mainPageBody'>
                <Instructor_Course data={data}/>
            </div>
        );
    }
   
   else if(props.view === "instructor_calendar"){
    return(
        <div className='mainPageBody'>
            <Instructor_Calendar />
        </div>
    )
   }
   else if(props.view ==="student"){
       return (
           
           <div className='mainPageBody'>
               <StudentLandingPage />
           </div>
       );
   }
   else if(props.view ==="instructor_roster"){
       return (
           
           <div className='mainPageBody'>
               <InstructorRoster />
           </div>
       );
   }
   else if(props.view =="instructor_questions"){
    return (
        <div className='mainPageBody'>
            <Instructor_Questions />
        </div>
    );
   
}
   else if(props.view =="instructor_lectures"){
    return (
        <div className='mainPageBody'>
            <InstructorLectures />
        </div>
    );
   
}

   else if(props.view =="instructor_live_lecture"){
    return (
        <div className='mainPageBody'>
            <InstructorLiveLecture />
        </div>
    );
   
}
    else if(props.view =="basicTable"){
    return (
        <div className='mainPageBody'>
            <BasicTable/>
        </div>
    );
   
}




/*STUDENT PAGES*/


   else if(props.view =="student_live_lecture"){
    return (
        <div className='mainPageBody'>
            <StudentLiveLecture />
        </div>
    );
   
}
   else{
    return(
        <div className='mainPageBody'>
            <p>To be completed!</p>
        </div>
    );
   }
  
}

export default MainPage;