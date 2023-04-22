import React from "react"


//we will need state variable to grab the email address.
//onClick is going to redirect 

//this function is prompting the user for email to send verification code
function ResetPasswordLogin() {

    return (
        
    <div>
        <h1>Password Reset</h1>
        <p>Please enter in your email address
           related to your account. We will send
           a confirmation code to that email.</p>
        <br/>

        <div>

            <form>
                <label>
                    <span>Please enter in your Email address</span>
                </label>
                <div>
                    <input placeholder="Enter Email address here..."/>
                </div>
                <div>
                    <button type="submit" onClick={console.log("Submit button was clicked...")}> Submit </button>
                </div>
            </form>

        </div>

    </div>
    
    )
}

//this function is the screen for the user to change their password to the account. 
//Using the PUT that includes email, confirmation code, rawpassword, and confirmed new password. 

//Ask Matthew/Mitchell on if the email sending/confirmation code verification is done in the backend.
function ResetPassword(){
return 
}

export default ResetPasswordLogin