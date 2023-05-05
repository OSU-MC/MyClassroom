import React, { useState } from "react"
import { Row, Col, Container, ListGroup, Button, NavLink } from "react-bootstrap"
import '../styles/pages.css'
import apiUtil from '../utils/apiUtil'
import { getUserState } from '../redux/selectors'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Notice from '../components/Notice'
import { TailSpin } from  'react-loader-spinner'

function ResetPasswordForLoginUser(){
const [email, setEmail] = useState("")
const [confirmationCode, setConfirmationCode] = useState("")
const [newPassword, setNewPassword] = useState("")
const [confirmNewPassword, setConfirmNewPassword] = useState("")
const [ error, setError ] = useState(false)
const [ message, setMessage ] = useState("")

// console.log(email)
// console.log(confirmationCode)
// console.log(newPassword)
// console.log(confirmNewPassword)

    async function resetPasswordRequest(passwordPayload){
        let response = {}

        response = await apiUtil('put', '/users', {}, passwordPayload)
        console.log(response)

        setError(response.error)
        setMessage(response.message)
        setEmail("")
        setConfirmNewPassword("")
        setNewPassword("")
        setConfirmationCode("")
    }

    function resetPasswordObjectStaging(){

        const resetPasswordInformation = {
            email: email,
            passwordResetCode: confirmationCode,
            rawPassword: newPassword,
            confirmedPassword: confirmNewPassword
        }

        resetPasswordRequest(resetPasswordInformation)

    }

    return(
        <div className="passwordDivContainer">
        <h1 className="passwordPageh1">Reset Password</h1>
        <p>Please enter in the confirmation code as well as the
            new password for the account.
        </p>
        <br/>

        <div>

            <form onSubmit={(event) => event.preventDefault()}>
                <input placeholder="Enter email here..." onChange={ (event) => {setEmail(event.target.value)} }/>
                <input placeholder="Enter confirmation code here..." onChange={ (event) => {setConfirmationCode(event.target.value)} }/>
                <input placeholder="Enter new password here..." onChange={ (event) => {setNewPassword(event.target.value)} }/>
                <input placeholder="Enter new password to confirm here..." onChange={ (event) => {setConfirmNewPassword(event.target.value)} }/>

                <button onClick={resetPasswordObjectStaging} type="submit"> Reset Password</button>
            </form>

        </div>

    </div>
    )

}

export default ResetPasswordForLoginUser