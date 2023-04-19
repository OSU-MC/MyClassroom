import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createCourse } from "../redux/actions";
import apiUtil from '../utils/apiUtil'
import { TailSpin } from  'react-loader-spinner'
import Notice from '../components/Notice'

function AddCourse(props){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [published, setPublished] = useState()
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function postCourse(newCoursePayload){
        //make a POST course api call
        setLoading(true)
        const response = await apiUtil("post", "/courses", { dispatch: dispatch, navigate: navigate}, newCoursePayload)
        setLoading(false)

        //update the redux
        setError(response.error)
        setMessage(response.message)
        if(response.status === 201){
            dispatch(createCourse(response.data.course))
            navigate(`/${response.data.course.id}`)
        }
    }

    function addCourseSubmit(e){
        event.preventDefault()

        const newCourse = {
            name: name,
            description: description,
            published: published
        }

        postCourse(newCourse)
    }

    return (
        <>
            { message !== "" && <Notice message={message} error={error}/> }
            { loading ? <TailSpin visible={true}/> : <Form onSubmit={(e) => { addCourseSubmit(e) }}>
                <Form.Group className="inputNameContainer" controlId="name">
                    <Form.Label>Class Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Class Name" 
                        onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="inputDescriptionContainer" controlId="description">
                    <Form.Label>Class Description:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Class Description"
                        onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group className="inputPublishedContainer" controlId="published">
                    <Form.Check 
                        type="switch" 
                        id="publishSwitch" 
                        label="Publish Class" 
                        size="large" 
                        onChange={(e) => setPublished(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Course
                </Button>
            </Form> }
        </>
    )
}

export default AddCourse;