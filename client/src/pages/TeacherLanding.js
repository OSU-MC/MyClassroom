import React from 'react';
import CourseCard from '../components/CourseCard'
import { Button, Card } from "react-bootstrap"
import useCourses from '../hooks/useCourses'
import Notice from '../components/Notice'
import { Link } from 'react-router-dom';
import styles from '../styles/landing.css'
import AddCourse from './AddCourse.js'


/* AddCourseModal
    Renders a button that when clicked, renders a modal on the screen
    Should DEFINITELY be made into a reusable component in its own file later
 */
class AddCourseModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            viewForm: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        console.log(this.state.viewForm)

        this.setState({
            viewForm: !this.state.viewForm
        })
    }

    render(){
        return(
            <>
                <button onClick={this.handleClick}> Create Course </button>

                {this.state.viewForm && 
                    <div className='centeredModal'>
                        <div className='courseModal'>
                            <AddCourse />
                        </div>
                    </div>
                }
                
            </>
        )
    }
}

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

                <AddCourseModal / >


                <p id="landing-subtitle">Instructor Courses</p>
                <hr></hr>

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