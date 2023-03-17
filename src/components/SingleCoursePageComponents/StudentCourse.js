import React, {useEffect, useState} from "react";

function StudentCourse(props) {
    return(
        <div>
        <h1>{props.course.title}</h1>
        <p>{props.course.description}</p>
        </div>
    )
}

export default StudentCourse