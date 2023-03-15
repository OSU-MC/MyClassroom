import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { setCourse } from '../redux/actions';

import { Link } from 'react-router-dom';

function CourseCard (props) {
  //variable declarations, using hookstates to initilize
  //const [ editedName, setEditedName ] = useState(props.CourseName)
  //const [ editedCRN, setEditedCRN ] = useState(props.CourseCRN)
  //const [ editedInstructors, setEditedInstructors ] = useState(props.CourseInstructor)
  //const [ editedCourse, setEditedCourse ] = useState({})
  //const [ saveChanges, setSaveChanges ] = useState(true)
  // console.log(editedName, editedCRN, editedInstructors)
  //useEffect(() => {
  //  console.log( editedCourse)
  //}, [editedCourse])
  const dispatch = useDispatch()

  async function saveCourseClicked(course){
    console.log(course)
    dispatch(setCourse(course))
  }

  //if(!props.hidden && !props.isEdit){
    return (
          //Using Card imported from React
          <div> 
            <Card>
            <Card.Header>Course Name: {props.CourseName}</Card.Header>
            <Card.Body>
              {/*OLD CARD CODE*/}
              {/*<Card.Text> Course CRN: {props.CourseCRN}</Card.Text>
              <Card.Text> Course Instructor: {props.CourseInstructor}</Card.Text>*/}
              {/* <Link to={props.view==="student" ? "/" : "/instructor/edit_course"}> */}
              {/*{props.view==="student" ? <Link to={`/student_live_lecture`}><Button className="hideBtn"> Join Session</Button></Link> : <Button 
              variant="primary"
              className="joinBtn" 
              onClick={() => {
                props.editToggle(true)
                props.editCourse(props.CourseNumber)
              }}>
              {props.view==="student" ?  <div></div> : <Button className="hideBtn">Go To Sections</Button>} */}

              {/*Join Button*/}
              {props.view==="student" ? 
              <Link to={`/studentSession`}>
                <Button className="joinBtn">
                  Join Session
                </Button>
              </Link> : 
              <div></div>}

              {/*View Course Button*/}
              {props.view==="student" ? 
              <Link to={`/singleCourse`}>
                <Button className="hideBtn" onClick={() => {saveCourseClicked(props.currentCourse)}}>
                  View Course
                </Button>
              </Link> : 
              <Link to={`/singleCourse`}>
                <Button className="hideBtn" onClick={() => {saveCourseClicked(props.currentCourse)}}>
                  View Sections For Course
                </Button>
              </Link>}

            </Card.Body>
          </Card>
        </div>
      );
  //}
  //creating indivudual "Cards" for each interface with different information about the Course.
  /*OLD EDIT TOGGLE CODE*/
  /*else if(props.isEdit){
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
                  onChange={(event)=> {setEditedName(event.target.value)}}>
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
                  //course_instructor : [
                  //</Card.Body>  editedInstructors
                  //]
            
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
    console.log("shouldn't be here")
    return(
      <></>
    )
  }*/
}

export default CourseCard;