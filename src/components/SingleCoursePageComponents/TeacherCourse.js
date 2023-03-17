import React, {useEffect, useState} from "react";

function TeacherCourse(props) {
    return(
        <div>
        <h1>{props.course.name}</h1>
        <p>{props.course.description}</p>
        <p>this is a teacher course btw (TESTING)</p>
        </div>
    )
}

export default TeacherCourse