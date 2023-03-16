import React from 'react'
import CourseCard from '../components/CourseCard'
import {Button} from "react-bootstrap"
import CourseData from "./data/courseData.json"
import ProfileData from "./Profile.js"
import StudentGradeBookData from "./data/studentGradebookData.json";
import BasicTable from"./BasicTable"
import studentGradeBookNewData from  './data/studentGradebookNewData.json'
import {COLUMNS_studentGradebook}  from '../components/StudentGradebookColumns'



const title1 = "Introduction to Physics: 001 Winter, 2022"
const title2 = "Math: 400 Winter, 2022"
function StudentGradeBook() {
    return (
        <>
        

        
        <div id="student-gradebook-info">
            <h2 id="student-name">Gradebook for Linshengyi Sun</h2>
                
        </div>

        <div className="student-gradebook-grade-table">

            
        {BasicTable(studentGradeBookNewData,COLUMNS_studentGradebook,title1)}

        {BasicTable(studentGradeBookNewData,COLUMNS_studentGradebook,title2)}
            {/* <table>  
                <tbody>  
                <tr>
                    <td colSpan="4" id="student-gradebook-grade-table-headline">Introduction to Physics: 001 Winter, 2022</td>
                </tr> 
                <tr>
                    <th>Date Posted</th>
                    <th>Lecture Topic</th>
                    <th>Total Points</th>
                    <th>Check out the Details</th>
                </tr>

                    {data.map((val, key) => {
                    return (  
                    
                        <React.Fragment>
                        
                        <tr key={key}>
                            
                            <td>{val[0].datePosted}</td>
                            <td>{val[0].lectureTopic}</td>
                            <td>{val[0].totalPoints}</td>  
                            <td>
                                <a href="http://localhost:3001/student/gradebook/course/lecture/1">Link to lecture 1</a>
                            </td> 
                        </tr> 
                        </React.Fragment>
                    )
                    })}
                </tbody>
            </table>
            
            <table>  
                <tbody>  
                <tr>
                    <td colSpan="4" id="student-gradebook-grade-table-headline">Math: 400 Winter, 2022</td>
                </tr> 
                <tr>
                    <th>Date Posted</th>
                    <th>Lecture Topic</th>
                    <th>Total Points</th>
                    <th>Check out the Details</th>
                </tr>

                    {data.map((val, key) => {
                    return (  
                    
                        <React.Fragment>
                        
                        <tr key={key}>
                            
                            <td>{val[0].datePosted}</td>
                            <td>{val[0].lectureTopic}</td>
                            <td>{val[0].totalPoints}</td>  
                            <td>
                                
                            </td> 
                        </tr> 
                        </React.Fragment>
                    )
                    })}
                </tbody>
            </table> */}

        </div>
       </>
        );
}

export default StudentGradeBook;