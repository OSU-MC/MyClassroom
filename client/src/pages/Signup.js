import React, { useRef, useState } from "react";
import apiUtil from '../utils/apiUtil'
import Notice from '../components/Notice'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

function Signup(props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isTeacher, setIsTeacher] = useState(false);
    const [ message, setMessage ] = useState("")
    const [ error, setError ] = useState(false)
    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    const confirmPasswordInput = useRef(null)
    const firstNameInput = useRef(null)
    const lastNameInput = useRef(null)
    const navigate = useNavigate()

    const handleCheckboxChange = (event) => {
        setIsTeacher(event.target.checked);
    }
    async function CreateAccountRequest(accountPayload){
        let response = {}

        response = await apiUtil('post', '/users', {}, accountPayload)

        setError(response.error)
        setMessage(response.message)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setFirstName("")
        setLastName("")
        setIsTeacher(false)

        if(response.status == 201){
            navigate("/login")
        }
    }

    function createAccountStaging(){
        event.preventDefault()

        const accountInformation = {
            email: email,
            rawPassword: password,
            confirmedPassword: confirmPassword,
            firstName: firstName,
            lastName: lastName,
            isTeacher: isTeacher
        }

        CreateAccountRequest(accountInformation)
        emailInput.current.value = ''
        passwordInput.current.value = ''
        confirmPasswordInput.current.value = ''
        firstNameInput.current.value = ''
        lastNameInput.current.value = ''
    }

    class SignupForm extends React.Component {
        constructor(props){
        super(props);
        this.state = {
            email: '',
            rawPassword: '',
            confirmedPassword: '',
            firstName: '',
            lastName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // every time a text box is updated, it's react state is updated as well.
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    //input React states to CreateAccountRequest function.
    handleSubmit() {
        event.preventDefault();

        const accountInformation = {
            email: this.state.email,
            rawPassword: this.state.rawPassword,
            confirmedPassword: this.state.confirmedPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            isTeacher: this.state.isTeacher
        }
        
        CreateAccountRequest(accountInformation)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>

            <label class="switch">
                <p id="studentText"> I am a <b>student</b> </p>
                <p id="teacherText"> I am a <b>teacher</b> </p>
                {/* TODO: Fix animation (Unfortunately, using react on this checkbox breaks the animation.)*/}
                <input type="checkbox" checked={isTeacher} onChange={handleCheckboxChange} />
                <span class="slider"></span>
            </label>

            {/*Input fields: value mapped to React state through handleChange*/}
            <input type="text" name="firstName"
              value={this.state.firstName} onChange={this.handleChange}
              className="inputContainer firstNameContainer" placeholder="First Name"
            />
            <input type="text" name="lastName"
              value={this.state.lastName} onChange={this.handleChange}
              className="inputContainer lastNameContainer" placeholder="Last Name"
            />
            <input type="text" name="email"
              value={this.state.email} onChange={this.handleChange}
              className="inputContainer emailContainer" placeholder="Email Address"
            />
            <input type="password" name="rawPassword"
              value={this.state.rawPassword} onChange={this.handleChange}
              className="inputContainer passwordContainer" placeholder= "Password"
            />
            <input type="password" name="confirmedPassword"
              value={this.state.confirmedPassword} onChange={this.handleChange}
              className="inputContainer passwordContainer" placeholder= "Confirm Password"
            />

            <input type="submit" value="Get Started" className= "submitButton" />

            <p className='orSSOText'> or </p>

            <input type="submit" value="Continue with SSO" className= "ssoButton" />
            </form>
        )
    }
}

    return (
        <div id="signUp">
            <div className='leftContainer'>
                <div className= 'welcomeBox'>
                    <span className='classroomLink'>
                        {/*Image attr: Unknown, need to ask*/}
                        <img className="classroomIcon" src="classroomIcon.png" />
                        {process.env.REACT_APP_NAME}
                    </span>
                    <div className='textBox'>
                        <p className='mainText'> Create your free account today! </p>
                        <a href="login" className='subText'> already have an account? </a>
                    </div>
                    <div className='linkBox'>
                        <a href="/home" className='homeButton'> Return to home </a>
                    </div>
                </div>
            </div>
            <div className='rightContainer'>
                <div className='loginSection'>
                    <p className='mainText'> Sign Up </p>
                    <SignupForm />
                </div>
            </div>
        </div>
        )
    }

export default Signup
