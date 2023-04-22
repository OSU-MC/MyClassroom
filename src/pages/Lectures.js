import React from 'react';
import { Link } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'
import useLectures from '../hooks/useLectures';
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import useCourse from "../hooks/useCourse";
import LectureCard from '../components/LectureCard';

function Lectures(props){
    //get the lectures for the current course & section
    const [lectures, message, error, loading] = useLectures()
    const [ course, role, Cmessage, Cerror, Cloading ] = useCourse()

    return (
        <>
        {/*No Lectures*/}
        { message ? <Notice error={error} message={message}/> : (!lectures) ? <Notice error={false} message={"You Do Not Have Any Lectures Yet"}/> : <></>}

        {/*Add Lecture Button - ONLY if enrollment == instructor*/}
        <div className="buttons">
            <Link to={`/createlecture`}>
                <Button variant="secondary">Create Lecture</Button>
            </Link>
        </div>

        <div className="lecture-container">
            {console.log(course)}
            {lectures[1].map((lecture) => {
                return <LectureCard key={lecture.id} course={lecture[1][course.id]} role={role} />
            })}
        </div>
        </>
    )
}

export default Lectures;