import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faBell, faCheck } from '@fortawesome/free-solid-svg-icons'

const noticeRed = '#ea5b6a'
const noticeBlue = '#7bb0d0'
const noticeGreen = '#77dd77'

function Notice(props) {

    const NoticeContainer = styled.div`
        display: flex;
        flex-direction: row;
        background-color: ${props.status == "error" ? noticeRed : ( props.status == "success" ? noticeGreen : noticeBlue)};
        padding: 10px;
        border-radius: 20px;
        justify-content: center;
        margin: 10px;
        max-width: 450px;
    `

    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        <NoticeContainer>
            <div style={{
                marginRight: '10px'
            }}>
                <FontAwesomeIcon icon={props.status == "error" ? faCircleExclamation :( props.status == "success" ? faCheck : faBell )} />
            </div>
            <div style={{
                fontWeight: 600
            }}> {props.message}
            </div>
        </NoticeContainer>
    </div>)
    
}

export default Notice;