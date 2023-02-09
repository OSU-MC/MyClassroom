import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

import { Link } from 'react-router-dom';

function LectureCard (props) {

  const [ editedName, setEditedName ] = useState(props.LectureName)
  const [ editedID, setEditedID ] = useState(props.LectureID)
  const [ editedInstructors, setEditedInstructors ] = useState(props.LectureInstructor)
  const [ editedLecture, setEditedLecture ] = useState({})
  const [ saveChanges, setSaveChanges ] = useState(true)

  // console.log(editedName, editedID, editedInstructors)

  
  useEffect(() => {


    console.log( editedLecture)
    


  }, [editedLecture])


  if(!props.hidden && !props.isEdit){
    return (

          <div> 

            <Card>
            <Card.Header>Lecture: {props.c}</Card.Header>
            <Card.Body>
              <Card.Text> Lecture Name: {props.LectureName}</Card.Text>
              <Card.Text> Lecture CRN: {props.LectureID}</Card.Text>
              <Card.Text> Lecture Instructor: {props.LectureInstructor}</Card.Text>
              {/* <Link to={props.view==="student" ? "/" : "/instructor/edit_Lecture"}> */}

              <Button 
              variant="primary"
              className="joinBtn" 
              onClick={() => {
                props.editToggle(true)
                props.editLecture(props.LectureNumber)
              }}>
                {props.view==="student" ? "Join Session" : "Lecture Details"}
              </Button>

              {/* </Link> */}
              <Button variant="primary" className="hideBtn">Hide</Button>

            </Card.Body>
          </Card>

        </div>

      )
  }
  else if(props.isEdit){
    return(
      //this <> is called a fragment and it used to wrap elements in a parent tag so
      //it doesnt cause errors. <div> </div> also works but <> is more clean
      <>
        
        <Card>
            <Card.Header>Lecture: {props.LectureNumber}</Card.Header>
            <Card.Body>
              <Card.Text> Lecture Name: 
                <input 
                  type='text' 
                  placeholder={props.LectureName} 
                  value={editedName}
                  onChange={(event)=> {
                    setEditedName(event.target.value)}}>
                </input></Card.Text>

              <Card.Text> Lecture CRN: 
                <input 
                  type='text' 
                  placeholder={props.LectureID}
                  value={editedID}
                  onChange={(event)=> {
                    E(event.target.value)}}
                  ></input></Card.Text>

              <Card.Text> Lecture Instructor: 
                <input 
                  type='text' 
                  placeholder={props.LectureInstructor}
                  value={editedInstructors}
                  onChange={(event)=> {
                    setEditedInstructors(event.target.value)}}
                  >
                </input></Card.Text>

              <Button 
              variant="primary"
              className="joinBtn" 
              onClick={() => {
                setSaveChanges(!saveChanges)
                setEditedLecture({

                  id : props.LectureNumber,
                  Lecture_name : editedName,
                  crn : editedID,
                  Lecture_instructor : [
                    editedInstructors
                  ]
            
                })
                props.editLecture(props.LectureNumber)
              }}
              >Save Changes</Button>

            </Card.Body>
          </Card>
          <Button 
          variant="primary"
          className="joinBtn"
          onClick={() => {
            props.editToggle(false)
          
          }}
          >Done</Button>

        </>
          
    )
  }
  else{
    return(
      <></>
    )
  }
}

export default LectureCard;