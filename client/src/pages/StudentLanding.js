import React from 'react';
import CourseCard from '../components/CourseCard'
import useCourses from '../hooks/useCourses'
import Notice from '../components/Notice'
import JoinCourse from '../components/JoinCourse'
import { TailSpin } from 'react-loader-spinner'

function StudentLanding(props) {

    const [courses, message, error, loading] = useCourses()

    // cards for student and teacher courses
    return (
        <div className="courses-page">
            {/*No Courses*/}
            {message ? <Notice error={error ? "error" : ""} message={message} /> : (!courses.studentCourses && !courses.instructorCourses) ? <Notice message={"You do not have any courses yet"} /> : <></>}
            {/*Join Course button for all users*/}
            <JoinCourse className="buttons" />

            {/*Student Courses*/}
            {loading ? <TailSpin visible={true} /> :
                <div className="all-courses">
                    {courses.studentCourses != null &&
                        <div id="courses">
                        <p id="landing-subtitle" >Student Courses</p>
                        <hr></hr>
                        
                        <div className='courses'>
                        {courses.studentCourses.map((studentCourse) => {
                            return <CourseCard key={studentCourse.id} course={studentCourse} role={"student"} />
                        })}
                        </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default StudentLanding;
