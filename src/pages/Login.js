import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Dropdown, NavLink, Button } from 'react-bootstrap'
import apiUtil from '../utils/apiUtil'

export default function Login(props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [hideBtn, setHideBtn] = useState(true);
  const [badCredentials, setBadCredentials] = useState(false)
  const [success, setSuccess] = useState(false)

  // TODO: expand this validation & use it
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  // TODO: add some sort of loading symbol when waiting for a response
  async function authenticateUser(user){
    let response = {}
    try {
        response = await apiUtil('post', 'users/login', user)
    } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request cancelled")
        } else {
          console.log(e)
          throw e
        }
      }
    // TODO: add error handling on the request and display errors
    // TODO: set Redux store values for the user
    if (response.status === 200) {
      setLoginStatus(true)
      setSuccess(true)
      localStorage.setItem("id", response.data.user.id) // TODO: change to stored in Redux
      navigate('/landing')
    }
    else {
      setHideBtn(true)
      setBadCredentials(true)
      setSuccess(false)
    }
}



function handleSubmit() {

  event.preventDefault();

  const user = {
    email: email,
    rawPassword: password,
  }
  authenticateUser(user);
}

//atrribution for image: <a href="https://www.freepik.com/free-vector/empty-classroom-interior-school-college-class_6993851.htm#query=school%20classroom&position=0&from_view=search&track=ais">Image by upklyak</a> on Freepik
  return (
    <div className="Login">
      <Container className="contentContainer">
        <Container className='loginTop'>
            <Row>
                {/* <Col xs={3}>
                    <Image src={photo1} roundedCircle />
                </Col> */}
                <div className="imgTitleContainer">
                    {/* <img className="deskImg" src="deskimg.png"/> */}
                    <h1 className="loginTitle">Classroom Polling Application</h1>
                </div>
            </Row>
        </Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="emailContainer" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="passwordContainer" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {
          hideBtn &&
          <>
          <br></br>
          <Button onClick={() => {handleSubmit(); setHideBtn(false); setBadCredentials(false); setSuccess(true)}}>
            Login
          </Button>
      </>
        }
        </Form>
      </Container>
      { //TODO: fix this so the error isn't just text rendered over the image
        badCredentials && 
      <div>
        <h5 className="badRequest"> Invalid username or password. </h5>
      </div>
      }
      { success && 
      <div>
        <h5 className="successRequest"> Success! </h5>
      </div>
      }
    </div>
    
  );
}