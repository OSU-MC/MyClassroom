import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

import { Link } from 'react-router-dom';

function CourseCard (props) {

  const [ editedName, setEditedName ] = useState(props.CourseName)
  const [ editedCRN, setEditedCRN ] = useState(props.CourseCRN)
  const [ editedInstructors, setEditedInstructors ] = useState(props.CourseInstructor)
  const [ editedCourse, setEditedCourse ] = useState({})
  const [ saveChanges, setSaveChanges ] = useState(true)

  // console.log(editedName, editedCRN, editedInstructors)

  
  useEffect(() => {


    console.log( editedCourse)
    


  }, [editedCourse])


  if(!props.hidden && !props.isEdit){
    return (

          <div> 
            <Card>
            <Card.Header>Course: {props.CourseNumber}</Card.Header>
            <Card.Body>
              <Card.Text> Course Name: {props.CourseName}</Card.Text>
              <Card.Text> Course CRN: {props.CourseCRN}</Card.Text>
              <Card.Text> Course Instructor: {props.CourseInstructor}</Card.Text>
              {/* <Link to={props.view==="student" ? "/" : "/instructor/edit_course"}> */}
              {props.view==="student" ?  <Link to={`/student_live_lecture`}><Button className="hideBtn"> Join Session</Button></Link> : <Button 
              variant="primary"
              className="joinBtn" 
              onClick={() => {
                props.editToggle(true)
                props.editCourse(props.CourseNumber)
              }}
              >{props.view==="student" ? "Join Session" : "Course Details"}</Button>}             
              <Button variant="primary" className="hideBtn">Hide</Button>
              {props.view==="student" ?  <div></div> : <Link to={`/instructor/lectures/${props.CourseNumber}`}><Button className="hideBtn"> Go To Lectures</Button></Link>}
            </Card.Body>
          </Card>
        </div>

      )
  }
  else if(props.isEdit){
    return(
      <>
        <Card>
            <Card.Header>Course: {props.CourseNumber}</Card.Header>
            <Card.Body>
              <Card.Text> Course Name: 
                <input 
                  type='text' 
                  placeholder={props.CourseName} 
                  value={editedName}
                  onChange={(event)=> {
                    setEditedName(event.target.value)}}>
                </input></Card.Text>
              <Card.Text> Course CRN: 
                <input 
                  type='text' 
                  placeholder={props.CourseCRN}
                  value={editedCRN}
                  onChange={(event)=> {
                    setEditedCRN(event.target.value)}}
                  ></input></Card.Text>
              <Card.Text> Course Instructor: 
                <input 
                  type='text' 
                  placeholder={props.CourseInstructor}
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
                setEditedCourse({

                  id : props.CourseNumber,
                  course_name : editedName,
                  crn : editedCRN,
                  course_instructor : [
                    editedInstructors
                  ]
            
                })
                props.editCourse(props.CourseNumber)
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

export default CourseCard;