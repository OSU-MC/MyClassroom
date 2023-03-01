import React from 'react';
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './components.css'


//Sidebar creation
function Sidebar(props) {
    let widthSB = "15vm";
    let displaySB = "block";
    if(props.hideSideBar){
        widthSB = "0";     
        displaySB = "none";
    }

    return (
        <div className='sidebarBody' style={{width:widthSB}}>
            <ul className='sidebarList'style={{display:displaySB}}>
                {props.data.map((val, key) => {
                   return(
                        <Link className='sidebarItem' key={key} to={val.link}>
                            <div id='sidebarIcon'>{val.icon}</div>
                            <div id='sidebarTitle'>{val.title}</div>
                        </Link> 
                        );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;