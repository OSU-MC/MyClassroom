import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinCourse } from "../redux/actions";
import apiUtil from "../utils/apiUtil";
import Notice from "./Notice";
import { getUserState } from "../redux/selectors";
import { useSelector } from "react-redux";
import { getUser } from "../redux/selectors";

function JoinCourse(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const user = useSelector(getUserState);

    async function handleJoinSubmit(e) {
        e.preventDefault();
        const joinCodePayload = {
            joinCode: joinCode,
            userId: user.id,
            courseId: props.courseId, 
            role: user.role 
        };
        const response = await apiUtil("post", "courses/join", { dispatch: dispatch, navigate: navigate }, joinCodePayload);
        setError(response.error);
        setMessage(response.message);
        if (response.status === 201) {
            dispatch(joinCourse(response.data.course));
        }
    }

    return (
        <div id="join-course">
            <Form onSubmit={handleJoinSubmit}>
                <Form.Group controlId="formJoinCourse">
                    <Form.Control type="text" placeholder="Enter Join Code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} />
                </Form.Group>
                <Button className="btn-add" variant="primary" type="submit">
                    Join Course
                </Button>
            </Form>
            {message !== "" && <Notice status={error ? "error" : ""} message={message} />}
        </div>
    );
}

export default JoinCourse;
