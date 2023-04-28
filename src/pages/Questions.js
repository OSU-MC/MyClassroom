import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuestionListItem from '../components/questions/QuestionListItem'
import useQuestions from '../hooks/useQuestions'
import Notice from '../components/Notice'
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner'

function Questions(props) {
    
    const source = 'Course'
    const selecting = true
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ inputQuery, setInputQuery ] = useState(searchParams.get("search") || "")
    const [ page, setPage ] = useState(searchParams.get("page") || 0)
    const [ questions, nextLink, prevLink, message, error, loading ] = useQuestions()
    const { courseId } = useParams()
    
    const nextPage = (() => {
        setPage(page + 1)
        setSearchParams({ search: inputQuery, page: page })
    })

    const prevPage = (() => {
        setPage(page - 1)
        setSearchParams({ search: inputQuery, page: page })
    })

    return(
        <div className="questionsView">
            <div className="header">
                <button className="btn btn-secondary">&lt;&lt; Back to {source}</button>
                { selecting && <button className="btn btn-primary">Submit</button>}
            </div>
            <div className="searchBarContainer">
                <form className="searchForm" onSubmit={ e => {
                    e.preventDefault()
                    setSearchParams({ search: inputQuery })
                }}>
                    <input className="searchBar" value={inputQuery} placeholder= "Question Stem" onChange={e => setInputQuery(e.target.value)} />
                    <button className="searchButton btn btn-primary" type="submit">Search</button>
                </form>
                { message != "" && <Notice message={message} error={error} />}
            </div>
            <div className="questionsContainer">
                { loading ? <TailSpin visible={true} /> : !error ? (questions[courseId].length > 0) ? <div className="questionsList">
                    { questions[courseId].map((question) => {
                        return <QuestionListItem key={question.id} question={question} selectable={selecting}/>
                    }) }
                </div> : <Notice message={"No questions exist for this course"} error={false} /> : <></>}
            </div>
            <div className="footer">
                { nextLink && <button className="btn btn-primary" onClick={(() => nextPage())}>Prev</button> }
                { prevLink && <button className="btn btn-primary" onClick={(() => prevPage())}>Next</button> }
            </div>
        </div>
    )
}

export default Questions;