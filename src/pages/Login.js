import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Dropdown, NavLink, Button } from 'react-bootstrap'
import photo1 from './photos/logo.jpg'
import Image from 'react-bootstrap/Image'
import apiUtil from '../utils/apiUtil'
//import { Ls } from "dayjs";
//import { Route } from "react-router-dom/cjs/react-router-dom.min";


export default function Login(props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [hideBtn, setHideBtn] = useState(true);
  const [userType, setUserType] = useState("")
  const [badCredentials, setBadCredentials] = useState(false)
  const [success, setSuccess] = useState(false)
  const controller = new AbortController();


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function studentAuth(userDB){
    setUserType("student");
    for(var i=0; i < userDB.count; i++){
      if(userDB.results[i].email == email && userDB.results[i].password == password){
        props.setUser("student");
        localStorage.setItem("id", JSON.stringify(userDB.results[i].id));
        localStorage.setItem("firstname", JSON.stringify(userDB.results[i].firstname));
        localStorage.setItem("lastname", JSON.stringify(userDB.results[i].lastname));
        localStorage.setItem("user", JSON.stringify(userDB.results[i].user));
        localStorage.setItem("enrolled_course", JSON.stringify(userDB.results[i].enrolled_course));
        setLoginStatus(true);
        return;
      }
    }
    setHideBtn(true)
    setBadCredentials(true)
    setSuccess(false)
    // alert("Incorrect username or password");
  }
  
  function instructorAuth(userDB){
    setUserType("instructor");

    for(var i=0; i < userDB.count; i++){
      if(userDB.results[i].email == email && userDB.results[i].password == password){
        props.setUser('instructor');
        localStorage.setItem("id", JSON.stringify(userDB.results[i].id));
        localStorage.setItem("firstname", JSON.stringify(userDB.results[i].firstname));
        localStorage.setItem("lastname", JSON.stringify(userDB.results[i].lastname));
        localStorage.setItem("user", JSON.stringify(userDB.results[i].user));
        setLoginStatus(true);

        console.log("valid login");

        return;
      }
    }
    setHideBtn(true)
    setBadCredentials(true)
    setSuccess(false)
    //alert("Incorrect username or password");
  }



  async function authenticateUser(user){
    let respBody = {}
    let response = {}
    console.log(user)
    try {
        response = await apiUtil('post', 'users/login', user)
        //respBody = await response.json()
    } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request cancelled")
        } else {
          console.log(e)
          throw e
        }
      }
    if (response.status === 200) {
      console.log(response)
      setLoginStatus(true)
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
      { badCredentials && 
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