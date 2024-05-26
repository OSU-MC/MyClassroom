# MyClassroom Client

## Update Client Configuration

Modify `/client/.env` to update the MyClassroom Client configuration. The `REACT_APP_API_URL` environment variable should be set to the MyClassroom Server URL. For basic testing, the default values can be used.

## Setup Application for Client Development

This guide is specifically for local development of the MyClassroom Client. You may prefer to use the main [README.md](../README.md) install/setup instructions for other deployments.

Install and configure the Application according to the steps in the main README.md but do not start the application. Then run the following from the root directory.

### Start Server and Client

Start the MyClassroom Server with Docker:

```
npm run start:server
```

Start the local development version of the MyClassroom Client:

```
npm run start -w=client
```

### Stop Server and Client

The MyClassroom Client can be stopped by pressing **Ctrl+C** while the process is running in the shell.

The MyClassroom Server can be stopped using the command:

```
npm run stop
```

## Tasks For Future Teams / Build Status

- [ ] Hosting
  - [ ] Live Polling Using The Hosting
- [ ] Student / Instructor Gradebooks
  - [ ] Instructor Grade Statistics
- [ ] Multiple Question Types
- [ ] Deleting / Editing Existing Courses, Sections, Questions, Lectures (Server Finished)

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

![New Architecture](https://github.com/OSU-MC/MyClassroom/assets/25465133/633b6e2b-bbdd-4ff6-b986-f5d809c96a9b)

- React / React Native
- Redux
- Javascript

## Interacting With the Database

![Schema](https://github.com/OSU-MC/MyClassroom/assets/25465133/a4322ae3-b9b7-4b2f-98fb-116614e381d7)

```
Database <- apiUtil <- Hooks -> Redux
                             -> Pages
```

- apiUtil: Interacts with the database
  - **_Input:_** Takes the api call type (CRUD), the endpoint/route for the api, reactOpts, any body, and any params
  - **_Ouput:_** CRUD response
- Hooks: Handles calls to apiUtil and updates the application state
  - **_Input:_** Takes no input other than url parameters
  - **_Ouput:_** Formated responses from the api, error states, messages, and loading states. Also dispatches any new info to the Redux

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
