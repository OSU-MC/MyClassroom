import { Link, useParams } from 'react-router-dom';
import useEnrollments from '../hooks/useEnrollments';
import Notice from '../components/Notice'
import { TailSpin } from  'react-loader-spinner'
import StudentListItem from '../components/StudentListItem';

function Enrollments(props) {
    const { courseId, sectionId } = useParams()
    const [enrollments, message, error, loading] = useEnrollments()

    return(
        <>
        { message ? <Notice error={error ? "error" : ""} message={message}/> : (!enrollments) ? <Notice message={"No students are enrolled in this course"}/> : <></>}
        <ul className="allstudents">
            { (loading) ? <TailSpin visible={true}/> : enrollments[courseId].enrollments.map((enrollment) => {
                return enrollment.sectionId == sectionId ? <StudentListItem key={enrollment.id} student={enrollment}/> : <div key={enrollment.id}></div>
            })}
        </ul>
        </>
    )
}

export default Enrollments;