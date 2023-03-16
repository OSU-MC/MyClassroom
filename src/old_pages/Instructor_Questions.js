import React from 'react';
import { Button, Card, Table} from "react-bootstrap"
import { useState, useEffect } from 'react';

function Instructor_Questions() {
    const [showQuestionPrompt, setQuestionPrompt] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [showList, setList] = useState(true)

    const removeQuestion = {
        
    }
    // will need to learn how to add questions manually since right now its hardcoded
    // using temp. data at the moment.
    return (
        <>
        <Button onClick={() => {setQuestionPrompt(true); setList(false)}}> Add a Question. </Button> 
        <div>
        { showQuestionPrompt == true && 
        <div className="questionList"> 
            <div className="addQuestion">
                <h2> Add a Question </h2>
                <hr />
                <li className="qstion"> Question: <input type="text" onChange={(event)=> {setQuestion(event.target.value)}}/></li>
                <li className="answer"> Answer:  <input type="text" onChange={(event)=> {setAnswer(event.target.value)}}/> </li>
               <div className="qButton">
                    <Button onClick={() => {setQuestionPrompt(false); setList(true)}}> Submit </Button> 
                    <Button onClick={() => {setQuestionPrompt(false); setList(true)}}> Cancel </Button> 
                </div>
            </div>
        </div>
        }
        <div>
        { showList == true && 
        <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Remove Question</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td> What is 1+1? </td>
                    <td> 2 </td>
                    <th><Button className="delete"> X </Button></th>
                    </tr>
                    
                    <tr>
                    <td> What is 2+2? </td>
                    <td> 4 </td>
                    <th><Button className="delete"> X </Button></th>
                    </tr>
                    
                    <tr>
                    <td> What is 3+3? </td>
                    <td> 6 </td>
                    <th><Button className="delete"> X </Button></th>
                    </tr>
                    
                    <tr>
                    <td> What is 4+4? </td>
                    <td> 8 </td>
                    <th><Button className="delete">  X </Button></th>
                    </tr>
                    <tr>
                    <td> {question} </td>
                    <td> {answer} </td>
                    <th><Button className="delete"> X </Button></th>
                    </tr>
                </tbody>
                </Table>
        }
        </div>
        </div>
        </>
    );
}

export default Instructor_Questions;