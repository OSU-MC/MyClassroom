import { React, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner'
import Notice from '../components/Notice'
import { Button, Card } from "react-bootstrap"
import useLectureQuestions from "../hooks/useLectureQuestions";
import useCourse from "../hooks/useCourse";
import useLectures from '../hooks/useLectures';
import QuestionCard from '../components/QuestionCard';

import io from 'socket.io-client';

//Socket.io under development 

function Lecture() {
    const [questions, message, error, loading] = useLectureQuestions()
    const [course, role, Cmessage, Cerror, Cloading] = useCourse()
    const [lectures, Lmessage, Lerror, Lloading] = useLectures()
    const { courseId, lectureId } = useParams()
    const [lecture, setLecture] = useState({})
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        // for future deployment fix this URL
        const newSocket = io(`http://localhost:3001`)
        setSocket(newSocket);

        if (role === 'student') {
            newSocket.emit('joinLectureAsStudent', { lectureId })
        } else if (role === 'teacher') {
            newSocket.emit('joinLectureAsTeacher', { lectureId })
        }

        newSocket.on('studentJoined', (data) => {
            console.log(`${data.studentId} has joined the lecture ${data.lectureId}`);
        });

        newSocket.on('studentLeft', (data) => {
            console.log(`${data.studentId} has left the lecture ${data.lectureId}`);
        });

        return () => {
            newSocket.emit('leaveLecture', { lectureId });
            newSocket.close();
        };
    }, [lectureId, role]);


    useEffect(() => {
        if (lectures[courseId] != null) {
            let foundLecture = lectures[courseId].find(lecture => lecture.id.toString() === lectureId);
            if (foundLecture) {
                setLecture(foundLecture);
            }
        }
    }, [lectures, courseId, lectureId]);

    return (
        <div className="lecture-page-container">
            {(loading | Cloading | Lloading) ? <TailSpin visible={true} /> : message ? <Notice error={error ? "error" : ""} message={message} /> : <div className="non-error">
                <div className="lecture-header">
                    <Link className='back-btn-lectures' to={`/${courseId}/lectures`}>
                        <Button className='back-btn'>
                            <div id="back-btn-image" />
                        </Button>
                    </Link>
                    <p className="lecture-subtitle">{lecture.title} Lecture Questions</p>
                </div>

                {Cmessage ? <Notice error={Cerror ? "error" : ""} message={Cmessage} /> : <></>}
                {Lmessage ? <Notice error={Lerror ? "error" : ""} message={Lmessage} /> : <></>}

                <hr className="lecture-hr"></hr>

                {/*If Student*/}
                {(role == "student" &&
                    <div className='lecture-container'>
                        <div className='questions'>
                            {loading ? <TailSpin visible={true} /> : questions.questions.map((question) => {
                                return <QuestionCard key={question.id} question={question} view={role} />
                            })}
                        </div>
                    </div>
                )}

                {(role == "teacher") &&
                    <div className='lecture-container'>
                        <div className="lecture-header-btns">
                            <Link to={`questions`}>
                                <Button className="btn-add" variant="secondary">Add Questions</Button>
                            </Link>
                        </div>

                        <div className='questions'>
                            {loading ? <TailSpin visible={true} /> : questions.questions.map((question) => {
                                return <QuestionCard key={question.id} question={question} view={role} />
                            })}
                        </div>
                    </div>}
            </div>}
        </div>
    )
}

export default Lecture