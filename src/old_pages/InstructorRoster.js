import React, { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table'


const controller = new AbortController();


function InstructorRoster(props) {


    const [ students, setStudents] = useState()

    useEffect( () => {
            async function populateStudents(){
                let studentBody={};
                try{
                    const response = await fetch(
                        "http://localhost:3001/api/student/",
                        {signal: controller.signal}
    
                    );
                    studentBody = await response.json();
                } catch (e) {
                    if (e instanceof DOMException) {
                      console.log("== HTTP request cancelled")
                    } else {
                      throw e;
                    }
                  }
                  console.log(studentBody)
                setStudents(studentBody)
            }
            populateStudents()

    
        }, [])



        console.log(students)
        students?.map( test => console.log(test))
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Roster Number</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.map( student => {
                        return(<tr>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.user}</td>
                        </tr>)
                        
                    })}
                    {/* <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    </tr> */}
                </tbody>
                </Table>
        </div>
    );
}

export default InstructorRoster;