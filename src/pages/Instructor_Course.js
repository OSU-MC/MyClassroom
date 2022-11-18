import React, {useEffect, useState} from 'react';


const controller = new AbortController();





function Instructor_Course(props) {
    
    // const [courses, setCourses] = useState([])

    // const controller = new AbortController();

    // useEffect( () => {
    //         async function populateCourses(){
    //             let courseBody={};
    //             try{
    //                 const response = await fetch(
    //                     "http://localhost:3001/api/course/",
    //                     {signal: controller.signal}

    //                 );
    //                 courseBody = await response.json();
    //             } catch (e) {
    //                 if (e instanceof DOMException) {
    //                   console.log("== HTTP request cancelled")
    //                 } else {
    //                   throw e;
    //                 }
    //               }
    //               console.log(courseBody)
    //             setCourses(courseBody)
    //         }
    //         populateCourses()

    //     }, [])

    console.log(props.data)
    return (
        
        <div>
            <p></p>
        </div>
    );
}

export default Instructor_Course;