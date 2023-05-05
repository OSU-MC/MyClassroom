import React, { useState } from "react"
import { Row, Col, Container, ListGroup, Button, NavLink } from "react-bootstrap"
import '../styles/pages.css'
import apiUtil from '../utils/apiUtil'
import { getUserState } from '../redux/selectors'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Notice from '../components/Notice'
import { TailSpin } from  'react-loader-spinner'

//we will need state variable to grab the email address.
//onClick is going to redirect 

//this function is prompting the user for email to send verification code
function ConfirmationCodePasswordRequest() {
    const [email, setEmail] = useState("")
    const [ error, setError ] = useState(false)
    const [ message, setMessage ] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    
    async function confirmationCodeRequest(emailPayload){
        let response = {}

        response = await apiUtil('put', '/users/password', {}, emailPayload)
        console.log(response);

        if(response.status == 200){
            navigate("/reset/password")
        }

        setError(response.error)
        setMessage(response.message)
        setEmail("")
    }


    function emailObjectStaging(){

        const emailInput = {
            email: email
        }

        //console.log({emailInput})
        confirmationCodeRequest(emailInput)

    }

    
    return (
    <div className="passwordDivContainer">
        <h1 className="passwordPageh1">Confirmation Code</h1>
        <p>Please enter in your email address
           related to your account. We will send
           a confirmation code to that email.</p>
        <br/>

        <div>

            <form onSubmit={(event) => event.preventDefault()}>
                <div>
                    <input onChange={(input) => setEmail(input.target.value)} placeholder="Enter email address here..."/>
                </div>
                <br/>
                <div>
                    <button type="submit" onClick={emailObjectStaging}> Send Code </button>
                </div>
            </form>

        </div>

    </div>
    
    )
}

//this function is the screen for the user to change their password to the account. 
//Using the PUT that includes email, confirmation code, rawpassword, and confirmed new password. 


export default ConfirmationCodePasswordRequest