import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import Notice from "./Notice";
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
    const [error, setError] = useState("")

    async function handleJoinSubmit(e){
        event.preventDefault()
        //setJoinCode(e.target.value)
        let joinResponse = {}
        try{
            //post to the courses/join endpoint
            const joinCodePayload = {
                joinCode: joinCode
            }
            joinResponse = await apiUtil("post", "courses/join", joinCodePayload);
            dispatch(joinCourse(joinResponse.data.course))
        }
        catch(e){
            if (e instanceof DOMException) {
                console.log("== HTTP request cancelled")
            } else {
                setError(e.response.data.error)
            }
        }
    }

    return (
        <>
        <Form onSubmit={(e) => { handleJoinSubmit(e)} }>
            <Form.Group controlId="formJoinCourse">
                <Form.Control type="text" placeholder="Enter Join Code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)}/>
            </Form.Group>
            <Button className="joinBtn" variant="primary" type="submit">
                Join Course
            </Button>
        </Form>
        {(error === "") ? <></> : <Notice error="true" message={error}/>}
        </>
    );
}

export default JoinCourse;