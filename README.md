# Frontend: Open Source Classroom Polling Software (MyClassroom)

## Motivation

  The Open Source Classroom Polling Software, or My Classroom, was designed to solve a very specific problem: a lack of free, individually tailored, classroom polling tools for students and professors. The inception of this project was problems with current polling software used in Oregon State University's Intro Physics program. These courses use Learning Catalytics; a polling software from Pearson. The cost of this software is not included in the student's tuition, so students have to pay for it out of pocket. My Classroom provides students with an alternative classroom tool that is equal in functionality but at no additional cost to the student. 
  
  With My Classroom, instructors and students can participate in interactive question and answer sessions. Professors can create courses, create lectures for those courses, and add questions within those lectures that students can answer. Student responses are saved so that both the professor and their students can track their comprehension of course material. The idea is to provide a service through which teachers can get a sense of what their students need, and students can get a sense of what they need to learn.
  
  [Read up on the project here](https://github.com/CS461PollingApplication/my-classroom-fe/blob/master/Project%20Vision%20and%20Scope.pdf)
  
## Tasks For Future Teams 

- [ ] Hosting
   - [ ] Live Polling Using The Hosting
- [ ] Student / Instructor Gradebooks
   - [ ]  Instructor Grade Statistics
- [ ] Multiple Question Types
- [ ] Deleting / Editing Existing Courses, Sections, Questions, Lectures (Backend Finished)

## Build Status - WIP Edit Right Before Handoff

  > Explain current errors, bugs at project handoff for future teams/use

## Organization

```bash
./src
└── components                        # Independent components of react code such as Cards, Buttons, and Navigation
│   └── nav
│   └── questions
│   └── SingleCoursePageComponents
└── hooks                             # Reusable API Calls 
└── old_components                    # Components from previous year's build
└── old_pages                         # Pages from previous year's build
│   └── data
│   └── photos
└── pages                             # Full Application Pages Which App.js navigation links to
└── redux                             # Application State Storage
│   └── reducers
└── styles                            # CSS styling
└── utils                             # API utils 
```

## Tech Stack

- React / React Native
- Redux
- Javascript

## Dependencies

- node: 16.13.0
- npm: 9.1.2

## Setup

![img](https://github.com/CS461PollingApplication/my-classroom-fe/blob/master/bigpicture.PNG?raw=true)

Clone this Repo and the [Backend Repo](https://github.com/CS461PollingApplication/my-classroom-backend) to your machine

Follow the steps to setup the Backend Repo & Local Database

Copy `.env.example` into `.env` and set REACT_APP_API_URL to the backend URL

```
npm install
```

## Running the App

`npm run start` or `npm start`

# Interacting With the Database

```
Database <- apiUtil <- Hooks -> Redux 
                             -> Pages 
```

- apiUtil: Interacts with the database
  -  ***Input:*** Takes the api call type (CRUD), the endpoint/route for the api, reactOpts, any body, and any params
  -  ***Ouput:*** CRUD response 
- Hooks: Handles calls to apiUtil and updates the application state
  - ***Input:*** Takes no input other than url parameters 
  - ***Ouput:*** Formated responses from the api, error states, messages, and loading states. Also dispatches any new info to the Redux 

## Using Hooks To Get Information From the Database

**Landing.js** Just Call Existing Hooks!
```
const [ courses, message, error, loading ] = useCourses()   # Grabs the courses from the API for reading 
```
**UseCourses.js**
```
 useEffect( () => {
        async function populateCourses(){
            setLoading(true)
            const response = await apiUtil("get", "courses/", { dispatch: dispatch, navigate: navigate} );      # Uses apiUtil to make a GET call to the database
            setLoading(false)
            setMessage(response.message)
            setError(response.error)
            if (response.status === 200) {
                dispatch(setCourses(response.data.studentCourses, response.data.teacherCourses))                # Updates the Application state with the new course info
            }
        }
        if (courses.studentCourses == null || courses.teacherCourses == null) {
            populateCourses()
        }
    }, [])

    return [courses, message, error, loading]                                                                   # Returns Course info and response 
 ```

## Getting Involved

Feel free to open an issue for feature requests or bugs. We openly accept pull requests for bug fixes.

## Licensing

GNU General Public License v3.0
