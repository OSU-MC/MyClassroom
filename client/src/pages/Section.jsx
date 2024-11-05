import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import useLecturesInSection from '../hooks/useLecturesInSection';
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import LectureCard from '../components/LectureCard';

function Section() { 
    //get the lectures for the current course & section
    const { sectionId, courseId } = useParams()
    const [ lecturesInSection, message, error, loading] = useLecturesInSection()

    return ((loading) ? <TailSpin visible={true}/> : <div className="contentView">
                <div className='lectures-top-bar'>
                    <Link className='back-btn-lectures' to={`/${courseId}/sections`}>
                        <Button className='back-btn'> 
                            <div id="back-btn-image"/>
                        </Button>
                    </Link>

                    <p id="lectures-subtitle">Lectures for Section</p>
                </div>
                <hr></hr>
                {(message != "") ? <Notice error={error ? "error" : ""} message={message}/> : (lecturesInSection.length == 0) ? <Notice message={"You Do Not Have Any Lectures Yet"}/> : <></> }
                    <div className="horizontal-flex-container">
                        { lecturesInSection.map((lecture) => {
                            return <LectureCard key={lecture.id} lecture={lecture} view={'teacher'} section={sectionId}/>
                        })}
                    </div>
                </div>
            )
}

export default Section