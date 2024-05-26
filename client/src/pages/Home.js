import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { borderRadius, fontFamily, fontStyle, minHeight } from '@mui/system'
import styles from "../styles/home.css"

function Home() {
    return(
       <div id="home">
           <div class="section">
               <p class="homeHeader">Welcome to MyClassroom</p>
               <p class="homeText">Open-Source Classroom Polling Software</p>
           </div>

           <div class="infoContainer">
               <div class="infoConnector"></div>
               <div class="infoBox leftBox">
                   <img src="classroom.png"></img>
                   <p class="infoText">Create courses and manage lectures easily.</p>
               </div>
               <div class="infoBox rightBox">
                   <img src="goal.png"></img>
                   <p class="infoText">Track student progress and manage grades.</p>
               </div>
               <div class="infoBox leftBox">
                   <img src="lms.png"></img>
                   <p class="infoText">Seamless integration with educational platforms.</p>
               </div>
               <div class="infoBox rightBox">
                   <img src="graph.png"></img>
                   <p class="infoText">Boost student engagement with interactive polls.</p>
               </div>
               <div class="infoBox leftBox">
                   <img src="school.png"></img>
                   <p class="infoText">Highly customizable and free to use.</p>
               </div>
           </div>
       </div>
    )
}

export default Home
