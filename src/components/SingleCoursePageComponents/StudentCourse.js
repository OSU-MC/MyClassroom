import React, {useEffect, useState} from "react";

function StudentCourse(props) {
    return(
        <div>
        <h1>{props.course.name}</h1>
        <p>{props.course.description}</p>
        <p>this is a student course btw (TESTING)</p>
        </div>
    )
}

export default StudentCourse