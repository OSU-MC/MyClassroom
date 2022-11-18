import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Container, Row, Col, Dropdown, NavLink, Button } from 'react-bootstrap'
import photo1 from './photos/logo.jpg'
import Image from 'react-bootstrap/Image'
//import { Ls } from "dayjs";
//import { Route } from "react-router-dom/cjs/react-router-dom.min";


export default function Login(props) {
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
    let userDB = {};
    try{
        const response = await fetch(
            ("http://localhost:3001/api/" + user.userType + "/") ,
            {signal: controller.signal}

        );
        userDB = await response.json();
    } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request cancelled")
        } else {
          throw e;
        }
      }

      if (user.userType == 'student') {
        console.log(userDB);
        studentAuth(userDB);
      }
      else if(user.userType=='instructor'){
        console.log(userDB);
        instructorAuth(userDB);
      }
      else{
        console.log("Invalid user type")
      }
}



function handleSubmit(type) {

  event.preventDefault();

  const user = {
    userType: type,
    email: email,
    password: password,

  }
  authenticateUser(user);
}


  return (
    <div className="Login">

        <Container className='loginTop'>
            <Row>
                <Col xs={3}>
                    <Image src={photo1} roundedCircle />
                </Col>
                <Col>
                    <h1>Active Learning Responsive Technology</h1>
                </Col>
            </Row>
        </Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
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
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" type="button" disabled={!validateForm()}>
        Login
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Button onClick={() => {handleSubmit("instructor"); setHideBtn(false); setBadCredentials(false); setSuccess(true)}}>
            Login as Instructor
          </Button>
          <Button onClick={() => {handleSubmit("student"); setHideBtn(false); setBadCredentials(false); setSuccess(true)}}>
            Login as Student
          </Button>
            </Dropdown.Menu>
        </Dropdown>
      </>
        }
        </Form>
      {loginStatus &&
      <div className="loginContainer">
      <Link to={"/" + userType + "/landing"} className="loginBtn"> Login  </Link>
      </div>
      }
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