import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from '../styles/CourseCard.css'

function CourseCard (props) {
    return (
            /* Top section of course card - placeholder term X*/
            <div className="course-card">
              <div className="course-header">
                <h1>{props.course.name}</h1>
                <h2 className="course-term">Term X</h2> 
              </div>
              
              {/* Bottom section of course card, placeholder registered number X*/}
              <div className="course-body">
                <p className='registered'> X registered </p>

                <a className = 'viewButton' href={`${props.course.id}/sections`}> {/*string template, fills in courseID/sections*/}
                  VIEW
                </a>
              </div>

          </div>
        
      );
}

export default CourseCard;