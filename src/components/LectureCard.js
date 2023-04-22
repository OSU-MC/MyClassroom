import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function LectureCard (props) {
    return (<>
        <div className="lecture-card">
            <Card>
                <Card.Header>{props.lecture.title}</Card.Header>
                <Card.Body>
                    <p>props.lecture.description</p>

                    {props.view==="student" ? 
                        <Link to={`/studentlecture`}>
                            <Button className="viewLectureBtn">
                            Join Lecture
                            </Button>
                        </Link> : 
                    <div></div>}

                    {props.view==="teacher" ? 
                        <Link to={`/teacherlecture`}>
                            <Button className="viewLectureBtn">
                            Edit Lecture 
                            </Button>
                        </Link> : 
                    <div></div>}
                </Card.Body>
            </Card>
        </div>
    </>)
}

export default LectureCard;