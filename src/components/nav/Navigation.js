import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'
import { Outlet } from 'react-router-dom';
import useCourse from '../../hooks/useCourse'
import styled from '@emotion/styled/macro';

function Navigation(props) {
    const [ course, role ] = useCourse()

    const MainBody = styled.div`
        display: flex;
    `

    return <>
        <TopNavbar/>
        <MainBody>
            { props.inCourse && role == 'teacher' && <SideNavbar course={course} /> }
            <Outlet/>
        </MainBody>
    </> 
}

export default Navigation