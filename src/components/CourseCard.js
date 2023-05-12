import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

function CourseCard (props) {
    return (
          //Using Card imported from React
          <div> 
            <Card>
            <Card.Header>{props.course.name}</Card.Header>
            <Card.Body>
              
              {/*View Course Button*/}
              <Link to={`/${props.course.id}/lectures`}> {/* TODO: remove /lectures once the single course page has been updated with more functionality */}
                <Button className="hideBtn">
                  {props.role==="student" ? 'View Course' : 'View Sections For Course'}
                </Button>
              </Link>

            </Card.Body>
          </Card>
        </div>
      );
}

export default CourseCard;