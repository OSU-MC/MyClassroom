import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import {COLUMNS} from '../components/StudentGradebookColumns'
// import './basicTable.css'
import { Link } from 'react-router-dom'

// function Td({ children, to }) {
//     // Conditionally wrapping content into a link
//     const ContentTag = to ? Link : 'div';
  
//     return (
//       <td>
//         <ContentTag to={to}>{children}</ContentTag>
//       </td>
//     );
// }
//function BasicTable(datas){
    const BasicTable = (datas, COLUMNS,tableTitle) => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo (() => datas, [])//studentGradeBookNewData, [])
    const tableInstance = useTable({
        columns: COLUMNS,
        data: datas//studentGradeBookNewData
    })

    
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    
    } = tableInstance
    return (

        <>

        {/* <div id="student-gradebook-info">
            <h2 id="student-name">Gradebook for Linshengyi Sun</h2>    
        </div> */}

        <div>  
        <table {...getTableProps()}>

            <tr>
                <td colSpan="4" id="student-gradebook-grade-table-headline">{tableTitle}</td>
            </tr> 
            {/* <thread> */}
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            {/* </thread> */}
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                               {row.cells.map((cell) => {

                                    console.log("cell is: ", cell.value)
                                    if(cell.column.Header == "URL"){
                                        return (
                                            <td {...cell.getCellProps}>
                                                <a href={cell.value}>
                                                    Enter
                                                </a>
                                            </td>
                                        )
                                    }
                                    else{
                                        return <td {...cell.getCellProps}>{cell.render('Cell')}</td>
                                    }
                               })}
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
        </div>
        </>
    )
}
//}

export default BasicTable;