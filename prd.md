# Product Requirements Document (PRD)
## Problem Description
#### Student’s Perspective:
The current classroom experience is hampered by outdated polling software that incurs an additional non-tuition cost. Lower cost software often lacks the features and responsiveness needed for today’s diverse range of devices and classes, hindering real-time engagement. Moreover, there’s an absence of innovative tools that could foster collaborative learning, such as intelligent grouping based on responses.

#### Instructor’s Perspective:
Educators face challenges in gauging real-time understanding and adjusting lectures on-the-fly. The limited question formats offered by existing tools restrict the depth of understanding they can assess. Additionally, they lack mechanisms to provide instant feedback to students or to facilitate peer learning effectively within the classroom.

#### Institutional Perspective:
Schools and universities are constantly looking to integrate technology that enhances learning outcomes and the overall educational experience. The current polling systems not only add a financial burden on the students but also don’t often integrate seamlessly with popular Learning Management Systems. Institutions require a comprehensive solution that’s both cost-effective and versatile in its capabilities.

### Scope
The core focus for the Open-Source Classroom Polling Software will be to develop a robust and responsive web-based polling system that integrates seamlessly with the Canvas/LMS interface. The primary functionalities will include student and teacher login, tracking of grades, class questions, and live polling on various devices such as desktop and mobile.

Stretch goals encompass the integration of an intelligent grouping algorithm that pairs students based on their polling responses, an interface for instructors to provide real-time feedback, and the development of in-class social collaboration features to facilitate just-in-time learning interventions.

Initially, our scope will be concentrated on fulfilling the needs of certain OSU classrooms to ensure the software addresses the specific requirements and challenges faced by the institution. As the project progresses, we can consider broadening its reach to cater to classrooms of all institutions.

### Use Cases
- A student logs in, participates in a live lecture poll, and views aggregated class responses.
- An instructor logs in, creates a poll, pushes it live, and reviews immediate results.
- Based on poll answers, the system suggests student groupings for collaborative tasks.
- Students’ polling participation and responses are automatically recorded in the Canvas grade book.

## Purpose and Vision (Background)
Our primary purpose is to revolutionize the educational experience by providing an easily accessible, classroom polling solution. At the heart of our initiative is the belief that interactive learning fosters engagement, comprehension, and retention. The existing polling solutions pose a financial burden on students and are limited in their capabilities. Our vision is to eliminate these barriers, thereby democratizing access to top-tier learning tools and empowering educators with a platform that’s adaptable, and cost-effective.

## Stakeholders
### Project Partner
- Updated multiple times throughout the term on the status of the project.
- Can decide what parts of the project to move forward with or push back.
- Major and medium design decisions should go through them.

### Project TA
- Needs to be updated weekly with relevant information as to the status of the project.
- Does not make decisions relating to the design or architecture of the project.

### Capstone Instructors
- Do not affect the decision-making process and are not informed on changes unless all other means have failed.

## Preliminary Context
### Assumptions
- Most instructors and students are familiar with using online platforms for educational purposes, and will easily adapt to a new polling system.
- By using web development tools, the site will need little adjustment to fit different browsers and devices.
- Given that the software aims to have a Canvas/LMS interface, we’re assuming that integration with such platforms is feasible and that these platforms have APIs or integration points available.
- The open-source libraries and frameworks chosen for development are stable, well-documented, and have an active community of developers contributing to them.
- Our contributions to the project can be developed and tested within a single academic year, aligning with the duration of the capstone project.
- Given the educational setting, we’re assuming that any data collected will adhere to educational data privacy regulations and that there are no significant barriers in implementing necessary compliance measures.

### Constraints
- While aiming to integrate with Canvas or other LMS systems, there may be limitations in their APIs or integration points, restricting some desired functionalities.
- Given the academic nature of the project, there’s a fixed timeframe to develop, test, and implement the software.
- Due to the educational setting, the software may have to comply with data privacy regulations (like FERPA) which might constrain how student data is collected, stored, and used.
- Due to the education setting and the fact that users pay money to attend classes, the system needs to be failure safe
- Ensuring that the platform can handle multiple classrooms polling simultaneously without latency issues is crucial.
- Leveraging open-source tools or libraries might expose the software to vulnerabilities if not regularly updated or checked.
- Ensuring that the software works seamlessly across various devices

### Dependencies
- One of the major dependencies is the successful integration with Canvas or other LMS platforms. The development of certain features is dependent on accessing LMS data and features through their API.
- The project may rely on certain open-source libraries or frameworks for web development, user authentication, or live polling functionalities. The availability, updates, and compatibility of these libraries can affect development progress.
- Integration or development of a user authentication and management system is crucial. This might depend on the decision to build a new system or integrate it with existing university systems such as SSO.
- Before deployment, the software needs to be tested in realistic classroom scenarios. This could depend on coordinating with instructors and securing time in actual classes.

## Market Assessment and Competition Analysis
Given the current landscape, there’s an opportunity for an open-source classroom polling software that integrates seamlessly with LMS platforms. While commercial options offer robust features, they may not offer the customizability and integration capabilities of an open-source solution. The challenge will be in matching the user experience and feature set of established tools.

#### Kahoot!
An online game-based learning platform used as educational technology in schools and other educational institutions. Allows for polling and quiz creation.
- Pros: Engaging, easy-to-use, widespread recognition
- Cons: Not integrated with LMS, lacks collaborative features, not open-source

#### Poll Everywhere
A real-time polling tool that can be used in the classroom for feedback and assessment.
- Pros: Wide variety of question types, real-time feedback, integrates with Canvas and PowerPoint.
- Cons: Limited responses on the free plan, not open-source.

#### Mentimeter
Interactive presentation software that allows real-time interaction between presenters and their audiences.
- Pros: Engaging visuals, variety of question types.
- Cons: Limited questions on free plans, not specifically tailored for classrooms, not open-source

#### Canvas Polls
Polls for Canvas provide a simple way for instructors to create and administer polls in real-time.
- Pros: Integrated with Canvas LMS, easy to use, open-source.
- Cons: Limited to Canvas users, not as feature-rich as standalone tools.

#### Google Forms
A free, web-based tool from Google to collect data from users. Can be used for surveys, quizzes, and polls.
- Pros: Integrated with Google Drive, easy to use, versatile.
- Cons: Lacks certain advanced features, not integrated with LMS platforms, responses can sometimes be hard to manage with large classes.

### SWOT Analysis
#### Strengths
Open-source, potentially free or low cost, can be tailored specifically to academic needs.

#### Weaknesses
Dependent on the community for updates, may lack features of commercial products.

#### Opportunities
Fill a gap in the market for customizable, open-source classroom polling software. Potential to integrate deeply with LMS platforms.

#### Threats
Existing commercial options have brand recognition and established user bases.

## Target Demographics (User Persona)
### 45-year-old University Professor
Professor Alex:

"In the corridors of academia, beneath the weight of knowledge and history, there lies a quest for understanding and enlightenment. To teach is to touch a life forever, and in that eternal dance of ideas and discovery, one finds Professor Alex." –ChatGPT

### Bio
- Has been teaching computer science at the university for over 20 years.
- Holds a Ph.D. in Artificial Intelligence and has published multiple research papers in top-tier journals.
- Passionate about mentoring the next generation of tech innovators.
- Organizes annual tech symposiums at the university, inviting industry leaders and alumni.

### Core Needs
- Enhanced Real-Time Interactive Tools for Teaching:
- Seamless Integration with Existing Educational Platforms
- Customizable Polling Options to Suit Diverse Teaching Methods

### Behaviors
- Spends early mornings reviewing student projects and research work.
- Regularly conducts open office hours to address student queries.
- Attends international conferences and workshops to present research findings.
- Encourages students to take on real-world projects and engage in hands-on learning.

## Requirements
### User Stories and Features (Functional Requirements)
User Story | Feature | Priority | GitHub Issue | Dependencies
---|---|---|---|---
As a professor, I want to create a poll so that I can gather real-time feedback from my students during class. | Create Poll Functionality | Must Have | #23 | N/A
As a student, I want to vote in a poll so that I can provide my opinion or answer. | Poll Voting Interface | Must Have | TBD | N/A
As a professor, I want to view poll results so that I can adapt my lecture or gauge understanding. | Roll Results Dashboard | Must Have | TBD | N/A
As a student, I want to review past polls so that I can revisit material and discussions. | History of Participated Pols | Should Have | TBD | N/A
As a professor, I want to archive old polls so that I can keep my poll dashboard organized. | Poll Archiving | Could Have | TBD | N/A
As a professor, I want polling software built into a learning management system so that I can track student info in 1 place. | LMS integration | Should Have | TBD | Grade Database
As a developer I want to understand the working or broken aspects of the API so that we know which aspects work moving forward. | Stable API | Must have | #18 | N/A
As a developer I want to make sure that both project is free of glaring security issues so that it’s safe to publish on the internet. | Secure Project | Must have | TBD & #52 | N/A

### Non-Functional Requirements
- The system should handle up to 500 students voting simultaneously without latency.
- Response time for creating or participating in polls should be less than 500 milliseconds.
- The software must support a 99.9% uptime, except during scheduled maintenance.
- All data between the client and server should be encrypted using SSL/TLS.
- The system should be compliant with FERPA regulations.
- Accessibility is important; the product should be compliant with WCAG guidelines.
- The interface should be intuitive and user-friendly, minimizing the learning curve for both professors and students.

### Data Requirements
- **Student Data**: Name, Student ID, Courses Enrolled
- **Professor Data**: Name, Courses Taught, Past Polls
- **Poll Data**: Poll Questions, Options, Timestamps, Associated Course, Votes
- **User Data**: Student email addresses, encrypted passwords, password reset authentication.

### Integration Requirements
- **Learning Management System API**: To fetch and validate student course enrollments and professor course assignments.
- **Database Management System**: For storing polls, user data, and voting results.

### User Interaction and Design
Need additional information from Project Partners before exploring design.

#### Expected general design goals:
- Simplicity: Minimal steps to create or participate in a poll.
- Clarity: Clearly labeled buttons and prompts.
- Responsiveness: Quick feedback and loading times.
- Inclusiveness: Equally usable by differently abled users.

## Milestones and Timeline
Over the next three terms we have set out 3 primary milestones. In the first term, we plan to spend our time getting up to speed with the current project progress, and begin implementing improvements for future development. Term two will be spent developing features for later integration, this includes live polling, dashboard views, UI improvements and more. Finally in term three, we will be integrating and testing these features to make sure they are stable enough for a production environment. During term three, an alpha test of the platform may be tested in a real classroom environment.

### Milestones:
1. Modernize Repository and Prepare for Development
2. Implement Individual Features for Future Integration
3. In Real Class Alpha Test

### Timeline:
![image](https://github.com/CS-461-nilsstreedain/classroom-polling/assets/25465133/1667f84f-d3d2-4516-bd86-68d6a1108dbc)

## Goals and Success Metrics
Goal | Metric | Baseline | Target | Tracking Method
---|---|---|---|---
Rapid Poll Response | Average Poll Response Time | Not applicable (Not fully implemented) | 2 seconds | Performance testing
Cost-Effectiveness for Students | Student expenditure on polling tools | $30-100 per semester | $0 | Comparing to alternative polling solutions
Platform Reliability | Requests are able to be sent and received to the platform the vast majority of the time. | Approximately 95% SLA reliability. | Greater than 99% SLA uptime. | Performance tracking of failed requests sent
User Satisfaction | The number of people who use the platform self-report satisfaction rating. | Not applicable (Not yet deployed) | Greater than 90% satisfaction rating. | Survey after real world testing
Accessibility Compliance | WCAG Compliance Level | Does not meet level A | Level AA | WCAG 2.0 Guidelines

## Out of Scope
### Limited Target Audience
The development and features of the software will be exclusively tailored for classroom environments, specifically at OSU, and may not include functionalities aimed at external entities including businesses or differently structured academic organizations.

### Non-commercial Nature
The project is developed as an open-source educational tool, with no plans for commercialization or profit-driven features such as premium tiers or advertisements. Any instance may need to be self-deployed by an institution.

### Basic Analytics Functionality
While the software will provide essential feedback and polling analysis, it will not include advanced analytic capabilities, such as predictive modeling for course outcomes or complex data visualization.
### External LMS Integrations
The software will initially be designed to integrate with the Canvas LMS and will not support integration with other learning management systems. In its current scope.
### Scalability Limitations
The backend infrastructure is planned to support a standard classroom size efficiently, but it not designed for ultra-high concurrency, such as handling thousands of simultaneous users in a single instance without horizontal scaling.
