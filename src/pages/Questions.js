import React from 'react';
import QuestionListItem from '../components/QuestionListItem'
import { Button, Card } from "react-bootstrap"
import useQuestions from '../hooks/useQuestions'
import Notice from '../components/Notice'
import AddQuestions from '../components/AddQuestions'
import { Link } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'

function Questions(props) {
    // Will implement ability to hide/show once we figure out best way to modify the

    const [ questions, message, error, loading ] = useQuestions()
    
    // cards for student and teacher courses
    return(
        <>
            
        </>
    )
}

export default Questions;