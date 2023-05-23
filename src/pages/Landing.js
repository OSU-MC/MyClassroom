import React from 'react';
import CourseCard from '../components/CourseCard'
import { Button, Card } from "react-bootstrap"
import useCourses from '../hooks/useCourses'
import Notice from '../components/Notice'
import JoinCourse from '../components/JoinCourse'
import { Link } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'

function Landing(props) {
    // Will implement ability to hide/show once we figure out best way to modify the

    const [ courses, message, error, loading ] = useCourses()
    
    // cards for student and teacher courses
    return(
        <div className="landing-page">
            {/*No Courses*/}
            { message ? <Notice error={error ? "error" : ""} message={message}/> : (!courses.studentCourses && !courses.instructorCourses) ? <Notice message={"You do not have any courses yet"}/> : <></>}
            {/*Join Course button for all users*/}
            <JoinCourse className="buttons"/>

            {/*Student Courses*/}
            { loading ? <TailSpin visible={true}/> : <div className="all-courses"> 
                {courses.studentCourses != null && <div id="student-courses">
                    <p id="landing-subtitle" >Student Courses</p>
                    <hr></hr>

                    <div className='courses'>
                    {courses.studentCourses.map((studentCourse) =>  {
                        return <CourseCard key={studentCourse.id} course={studentCourse} role={"student"} />        
                    })}
                    </div>
                </div>}

                {/*Teacher Courses*/}
                {courses.teacherCourses && <div id="teacher-courses">
                    <Link id="create-course-btn" to={`/createcourse`}>
                        <Button variant="primary" className='btn-add'>Create Course</Button>
                    </Link>

                    <p id="landing-subtitle">Instructor Courses</p>
                    <hr></hr>
                    
                    <div className='courses'>
                        {courses.teacherCourses.map((teacherCourse) => {
                            return <CourseCard key={teacherCourse.id} course={teacherCourse} role={"teacher"} />
                        })}
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default Landing;