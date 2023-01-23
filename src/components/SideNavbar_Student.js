import React from "react";
/*import "./sideNavbar.css"*/
import sideBarButton from "./photos/sideBarButton.jpg"


//SideNavBar for the student view
export default function SideNavbar_Teacher() {
    function openFunction() {
        document.getElementById("menu").style.width="300px"
    }
    function closeFunction() {
        document.getElementById("menu").style.width="0px"
    }
    return (
        <>
            <body>   
            
                <div id="mainbox" onClick={openFunction} class ="">x</div>
                <div id = "menu" class="sidemenu">
                    <a href ="#">Courses</a>
                    <a href ="#">Students</a>
                    <a href ="#">Gradebook</a>
                    <a href ="#">Calender</a>
                    <a href ="#">Questions</a>
                    <a href ="#" onClick={closeFunction} class ="closebtn" >x</a>
                </div>     
            </body>
        </>
    )
}
