import styled from '@emotion/styled/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

function Home() {
    return <>
        <VerticalContainer>
            <Title>Classroom Polling</Title>
            <Subtitle>Oregon State University</Subtitle>
        </VerticalContainer>
        <VerticalContainer>
            <TextBox>
                { productSummary }
            </TextBox>
            <TextBox>
                { productUse }
            </TextBox>
        </VerticalContainer>
        <VerticalContainer>
            <Section>Project Contacts</Section>
            <HorizontalContainer>
                <Contact>Matthew Hotchkiss: mphotchkiss01@gmail.com</Contact>
                <Contact>Elayne Trimble: </Contact>
                <Contact>Gaven Robertson: </Contact>
                <Contact>Sanjay Ramanathan: </Contact>
                <Contact>Mitchell Stewart: </Contact>
            </HorizontalContainer>
        </VerticalContainer>
        <VerticalContainer>
            <Section>GitHub</Section>
            <HorizontalContainer>
                <Link href="https://github.com/CS461PollingApplication/my-classroom-fe">
                    Project Frontend: <FontAwesomeIcon icon={faLink} />
                </Link>
                <Link href="https://github.com/CS461PollingApplication/my-classroom-backend">
                    Project Backend: <FontAwesomeIcon icon={faLink} />
                </Link>
            </HorizontalContainer>
        </VerticalContainer>
        
    </>
}

const VerticalContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 20px;
`

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Title = styled.h1`

`

const Subtitle = styled.h4`

`

const Section = styled.h3`
    text-decoration: underline;
`

const TextBox = styled.div`
    display: flex;
    padding: 20px;
`

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    margin: 10px;
`

const Contact = styled.div`
    padding: 10px;
    text-align: center;

`

const productSummary = "The Classroom Polling: Oregon State University project is an instance of the Open Source Polling Software developed as part of Oregon State University's senior capstone project."
const productUse = "The project's goal is to provide an affordable and high quality polling system for teachers to utilize in the classroom. The system provides all the features of a paid service without any of the trailing zeroes. Teachers are able to create courses and sections, to which they invite their students. Teachers create lectures and questions, which they release at their own pace for students to interact with. Teachers and students alike can look back on the lectures to assess performance on the lecture's questions and overall lecture performance."


export default Home