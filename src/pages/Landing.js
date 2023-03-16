import React from 'react';
import CourseCard from '../components/CourseCard'
import { Button, Card } from "react-bootstrap"
import useCourses from '../hooks/useCourses'
import Notice from '../components/Notice'

function Landing(props) {
    // Will implement ability to hide/show once we figure out best way to modify the

    const courses = useCourses()
    
    // cards for student and teacher courses
    return(
        <>
            {!courses.studentCourses && !courses.instructorCourses && <Notice error={false} message={"You do not have any courses yet"}/>}
            {courses.studentCourses && <div id="student-courses">
                {courses.studentCourses.map((studentCourse) =>  {
                    return <CourseCard key={studentCourse.id} course={studentCourse} role={"student"} />        
                })}
            </div>}

            {courses.teacherCourses && <div id="teacher-courses">
                <div className="buttons">
                    <Button variant="secondary">Add Course</Button>
                </div>
                <div>
                    {courses.teacherCourses.map((teacherCourse) => {
                        return <CourseCard key={teacherCourse.id} course={teacherCourse} role={"landing"} />
                    })}
                </div>
            </div>}
        </>
    )
}

export default Landing;