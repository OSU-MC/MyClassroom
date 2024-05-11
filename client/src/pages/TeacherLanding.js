import React from 'react';
import CourseCard from '../components/CourseCard'
import { Button, Card } from "react-bootstrap"
import useCourses from '../hooks/useCourses'
import Notice from '../components/Notice'
import { Link } from 'react-router-dom';
import styles from '../styles/landing.css'
import AddCourse from './AddCourse.js'
import PageButton from '../components/2024/PageButton.js'


function TeacherLanding(props) {

    const [courses, message, error, loading] = useCourses()

    return (
        <div className="Teacher-landing-page">
            {/*No Courses*/}
            {message ? <Notice error={error ? "error" : ""} message={message} /> : (!courses.studentCourses && !courses.instructorCourses) ? <Notice message={"You do not have any courses yet"} /> : <></>}

            {/*Teacher Courses*/}
            {courses.teacherCourses && <div id="teacher-courses">
                    {/*<Link id="create-course-btn" to={`/createcourse`}>
                        <Button variant="primary" className='btn-add'>Create Course</Button>
                    </Link> */}



                <p id="landing-subtitle">Instructor Courses</p>
                <hr></hr>

                <PageButton newPage={< AddCourse/>} className='createCourseButton'>
                + Create New </PageButton>

                <div className='courses'>
                    {courses.teacherCourses.map((teacherCourse) => {
                        return <CourseCard key={teacherCourse.id} course={teacherCourse} role={"teacher"} />
                    })}
                </div>
            </div>}
        </div>
    )
}

export default TeacherLanding;