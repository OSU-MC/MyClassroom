import React from 'react';
import { NavLink } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './components.css'
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import useCourse from '../../hooks/useCourse'

//Sidebar creation
function SideNavbar(props) {
    const [ course, role, message, error, loading ] = useCourse()

    const instructorSidebarData = [
        {
            title: "Questions",
            icon: <QuestionMarkIcon />,
            link: `${course.id}/questions`
        },
        {
            title: "Students",
            icon: <SchoolIcon />,
            link: `${course.id}/roster`
        },
        {
            title: "Lectures",
            icon: <MenuBookIcon />,
            link: `${course.id}/lectures`
        },
        {
            title: "Sections",
            icon: <AutoAwesomeMotionIcon />,
            link: `${course.id}/sections`
        }
    ]

    // TODO: check the role of the user in this course and only render if teacher for now
    return <>{ role == 'teacher' ? <div className='sidebarBody'>
                <ul className='sidebarList'>
                    {instructorSidebarData.map((val, key) => {
                    return(
                            <Link className='sidebarItem' key={key} to={val.link}>
                                <div id='sidebarIcon'>{val.icon}</div>
                                <div id='sidebarTitle'>{val.title}</div>
                            </Link> 
                            );
                    })}
                </ul>
            </div>
            : <></>}</>
}

export default SideNavbar;