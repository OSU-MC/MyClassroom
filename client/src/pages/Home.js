import styled from '@emotion/styled/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { borderRadius, fontFamily, fontStyle, minHeight } from '@mui/system';

function Home() {
    return <div>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,700;0,800;1,700;1,800&display=swap" rel="stylesheet"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap" rel="stylesheet"/>

        <VerticalContainer style={title}>
            <Title>MyClassroom</Title>
            <Subtitle1>Senior Software Engineering Project</Subtitle1>
            <Subtitle2>An Open Source Classroom Polling Web Application</Subtitle2>
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
                <Button style={usebutton} href="/create">Sign Up!</Button>
            </div>
        </VerticalContainer>
        <VerticalContainer style={githublinks}>
            <Section1>GitHub Repo</Section1>
            <HorizontalContainer>
                <Link href="https://github.com/CS-461-nilsstreedain/classroom-polling">
                    CS-461-nilsstreedain/classroom-polling: <FontAwesomeIcon icon={faLink} />
                </Link>
            </HorizontalContainer>
        </VerticalContainer>
        <VerticalContainer style={contacts}>
            <Section1>Project Alumni</Section1>
            <Section2>2023-2024</Section2>
            <HorizontalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Nils Streedain</Contact>
                    <Contact>streedan@oregonstate.edu</Contact>
                </VerticalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Justin Fernbaugh</Contact>
                    <Contact>fernbauj@oregonstate.edu</Contact>
                </VerticalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Karin Ocheretny</Contact>
                    <Contact>ocheretk@oregonstate.edu</Contact>
                </VerticalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Elijah Durbin</Contact>
                    <Contact>durbine@oregonstate.edu</Contact>
                </VerticalContainer>
    
            </HorizontalContainer>
            <Section2>2022-2023</Section2>
            <HorizontalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Matthew Hotchkiss</Contact>
                    <Contact>hotchkma@oregonstate.edu</Contact>
                </VerticalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Elayne Trimble</Contact>
                    <Contact>trimblma@oregonstate.edu</Contact>
                </VerticalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Mitchell Stewart</Contact>
                    <Contact>stewamit@oregonstate.edu</Contact>
                </VerticalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Gaven Robertson</Contact>
                    <Contact>robergav@oregonstate.edu</Contact>
                </VerticalContainer>
                <VerticalContainer style={contactBlock}>
                    <Contact>Sanjay Ramanathan</Contact>
                    <Contact>ramanasa@oregonstate.edu</Contact>
                </VerticalContainer>
            </HorizontalContainer>
        </VerticalContainer>
    </div>
}

const title = {
    backgroundColor: "#70a84a",
    color: "white",
paddingTop: "100px",
    paddingBottom: "25px"
}

const usebuttoncontainer = {
    padding: "20px 0",
    width: "160px"
}

const usebutton = {
    backgroundColor: "#72767d",
    border: "none",
    borderRadius: "15px",
    padding: "10px",
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
    margin: "20px 50px"
}

const githublinks = {
    backgroundColor: "#70a84a",
    color: "white",
    padding: "20px 0"
}

const contacts = {
    padding: "20px"
}

const contactBlock = {
    margin: "0 10px"
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
    padding-top: 5px;
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
    padding-top: 10px;
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
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: calc(5px + .5vw);
`

const productSummary = "MyClassroom is an instance of the Open Source Polling Software developed under Oregon State University's Senior Software Engineering program."
const productUse = "The project's goal is to provide an affordable and high quality polling system for teachers to utilize in the classroom. The system provides all the features of a paid service without any of the trailing zeroes. Teachers are able to create courses and sections, to which they invite their students. Teachers create lectures and questions, which they release at their own pace for students to interact with. Teachers and students alike can look back on the lectures to assess performance on the lecture's questions and overall lecture performance."

export default Home
