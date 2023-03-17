import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { joinCourse } from "../redux/actions";
import apiUtil from '../utils/apiUtil'

/******************************************************/
//Bugs:
//if A student enters a course which they have already joined
//no message for joinCodes which don't have a match
/******************************************************/

function JoinCourse(props){
    const dispatch = useDispatch()
    const [joinCode, setJoinCode] = useState("")
    const [joinedCourse, setJoinedCourse] = useState()

    async function handleJoinSubmit(){
        //setJoinCode(e.target.value)
        let joinResponse = {}
        try{
            //post to the courses/join endpoint
            const joinCodePayload = {
                joinCode: joinCode
            }
            joinResponse = await apiUtil("post", "courses/join", joinCodePayload);
        }
        catch(e){
            if (e instanceof DOMException) {
                console.log("== HTTP request cancelled")
            } else {
                throw e;
            }
        }

        //if the status is 200, update the courses belonging to the user in the redux
        //response of the courses/join endpoint is made up of section and enrollment
        //using the course_id in enrollment we can grab the course and update our redux
        if(joinResponse.status == 201){
            getJoinedCourse(joinResponse)
            dispatch(joinCourse(joinedCourse))
        }
        //if the status is 404, give error message that section was not found 
        else if(joinResponse.status == 404){
            console.log(joinResponse.status.error)
        }
        //if status is 401, give error message that something went wrong
        else{
            console.log(joinResponse.status.error)
        }
    }

    //response of the courses/join endpoint is made up of section and enrollment
    //using the course_id in enrollment we can grab the course and update our redux
    async function getJoinedCourse(joinResponse){
        const courses = useCourses()
        courseResponse.data.studentCourses.map((course) =>{
            if(course.id == joinResponse.data.enrollment.courseId){
                setJoinedCourse(course)
            }
        })
    }

    return (
        <>
        <Form onSubmit={() => handleJoinSubmit()}>
            <Form.Group controlId="formJoinCourse">
                <Form.Control type="text" placeholder="Enter Join Code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)}/>
            </Form.Group>
            <Button className="joinBtn" variant="primary" type="submit">
                Join Course
            </Button>
        </Form>
        </>
    );
}

export default JoinCourse;