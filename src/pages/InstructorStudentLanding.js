import React from 'react';
import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard'
import { Button, Card } from "react-bootstrap"
import courseData from "./data/courseData.json"
import apiUtil from '../utils/apiUtil'

function InstructorStudentLanding(props) {

    // Will implement ability to hide/show once we figure out best way to modify the
    // data in the JSON with backend team
    //const [showHidden, setShowHidden] = useState(false)

    //user information
    const userId = localStorage.getItem("id") // TODO: store in Redux

    //course information
    const [ studentCourses, setStudentCourses] = useState([])
    const [ instructorCourses, setInstructorCourses] = useState([])


    const [ editToggle, setEditToggle ] = useState(false)
    const [ editCourse, setEditCourse ] = useState(false)

    const controller = new AbortController()

    useEffect( () => {
        
            async function populateCourses(){
                
                //get the courses for the user
                const resp = await apiUtil('get', `/courses/`)
                if (resp.status === 200) {
                    setStudentCourses(resp.data.studentCourses)
                    setInstructorCourses(resp.data.teacherCourses)
                    
                }
                else {
                    console.log(resp.data.error)
                }
                
                //get the role from enrollment 

            }
            populateCourses()

        }, [])

        //student and teacher
        if(studentCourses.length > 0 && !editToggle && instructorCourses.length > 0){
            console.log("how?????")
            console.log(studentCourses)
            console.log(instructorCourses)
            return(
                <>
                <div id="student-courses">
                {
                    studentCourses.map((studentCourse) => 
                        <CourseCard CourseNumber={studentCourse.id} CourseName={studentCourse.name} view={"student"} />
                
                    )
                }
                </div>
                <div className="bkgrnd">
                    <div className="buttons">
                    <Button variant="secondary">Add Course</Button>{' '}
                        
                    </div>
                        <div>
                        {
                            instructorCourses.map((instructorCourse) =>  
                                <CourseCard editToggle={setEditToggle} editCourse={setEditCourse} currentCourse={instructorCourse} CourseNumber={instructorCourse.id} CourseName={instructorCourse.name} hidden={false} view={"landing"} setData={props.setData}/>
                            )
                        }
                        </div>
                </div>
                </>
            )
        }

        //just student
        else if(studentCourses.length > 0){
            return(
                <div id="student-courses">
                {
                    studentCourses.map((studentCourse) => 
                        <CourseCard CourseNumber={studentCourse.id} CourseName={studentCourse.name} view={"student"} />
                
                    )
                }
                </div>
            )
        }

        //just teacher
        else if(!editToggle && instructorCourses.length > 0){
            return(
                <>
                <div className="bkgrnd">
                    <div className="buttons">
                    <Button variant="secondary">Add Course</Button>{' '}
                        
                    </div>
                        <div>
                        {
                            instructorCourses.map((instructorCourse) =>  
                                <CourseCard editToggle={setEditToggle} editCourse={setEditCourse} currentCourse={instructorCourse} CourseNumber={instructorCourse.id} CourseName={instructorCourse.name} hidden={false} view={"landing"} setData={props.setData}/>
                            )
                        }
                        </div>
                </div>
                </>
            )
        }
        else if(editToggle){
            return(
                /*TODO: REPLACE VIEW WITH THE USER TYPE INSTEAD OF HARDCODED*/
                <>
                <CourseCard editToggle={setEditToggle} editCourse={setEditCourse} currentCourse={instructorCourses[editCourse-1]} CourseNumber={instructorCourses[editCourse-1].id} CourseName={instructorCourses[editCourse-1].name} hidden={false} view={"landing"} isEdit={true}/>
                </>
            )
        }
        else{
            return(
                <>
                </>
            )
        }
}

export default InstructorStudentLanding;