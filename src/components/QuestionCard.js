import React from 'react';
import {Card, Button} from 'react-bootstrap'

function QuestionCard(props) {
    return (
        <>
            <div className='cardContainer'>
                <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title> Question {props.question_id} </Card.Title>
                    <Card.Text>
                    {props.prompt}
                    </Card.Text>
                </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default QuestionCard;