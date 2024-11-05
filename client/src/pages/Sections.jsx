import useSections from '../hooks/useSections'
import { useState } from 'react' 
import AddSection from '../components/AddSection'
import Popup from '../components/Popup'
import { useParams, Link } from 'react-router-dom'
import Notice from '../components/Notice'
import { TailSpin } from  'react-loader-spinner'
import SectionCard from '../components/SectionCard'
import { Button, Card } from "react-bootstrap"

function Sections() {
    const [ sections, message, error, loading ] = useSections()
    const [ showCreateModal, setShowCreateModal ] = useState(false)
    const { courseId } = useParams()

    const closeCreateModal = () => {
        setShowCreateModal(false)
    }

    const openCreateModal = () => {
        setShowCreateModal(true)
    }

    return(
        <div className="lectures">
            <div className='lectures-top-bar'>
                <p id="lectures-subtitle">Sections</p>
                { showCreateModal && <Popup close={closeCreateModal}><AddSection closeFunction={closeCreateModal}/></Popup> }
                <Button variany="primary" className="btn btn-add btn-secondary create-lecture-btn" onClick={(e) => {openCreateModal()}}>Create Section</Button>
                { message && <Notice error={error ? "error" : ""} message={message}/>}
            </div>
            <hr></hr>
            <div className="lectures-container">
                { loading ? <TailSpin visible={true}/> : sections[courseId] != null ? sections[courseId].map((section) => {
                                return <SectionCard key={section.id} section={section} />
                            }) : <Notice message={"You have not created any sections for this course yet"}/>
                }
            </div>
        </div>
        
    )
}

export default Sections