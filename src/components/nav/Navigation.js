import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'
import { Outlet } from 'react-router-dom';

function Navigation(props) {
    return <>
        <TopNavbar/>
        <SideNavbar/>
        <div className="mainPageBody">
            <Outlet/>
        </div>
    </>
}

export default Navigation