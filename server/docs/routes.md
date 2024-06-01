# Documentation of API routes by purpose.

## Users

This API provides endpoints to manage user accounts.

### Create a new user

- **Route:** POST /users
- **Description:** Create a new user account
- **Access:** Public

### Reset a user's password

- **Route:** PUT /users
- **Description:** Reset a user's password
- **Access:** Public

### Request a password reset

- **Route:** PUT /users/password
- **Description:** Request a password reset
- **Access:** Public

### User login

- **Route:** POST /users/login
- **Description:** Login request for a user
- **Access:** Public

### Authenticate user cookies

- **Route:** GET /users/authenticate
- **Description:** Authenticate the user cookies
- **Access:** Private (requires authentication)

### Logout user

- **Route:** GET /users/logout
- **Description:** Logout the user
- **Access:** Private (requires authentication)

### Get user account information

- **Route:** GET /users/:userId
- **Description:** Get user account information
- **Access:** Private (requires authentication)

### Update user account information

- **Route:** PUT /users/:userId
- **Description:** Update user account information
- **Access:** Private (requires authentication)

### Delete user account

- **Route:** DELETE /users/:userId
- **Description:** Delete user account
- **Access:** Private (requires authentication)

### Confirm user email address

- **Route:** PUT /users/:userId/confirm
- **Description:** Confirm user email address
- **Access:** Private (requires authentication)

### Request email confirmation

- **Route:** GET /users/:userId/confirm
- **Description:** Request email confirmation
- **Access:** Private (requires authentication)

## Courses

This API provides endpoints to manage courses.

### Get all courses

- **Route:** GET /api/courses
- **Description:** Get all courses
- **Access:** Public

### Get a course by ID

- **Route:** GET /api/courses/:id
- **Description:** Get a course by ID
- **Access:** Public

### Create a new course

- **Route:** POST /api/courses
- **Description:** Create a new course
- **Access:** Private

### Update a course by ID

- **Route:** PUT /api/courses/:id
- **Description:** Update a course by ID
- **Access:** Private

### Delete a course by ID

- **Route:** DELETE /api/courses/:id
- **Description:** Delete a course by ID
- **Access:** Private

## Sections

This API provides endpoints to manage sections.

### Get all sections

- **Route:** GET /api/sections
- **Description:** Get all sections
- **Access:** Public

### Get a section by ID

- **Route:** GET /api/sections/:id
- **Description:** Get a section by ID
- **Access:** Public

### Create a new section

- **Route:** POST /api/sections
- **Description:** Create a new section
- **Access:** Private

### Update a section by ID

- **Route:** PUT /api/sections/:id
- **Description:** Update a section by ID
- **Access:** Private

### Delete a section by ID

- **Route:** DELETE /api/sections/:id
- **Description:** Delete a section by ID
- **Access:** Private

# Enrollments

This API provides endpoints to manage enrollments.

### Get all enrollments for a course

- **Route:** GET /api/courses/:course_id/enrollments
- **Description:** Get all enrollments for a course
- **Access:** Private (requires authentication)

### Delete an enrollment

- **Route:** DELETE /api/courses/:course_id/enrollments/:enrollment_id
- **Description:** Delete an enrollment from a course
- **Access:** Private (requires authentication)

### Change a student's section

- **Route:** PUT /api/courses/:course_id/enrollments/:enrollment_id
- **Description:** Change a student's section in a course
- **Access:** Private (requires authentication)

# QuestionsInlecture

This API provides endpoints to manage questions within a lecture.

### Get a question in a lecture

- **Route:** GET /api/courses/:course_id/lectures/:lecture_id/questions/:question_id
- **Description:** Get a question in a lecture
- **Access:** Private (requires authentication)

### (Un)publish a question in a lecture

- **Route:** PUT /api/courses/:course_id/lectures/:lecture_id/questions/:question_id
- **Description:** (Un)publish a question in a lecture
- **Access:** Private (requires authentication)

### Connect a question to a lecture

- **Route:** POST /api/courses/:course_id/lectures/:lecture_id/questions/:question_id
- **Description:** Connect a question to a lecture
- **Access:** Private (requires authentication)

### Swap the order of two questions in a lecture

- **Route:** PUT /api/courses/:course_id/lectures/:lecture_id/questions
- **Description:** Swap the order of two questions in a lecture
- **Access:** Private (requires authentication)

### Remove a question from a lecture

- **Route:** DELETE /api/courses/:course_id/lectures/:lecture_id/questions/:question_id
- **Description:** Remove a question from a lecture
- **Access:** Private (requires authentication)

### Responses API

- **Route:** /api/courses/:course_id/lectures/:lecture_id/questions/:question_id/responses
- **Description:** API endpoints for managing responses to a question in a lecture

## Questions

This API provides endpoints to manage questions within a course.

### Get all questions for a course

- **Route:** GET /courses/:course_id/questions
- **Description:** Get all questions for a given course
- **Access:** Private (requires authentication)

### Create a new question for a course

- **Route:** POST /courses/:course_id/questions
- **Description:** Create a new question for a given course
- **Access:** Private (requires authentication)

## Lectures

This API provides endpoints to manage lectures within a course.

### Get all lectures

- **Route:** GET /api/courses/:course_id/lectures
- **Description:** Get all lectures for a course
- **Access:** Private (requires authentication)

### Create a new lecture

- **Route:** POST /api/courses/:course_id/lectures
- **Description:** Create a new lecture within a course
- **Access:** Private (requires authentication)

### Update a lecture by ID

- **Route:** PUT /api/courses/:course_id/lectures/:lecture_id
- **Description:** Update fields of a specific lecture
- **Access:** Private (requires authentication)

### Get a lecture by ID

- **Route:** GET /api/courses/:course_id/lectures/:lecture_id
- **Description:** Get a specific lecture by ID
- **Access:** Private (requires authentication)

### Delete a lecture by ID

- **Route:** DELETE /api/courses/:course_id/lectures/:lecture_id
- **Description:** Delete a specific lecture by ID
- **Access:** Private (requires authentication)

## lectureForSection

This API provides endpoints to manage lectures within a section.

### (Un)publish a lecture in a section

- **Route:** PUT /api/courses/:course_id/sections/:section_id/lectures/:lecture_id
- **Description:** (Un)publish a lecture in a section
- **Access:** Private (requires authentication)

## lectureSummaries

This API provides endpoints to retrieve lecture summaries.

### Get lecture summaries

- **Route:** GET /api/courses/:course_id/sections/:section_id/lectures/:lecture_id/lectureSummaries
- **Description:** Get lecture summaries for a specific lecture
- **Access:** Private (requires authentication)

## Responses

### Create a response

- **Route:** POST /api/courses/:course_id/lectures/:lecture_id/questions/:question_id/responses
- **Description:** Create a response to a question in a lecture
- **Access:** Private (requires authentication)

### Update a response

- **Route:** PUT /api/courses/:course_id/lectures/:lecture_id/questions/:question_id/responses/:response_id
- **Description:** Update a response to a question in a lecture
- **Access:** Private (requires authentication)

## Grades

This API provides endpoints to manage grades for a course.

### Get all grades for a course

- **Route:** GET /api/courses/:course_id/sections/:section_id/grades
- **Description:** Get all grades for each student in the course
- **Access:** Private (requires authentication)

### Get all grades for a section

- **Route:** GET /api/courses/:course_id/sections/:section_id/grades/all
- **Description:** Get all grades for each student in a section
- **Access:** Private (requires authentication)

### Get a student's grade

- **Route:** GET /api/courses/:course_id/sections/:section_id/grades/:student_id
- **Description:** Get the grade for a specific student in a section
- **Access:** Private (requires authentication)
