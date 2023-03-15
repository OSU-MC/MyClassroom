import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup, Button } from "react-bootstrap"
import './pages.css'
import apiUtil from '../utils/apiUtil'
import { getUserState } from '../redux/selectors'
import { useSelector } from 'react-redux';

function Profile(props) {
    // TODO: add password change fields: oldPassword, newPassword, confirmedPassword
    // TODO: add update functionality when clicking "Save"
    // TODO: create error handling functionality
    const userState = useSelector(getUserState)
    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");
    const [ email, setEmail] = useState("");
    const [ editToggle, setEditToggle ] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            const resp = await apiUtil('get', `/users/${userState.user.id}`)
            if (resp.status === 200) {
                // TODO: create a handler to set the state's values and the store's values
                setFirstName(resp.data.user.firstName)
                setLastName(resp.data.user.lastName)
                setEmail(resp.data.user.email)
            }
            else {
                console.log(resp.data.error)
            }
        }
        getUserInfo()
    }, [])

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
                            <Col xs={3}> <b>Email:</b> </Col> <Col><input type='text' value={email} onChange={(event)=> {
                        setEmail(event.target.value)}}></input></Col>
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
                            <Col xs={3}> <b>Email:</b> </Col> <Col><span>{email}</span></Col>
                        </ListGroup.Item>
                        
                        <Col xs={1} className='profileButton'> <Button onClick={() => setEditToggle(!editToggle)}>{editToggle ? "Save" : "Edit"}</Button> </Col>
                    </ListGroup>
            </Container>
        );
    }

}

export default Profile;