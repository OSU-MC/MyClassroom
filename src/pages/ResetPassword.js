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
    return(
        <div className="passwordDivContainer">
        <h1 className="passwordPageh1">Reset Password</h1>
        <p>Please Enter in the confirmation code as well as the
            new password for the account.
        </p>
        <br/>

        <div>

            <form onSubmit={(event) => event.preventDefault()}>
            </form>

        </div>

    </div>
    )

}

export default ResetPasswordForLoginUser