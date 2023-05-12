import { Outlet } from 'react-router-dom'

function Popup(props) {
    return <div className="popup-background">
        <div className="popup-container">
            <button className="btn negative-btn" onClick={(e) => {e.preventDefault(); props.close()}}>x</button>
            {props.children}
        </div>
    </div>
}

export default Popup