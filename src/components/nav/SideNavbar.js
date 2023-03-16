import React from 'react';
import { NavLink } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './components.css'
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useSelector } from 'react-redux'
import { getCourse } from '../../redux/selectors'

//Sidebar creation
function SideNavbar(props) {

    const course = useSelector(getCourse)
    const location = useLocation()
    const inCourse = location.pathname.search(/courses\/\d+/) > -1 // if course is in the current pathname
    
    const instructorSidebarData = [
        {
            title: "Questions",
            icon: <QuestionMarkIcon />,
            link: `courses/${course.id}/questions`
        },
        {
            title: "Students",
            icon: <SchoolIcon />,
            link: `courses/${course.id}/students`
        },
        {
            title: "Lectures",
            icon: <MenuBookIcon />,
            link: `courses/${course.id}/lectures`
        }
    ]

    // TODO: check the role of the user in this course and only render if teacher for now
    return <>
        { inCourse && <div className='sidebarBody'>
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
        </div> }
    </>
}

export default SideNavbar;