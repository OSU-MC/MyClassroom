import React, { useRef, useState } from "react";
import apiUtil from '../utils/apiUtil'
import Notice from '../components/Notice'
import { useNavigate } from 'react-router-dom'
import '../styles/pages.css'

function Signup(props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [ message, setMessage ] = useState("")
    const [ error, setError ] = useState(false)
    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    const confirmPasswordInput = useRef(null)
    const firstNameInput = useRef(null)
    const lastNameInput = useRef(null)
    const navigate = useNavigate()


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
            lastName: lastName
        }

        CreateAccountRequest(accountInformation)
        emailInput.current.value = ''
        passwordInput.current.value = ''
        confirmPasswordInput.current.value = ''
        firstNameInput.current.value = ''
        lastNameInput.current.value = ''
    }

    return (
        <div>
            <h1>Sign up to use MyClassroom</h1>
            <form>
                <h2>Sign up with your email address</h2>
                <div>
                    <label>
                        <span>What's your email?</span>
                    </label>
                    <input ref={emailInput} onChange={ (event) => setEmail(event.target.value) } placeholder="Enter your email." />
                </div>

                <div>
                    <label>
                        <span>Create a password</span>
                    </label>
                    <input ref={passwordInput} onChange={ (event) => setPassword(event.target.value) } placeholder="Create your password."/>
                    <input ref={confirmPasswordInput} onChange={ (event) => setConfirmPassword(event.target.value) } placeholder="Confirm your password."/>
                </div>

                <div>
                    <label>
                        <span>What should we call you?</span>
                    </label>
                    <input ref={firstNameInput} onChange={ (event) => setFirstName(event.target.value) } placeholder="First name"/>
                    <input ref={lastNameInput} onChange={ (event) => setLastName(event.target.value) } placeholder="Last name"/>
                </div>

                <div>
                    <button onClick={createAccountStaging} type="submit">
                        <span>Sign Up</span>
                    </button>
                </div>
            </form>

            <div>
                { message !== "" && <Notice message={message} error={error ? "error" : ""}/> }
            </div>

        </div>
    )
}

export default Signup