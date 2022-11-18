import React, { useState } from 'react';
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap"
import instructorData from './data/InstructorProfileData.json'
import './pages.css'

function Instructor_Profile(props) {

    const [ firstName, setFirstName] = useState(instructorData[0].first_name);
    const [ lastName, setLastName] = useState(instructorData[0].last_name);
    const [ phone, setPhone] = useState(instructorData[0].phone);
    const [ department, setDepartment] = useState(instructorData[0].department);
    const [ editToggle, setEditToggle ] = useState(false);

    console.log(editToggle)

    // Doesn't resize well, need to make sure and fix that!
    
    if(editToggle){
        return (
            <Container className='profileInfo'>
                    <ListGroup className='tester'>
                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>First Name:</b> </Col> <Col><input type='text' value={firstName} onChange={(event)=> {
                        setFirstName(event.target.value)}}></input></Col>     
                        </ListGroup.Item>
                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>Last Name:</b> </Col> <Col><input type='text' value={lastName} onChange={(event)=> {
                        setLastName(event.target.value)}}></input></Col>
                        </ListGroup.Item>
                        <ListGroup.Item className='profileRow'>
                            {/* Need to add validation for these to be numbers, add dashed automatically? */}
                            <Col xs={3}> <b>Phone Number:</b> </Col> <Col><input type='text' value={phone} onChange={(event)=> {
                        setPhone(event.target.value)}}></input></Col>
                        </ListGroup.Item>
                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>Department:</b> </Col> <Col><input type='text' value={department} onChange={(event)=> {
                        setDepartment(event.target.value)}}></input></Col>
                        </ListGroup.Item>
                        <Col xs={1} className='profileButton'> <Button onClick={() => setEditToggle(!editToggle)}>{editToggle ? "Save" : "Edit"}</Button> </Col>
                    </ListGroup>
            </Container>
        );
    }
    else{
        return (
            <Container className='profileInfo'>
                    <ListGroup className='tester'>
                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>First Name:</b> </Col> <Col><span>{firstName}</span></Col>     
                        </ListGroup.Item>
                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>Last Name:</b> </Col> <Col><span>{lastName}</span></Col>
                        </ListGroup.Item>
                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>Phone Number:</b> </Col> <Col><span>{phone}</span></Col>
                        </ListGroup.Item>
                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>Department:</b> </Col> <Col><span>{department}</span></Col>
                        </ListGroup.Item>
                        <Col xs={1} className='profileButton'> <Button onClick={() => setEditToggle(!editToggle)}>{editToggle ? "Save" : "Edit"}</Button> </Col>
                    </ListGroup>
            </Container>
        );
    }

}

export default Instructor_Profile;