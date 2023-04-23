import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'
import { Outlet, useLocation } from 'react-router-dom';
import useCourse from '../../hooks/useCourse'
import styled from '@emotion/styled/macro';

function Navigation(props) {
    const location = useLocation()
    const courseRegex = /\/\d+/
    const inCourse = location.pathname.match(courseRegex)

    return <>
        <TopNavbar loggedIn={props.loggedIn}/>
        <div className="mainBody">
            { inCourse && <SideNavbar/> }
            <Outlet/>
        </div>
    </> 
}

export default Navigation