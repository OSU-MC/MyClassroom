import React from 'react';
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './components.css'



function Sidebar(props) {
    return (
        <div className='sidebarBody'>
            <ul className='sidebarList'>
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