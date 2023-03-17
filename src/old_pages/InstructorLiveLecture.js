import React, { useState, useEffect } from 'react';
import '../components/QuestionCard'
import QuestionCard from '../components/QuestionCard';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// import questionData from "./data/questionsData.json"


import './temp.css'

function InstructorLiveLecture(props) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    var c_question = 1;
    const { id } = useParams();
    
    const [questionData, setQuestionData] = useState([ 
        {
            "id": 1,
            "prompt": "",
            "question_id": "",
            "answer": "",
            "image": ""
        }
    ])
    
    console.log("LENGTH" + questionData.length)
    console.log(currentQuestion)


    const controller = new AbortController();

    useEffect( () => {
        let questionBody={};
        async function populateQuestions(){
            try{
                const response = await fetch(
                    // "http://localhost:3001/api/question/",
                    "http://localhost:3001/api/coursesession/",
                    {signal: controller.signal}

                );
                questionBody = await response.json();
            } catch (e) {
                if (e instanceof DOMException) {
                  console.log("== HTTP request cancelled")
                } else {
                  throw e;
                }
              }
              console.log(questionBody)
            setQuestionData(questionBody[id-1].question)
        }
        populateQuestions()

    }, [])

    function next_question(){

        console.log(currentQuestion)
        fetch("http://localhost:3001/api/coursesession/1/", {
            method: 'PATCH',
            body: JSON.stringify({
                "current_question": currentQuestion + 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        setCurrentQuestion(currentQuestion + 1)
    }
    function prev_question(){

        console.log(currentQuestion)
        fetch("http://localhost:3001/api/coursesession/1/", {
            method: 'PATCH',
            body: JSON.stringify({
                "current_question": currentQuestion - 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        setCurrentQuestion(currentQuestion - 1)
    }

    function closeCourse(){
        fetch(`http://localhost:3001/api/coursesession/${id}/`, {
          "method": "PATCH",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": "{\"open\":false}"
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.error(err);
        });
    }


    return (
        <>
            <div className='pageContainer'>
                <div>
                    <QuestionCard question_id = {questionData[currentQuestion].id} prompt = {questionData[currentQuestion].prompt}  image={questionData[currentQuestion].image} answer={questionData[currentQuestion].answer}/>         
                </div> 
                <div className='buttonContainerOne'>
                    <Button className='previousButton' onClick={() => {
                        if(!(currentQuestion <= 0)){
                            prev_question()
                        }
                    }}>Previous Question</Button>
                    <Button className='nextButton' onClick={() => {
                        if(currentQuestion + 1 < questionData.length){
                            next_question()
                        }    
                    }}>Next Question</Button>
                    
                </div>
                <div className='buttonContainerTwo'>
                    <Link to="/instructor/landing"><Button className='closeButton' onClick={() => closeCourse()}>Close Session</Button></Link>
                </div>
            </div>
        </>
    );
}

export default InstructorLiveLecture;