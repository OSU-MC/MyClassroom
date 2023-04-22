import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup, Button, NavLink } from "react-bootstrap"
import '../styles/pages.css'
import apiUtil from '../utils/apiUtil'
import { getUserState } from '../redux/selectors'
import { useSelector } from 'react-redux';
import ResetPasswordEmailConfirmation from './ResetPassword';
import { Link } from "react-router-dom";

// 1: have a function for the editToggle setting. 
// 2: have a function then grabs the data from the fields and then sends it off in the put request.

function Profile(props) {
    // TODO: add password change fields: oldPassword, newPassword, confirmedPassword
    // TODO: add update functionality when clicking "Save"
    // TODO: create error handling functionality
    const userState = useSelector(getUserState);
    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");
    const [ email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
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

    function settingEditToggle(){
        setEditToggle(!editToggle)
    }

    //--This function is essentially the main "PUT" request for editing the Account info.
    async function editAccountInfoRequest(accountPayload) {
        let response = {};

        try{
            response = await apiUtil("put", `/users/${userState.user.id}`, accountPayload)
            console.log(response);
        } catch (e) {
            if (e instanceof DOMException) {
                console.log("== HTTP request was cancelled");
            } else {
                console.log(e);
            }
        }
    }

    function sendEditedAccountInfo(){

        const newAccountInfo = {
            oldPassword: currentPassword,
            rawPassword: newPassword,
            confirmedPassword: confirmedPassword,
            email: email,
            firstName: firstName,
            lastName: lastName
        }

        editAccountInfoRequest(newAccountInfo);
    }

    function onClickFunctions(){
        settingEditToggle();
        sendEditedAccountInfo();
    }

    // Doesn't resize well, need to make sure and fix that!
    if(editToggle){
        return (
            //!--The content that shows here is seen after pressing the "Edit" button, the button should now say "Save"--!//
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

                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>Current Password:</b> </Col> <Col><input type='text' onChange={(event)=> {
                        setCurrentPassword(event.target.value)}}></input> </Col>
                        </ListGroup.Item>

                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>New Password:</b> </Col> <Col><input type='text' onChange={(event)=> {
                        setNewPassword(event.target.value)}}></input></Col>
                        </ListGroup.Item>

                        <ListGroup.Item className='profileRow'>
                            <Col xs={3}> <b>Confirm New Password:</b> </Col> <Col><input type='text' onChange={(event)=> {
                        setConfirmedPassword(event.target.value)}}></input></Col>
                        </ListGroup.Item>
                        
                        <Col xs={1} className='profileButton'> <Button onClick={onClickFunctions}> {editToggle ? "Save" : "Edit"} </Button> </Col>
                    </ListGroup>
            </Container>
        
        );
    }
    else{
        return (
            //!--The content that shows here is seen before pressing the "Edit" button--!//
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