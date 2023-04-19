import styled from '@emotion/styled/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { borderRadius, fontFamily, fontStyle, minHeight } from '@mui/system';

function Home() {
    return <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,700;0,800;1,700;1,800&display=swap" rel="stylesheet"/>

    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap" rel="stylesheet"/>

        <VerticalContainer style={title}>
            <Title>MyClassroom</Title>
            <Subtitle1>Senior Capstone Project</Subtitle1>
            <Subtitle2>An Open Source Classroom Polling  Web Application</Subtitle2>
        </VerticalContainer>
        <VerticalContainer>
            <div style={arrowdown}>
                <div className='arrowdown'/>
            </div>
        </VerticalContainer>
        <VerticalContainer className='test' style={about}>
            <TextBox>
                { productSummary }
            </TextBox>
            <TextBox>
                { productUse }
            </TextBox>
            <div style={usebuttoncontainer}>
                <Button style={usebutton}>Use Polling Software</Button>
            </div>
        </VerticalContainer>
        <VerticalContainer style={githublinks}>
            <Section1>GitHub Repo</Section1>
            <HorizontalContainer>
                <Link href="https://github.com/CS461PollingApplication/my-classroom-fe">
                    Project Frontend: <FontAwesomeIcon icon={faLink} />
                </Link>
                <Link href="https://github.com/CS461PollingApplication/my-classroom-backend">
                    Project Backend: <FontAwesomeIcon icon={faLink} />
                </Link>
            </HorizontalContainer>
        </VerticalContainer>
        <VerticalContainer style={contacts}>
            <Section2>Project Contacts</Section2>
            <HorizontalContainer>
                <Contact>Matthew Hotchkiss: mphotchkiss01@gmail.com</Contact>
                <Contact>Elayne Trimble: trimblma@oregonstate.edu</Contact>
                <Contact>Gaven Robertson: robergav@oregonstate.edu</Contact>
                <Contact>Sanjay Ramanathan: ramanasa@oregonstate.edu</Contact>
                <Contact>Mitchell Stewart: stewamit@oregonstate.edu</Contact>
            </HorizontalContainer>
        </VerticalContainer>
        
    </>
}

const title = {
    backgroundColor: "#70a84a",
    color: "white",
    paddingTop: "15%",
    paddingBottom: "5%"
}
const usebuttoncontainer = {
    paddingTop: "2.5%",
    width: "35%",
    paddingBottom: "20px"
}
const usebutton = {
    backgroundColor: "#72767d",
    border: "none",
    width: "100%",
    borderRadius: "15px",
    paddingBottom: "4%",
    paddingTop: "4%",
   
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "calc(7px + 1.6vw)",
    fontWeight: "300",
}
const arrowdown ={
    backgroundColor: "#70a84a",
    minWidth: "40px",
    minHeight: "40px",
    paddingBottom: "10px",
    paddingRight: "30px",
    paddingLeft: "30px",
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px"
}
const about = {
    textAlign: "center",
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: "20px",
    marginBottom: "20px"
}
const githublinks = {
    backgroundColor: "#70a84a",
    color: "white",
    paddingTop: "2%",
    paddingBottom: "2%"
}
const contacts = {
    paddingTop: "2%"
}

const VerticalContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Title = styled.h1`
    font-family: 'Open Sans', sans-serif;
    font-weight: 800; 
    font-size: calc(14px + 10vw);
`

const Subtitle1 = styled.h4`
    font-family: 'Open Sans', sans-serif;
    padding-top: 2%;
    font-weight: 600; 
    font-size: calc(10px + 4vw);
`

const Subtitle2 = styled.h4`
    padding-top: 10px;
    font-family: 'Bitter', serif;
    font-size: calc(8px + 1.8vw);
`

const Section1 = styled.h3`
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    font-size: calc(10px + 3vw);
`
const Section2 = styled.h3`
    font-family: 'Open Sans', sans-serif;
    font-weight: 500;
    font-size: calc(10px + 1.8vw);
`

const TextBox = styled.div`
    display: flex;
    padding: 20px;
    font-family: 'Open Sans', sans-serif;
    font-size: calc(7px + 1.2vw);
    font-weight: 300;
`

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    margin: 10px;
    font-family: 'Open Sans', sans-serif;
    font-size: calc(7px + 1.2vw);
`

const Contact = styled.div`
    padding: 10px;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: calc(5px + .5vw);
`

const productSummary = "The Classroom Polling: Oregon State University project is an instance of the Open Source Polling Software developed as part of Oregon State University's senior capstone project."
const productUse = "The project's goal is to provide an affordable and high quality polling system for teachers to utilize in the classroom. The system provides all the features of a paid service without any of the trailing zeroes. Teachers are able to create courses and sections, to which they invite their students. Teachers create lectures and questions, which they release at their own pace for students to interact with. Teachers and students alike can look back on the lectures to assess performance on the lecture's questions and overall lecture performance."


export default Home
