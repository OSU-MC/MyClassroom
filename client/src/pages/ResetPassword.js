import React, { useRef, useState } from "react"
import '../styles/pages.css'
import apiUtil from '../utils/apiUtil'
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
const passwordConfirmInput = useRef(null)
const passwordInput = useRef(null)
const confirmationCodeInput = useRef(null)
const emailInput = useRef(null)
const navigate = useNavigate()

 console.log(email)
 console.log(confirmationCode)
 console.log(newPassword)
 console.log(confirmNewPassword)
 console.log(error)

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

        if(response.status == 200){
            navigate("/")
        }
    }

    

    function resetPasswordObjectStaging(){

        const resetPasswordInformation = {
            email: email,
            passwordResetCode: confirmationCode,
            rawPassword: newPassword,
            confirmedPassword: confirmNewPassword
        }

        resetPasswordRequest(resetPasswordInformation)
        emailInput.current.value = ''
        confirmationCodeInput.current.value = ''
        passwordInput.current.value = ''
        passwordConfirmInput.current.value = ''
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
                <input ref={emailInput} placeholder="Enter email here..." onChange={ (event) => {setEmail(event.target.value)} }/>
                <input ref={confirmationCodeInput} placeholder="Enter confirmation code here..." onChange={ (event) => {setConfirmationCode(event.target.value)} }/>
                <input ref={passwordInput} placeholder="Enter new password here..." onChange={ (event) => {setNewPassword(event.target.value)} }/>
                <input ref={passwordConfirmInput} placeholder="Enter new password to confirm here..." onChange={ (event) => {setConfirmNewPassword(event.target.value)} }/>

                <button onClick={resetPasswordObjectStaging} type="submit"> Reset Password</button>
            </form>
            { message !== "" && <Notice message={message} error={error}/> }
        </div>


    </div>
    )

}

export default ResetPasswordForLoginUser