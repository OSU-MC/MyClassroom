import React from 'react';
import CourseCard from '../components/CourseCard'
import useCourses from '../hooks/useCourses'
import Notice from '../components/Notice'
import JoinCourse from '../components/JoinCourse'

function StudentLanding(props) {

    const [courses, message, error, loading] = useCourses()

    // cards for student and teacher courses
    return (
        <div className="user-courses">
            {/*No Courses*/}
            {message ? <Notice error={error ? "error" : ""} message={message} /> : (!courses.studentCourses && !courses.instructorCourses) ? <Notice message={"You do not have any courses yet"} /> : <></>}

            {/*Student Courses*/}
            {courses.studentCourses &&
                <div id="courses-page">
                    {/*Top line of  page*/}
                    <div className="landing-header">
                        <p id="landing-subtitle">Courses</p>
                        <JoinCourse />
                    </div>
                
                    {/*Sorting buttons*/}
                    <div className='course-sort'>
                        <span className ='selected'>ALL</span>
                        <span>ARCHIVED</span>
                    </div>
                
                    {/*Places all courses in course cards*/}
                    <div className='courses'>
                        {courses.studentCourses.map((studentCourse) => {
                            return <CourseCard key={studentCourse.id} course={studentCourse} role={"student"} />
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default StudentLanding;
