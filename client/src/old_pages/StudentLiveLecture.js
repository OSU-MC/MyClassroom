import React from 'react';
//import questionData from "./data/questionsData.json"
import QuestionCard from "../components/QuestionCard"
import {Button} from 'react-bootstrap'
import {useState, useEffect } from 'react';
import './temp.css'

function StudentLiveLecture(props) {
    const [userInput, setUserInput] = useState("")
    const [finalAnswer, setfinalAnswer] = useState("")
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionData, setQuestionData] = useState([   
    {
        "id": 1,
        "prompt": "",
        "question_id": "",
        "answer": "",
        "image": ""
    }

    ])



    const controller = new AbortController();

    const saveValue  = () => {
        setfinalAnswer(userInput)
    }

    
    useEffect( () => {
        async function populateQuestions(){
            let questionBody={};
            try{
                const response = await fetch(
                    "http://localhost:3001/api/question/",
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
            setQuestionData(questionBody)
        }
        populateQuestions()

    }, [])


    useEffect( () => {
        async function current_ques(){
            let currQues={};
            try{
                const response = await fetch(
                    "http://localhost:3001/api/coursesession/",
                    {signal: controller.signal}

                );
                currQues = await response.json();
            } catch (e) {
                if (e instanceof DOMException) {
                  console.log("== HTTP request cancelled")
                } else {
                  throw e;
                }
              }
              setCurrentQuestion(currQues[0].current_question)
              console.log(currentQuestion)
        }
        current_ques()

    }, [])


    return (
        <div className='pageContainer'>
        <div>
            TEST2
             <QuestionCard question_id = {questionData[currentQuestion].id} prompt = {questionData[currentQuestion].prompt}  image={questionData[currentQuestion].image} answer={questionData[currentQuestion].answer}/>
        </div>
        <div className="inputB"> 
            <input type="text" onChange={(e) => {setUserInput(event.target.value)}} ></input> <Button onClick={saveValue}> Submit </Button>

        </div>
        <div className="inputB">
            You Answered: {finalAnswer}
            </div>
    </div>
    );
}

export default StudentLiveLecture;