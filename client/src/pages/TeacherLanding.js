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

            {courses.teacherCourses && 
            <div id="teacher-courses">

                <div className='landing-header'>
                    <p id="landing-subtitle">Courses</p>

                    <PageButton newPage={< AddCourse/>} className='createCourseButton'>
                    + Create New </PageButton>
                </div>
                
                <div className='course-sort'>
                    <span className ='selected'>ALL</span>
                    <span >PUBLISHED</span>
                    <span >ARCHIVED</span>
                    <span >DRAFT</span>
                </div>

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