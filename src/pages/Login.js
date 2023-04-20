import React, { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Dropdown, NavLink, Button, } from 'react-bootstrap'
import apiUtil from '../utils/apiUtil'
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import Notice from '../components/Notice'
import { Link } from "react-router-dom";

export default function Login(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ params ] = useSearchParams()

  //form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
        console.log(e)
        setError(e.response.data.error)
      }
    setLoading(false)
    if (response.status === 200) {
      dispatch(login(response.data.user, response.data.status))
      try {
        navigate(params.get('redirect'))
      }
      catch(e) {
        navigate('/')
      }
    }    
}



function handleSubmit() {
  event.preventDefault();
  setLoading(true)
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
          <br></br>
          { !loading && <Button onClick={() => {handleSubmit()}}>
            Login
          </Button> }
          <Link to="/password-reset">Change Password</Link>
        </Form>
          {
            error != "" && <Notice error={true} message={error}/>
          }
      </Container>
    </div>
    
  );
}