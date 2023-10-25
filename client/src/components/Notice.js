import styled from '@emotion/styled/macro';
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

    return <NoticeWrapper>
        <NoticeContainer>
            <NoticeSymbol>
                <FontAwesomeIcon icon={props.status == "error" ? faCircleExclamation :( props.status == "success" ? faCheck : faBell )} />
            </NoticeSymbol>
            <NoticeMessage>{props.message}</NoticeMessage>
        </NoticeContainer>
    </NoticeWrapper>
    
}

const NoticeWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const NoticeSymbol = styled.div`
    margin-right: 10px;
`

const NoticeMessage = styled.div`
    font-weight: 600;
`

export default Notice