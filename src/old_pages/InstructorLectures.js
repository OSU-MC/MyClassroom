import { Button, Card } from 'react-bootstrap';
import React, { useState, useEffect} from 'react';

import { Link, useParams } from 'react-router-dom';

function InstructorLectures(props) {


    const [lectures, setLectures] = useState([])
    const { id } = useParams();
    console.log(id)

    const controller = new AbortController();

    useEffect( () => {
        async function populateLectures(){
            let lectureBody={};
            try{
                const response = await fetch(
                    `http://localhost:3001/api/coursesession/`,
                    {signal: controller.signal}

                );
                lectureBody = await response.json();
            } catch (e) {
                if (e instanceof DOMException) {
                  console.log("== HTTP request cancelled")
                } else {
                  throw e;
                }
              }
              console.log(lectureBody)
              setLectures(lectureBody)
        }
        populateLectures()

    }, [])

    function openCourse(courseNum){
      fetch(`http://localhost:3001/api/coursesession/${courseNum}/`, {
        "method": "PATCH",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": "{\"open\":true}"
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
    }



    return (
        <div>
            {/* {lectures.map(lecture => 
                <Button>Start Lecture {lecture.id}</Button>
            )} */}
            {lectures.map(lecture => 
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lecture topic's description
                  </Card.Text>
                  <Link to={`/instructor_live_lecture/${lecture.id}`}><Button variant="primary" onClick={() => openCourse(lecture.id)}>Start Lecture {lecture.id}</Button></Link>
                </Card.Body>
              </Card>
            )}
        </div>
    );
}

export default InstructorLectures;