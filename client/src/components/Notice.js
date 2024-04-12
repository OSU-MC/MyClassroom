import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faBell, faCheck } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/notice.css'

function Notice(props) {
    return(
     <div className="noticeWrapper">
        <div className="noticeContainer">
            <div className="noticeSymbol">
                <FontAwesomeIcon icon={props.status == "error" ? faCircleExclamation :( props.status == "success" ? faCheck : faBell )} />
            </div>
            <div className="noticeMessage">{props.message}</div>
        </div>
    </div>
    )
    
}

export default Notice