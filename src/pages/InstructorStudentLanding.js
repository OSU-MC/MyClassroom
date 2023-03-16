import React from 'react';
import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard'
import { Button, Card } from "react-bootstrap"
import courseData from "./data/courseData.json"
import { useDispatch } from 'react-redux';
import apiUtil from '../utils/apiUtil'
import { setCourses } from '../redux/actions';
import JoinCourse from '../components/JoinCourse'

function InstructorStudentLanding(props) {
    // Will implement ability to hide/show once we figure out best way to modify the
    // data in the JSON with backend team
    //const [showHidden, setShowHidden] = useState(false)

    //course information
    const dispatch = useDispatch()
    const [ studentCourses, setStudentCourses] = useState([])
    const [ instructorCourses, setInstructorCourses] = useState([])
    //const [ editToggle, setEditToggle ] = useState(false)
    //const [ editCourse, setEditCourse ] = useState(false)

    const controller = new AbortController()

    useEffect( () => {
            async function populateCourses(){
                try{
                    const response = await apiUtil("get", "courses/");
                    if (response.status === 200) {
                        console.log(response.data)
                        //place the courses in states we can use
                        setStudentCourses(response.data.studentCourses)
                        setInstructorCourses(response.data.teacherCourses)
                        //send the data to the redux so it can be used elsewhere
                        dispatch(setCourses(response.data.studentCourses, response.data.teacherCourses))
                    }
                } catch (e) {
                    if (e instanceof DOMException) {
                      console.log("== HTTP request cancelled")
                    } else {
                      throw e;
                    }
                }
            }
            populateCourses()

        }, [])

        //return cards for student and teacher courses
        return(
            <>
            {/*Join Course button for all users*/}
            <JoinCourse className="buttons"/>

            {/*Student Courses*/}
            {studentCourses.length > 0 ? <div id="student-courses">
            {
                studentCourses.map((studentCourse) => 
                    <CourseCard currentCourse={studentCourse} CourseNumber={studentCourse.id} CourseName={studentCourse.name} view={"student"} />
            
                )
            }
            </div> : <div></div>}

            {/*Teacher Courses*/}
            {instructorCourses.length > 0 ? <div className="bkgrnd">
            <div className="buttons">
                <Button variant="secondary">
                    Create Course
                </Button>
                    
                </div>
                    <div>
                    {
                        instructorCourses.map((instructorCourse) =>  
                            <CourseCard currentCourse={instructorCourse} CourseNumber={instructorCourse.id} CourseName={instructorCourse.name} view={"landing"} setData={props.setData}/>
                        )
                    }
                    </div>
            </div> : <div></div>}
            </>
        )

        //OLD EDIT TOGGLE CODE
        /*else if(editToggle){
            return(
                <>
                <CourseCard editToggle={setEditToggle} editCourse={setEditCourse} currentCourse={instructorCourses[editCourse-1]} CourseNumber={instructorCourses[editCourse-1].id} CourseName={instructorCourses[editCourse-1].name} hidden={false} view={"landing"} isEdit={true}/>
                </>
            )
        }*/
}

export default InstructorStudentLanding;