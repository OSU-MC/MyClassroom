import React from 'react'
import studentLectureGradeData from "./data/studentLectureGrade.json"
import BasicTable from"./BasicTable"
import {COLUMNS_studentLectureGrade}  from '../components/StudentLectureGradeColumns'


const title = "Lecture 1: Some Topic"
function StudentGradeforSingleLecture() {
    return (
        <>
        <div className="SLG-gradePoints-parent">
            <div className="single-lecture-grade-info">
                <h2 id="student-name">Grade for Linshengyi Sun </h2>
                <h4 id="class-name">Elementary Math: 001 Winter, 2022</h4>
                <h5 id="class-code">Class Code: 88888888</h5>
                <h5 id="professor-name">Professor Name: Abc Defg</h5>
            </div>
            <div className="single-lecture-grade-points-info">
                <h5 id="total-points">Total points:  </h5>
                <h5 id="participation">Participation:  </h5>
                <h5 id="correctness">Correctness:  </h5>     
            </div>
        </div>
        

        <div className="single-lecture-grade-table">
        {BasicTable(studentLectureGradeData,COLUMNS_studentLectureGrade,title)}
        </div>
        
        {/* <div className="single-lecture-grade-table">
            <h4>Lecture 1: Some Topic</h4>
            <table>
                <tr>
                <th>Date Posted</th>
                <th>Question</th>
                <th>You Answered</th>
                <th>Correct Answer</th>
                </tr>
                {studentLectureGradeData.map((val, key) => {
                return (
                    <tr key={key}>
                    <td>{val.datePosted}</td>
                    <td>{val.ques}</td>
                    <td>{val.ans}</td>
                    <td>{val.correctAns}</td>
                    </tr>
                )
                })}
            </table>
        </div> */}
       </>
        );
}



export default StudentGradeforSingleLecture;