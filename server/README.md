# MyClassroom Server
## Dependencies
- node: 16.13.0
- npm: 9.1.2
- mysql: 8.0.31

## Application Authentication & Session
The application uses cookie-based authentication once a user session has been created (i.e. a user has logged in). A user's session will have a specific XSRF token value associated with it to protect against XSRF attacks. As such, the value of that token will be sent back as a cookie, and the application expects to recieve with each authenticated request a custom X-XSRF-TOKEN header with that value, along with the traditional authentication cookie _myclassroom_session which the application generated as part of initial session creation.

A user's session is valid for a minimum of 4 hours, and as long as the user is active within 4 hours of last activity, the session can be valid for as long as 24 hours. In other words, users will be asked to login again after 4 hours of inactivity or 24 hours since they last provided their credentials.

## Configuring Services
### Emailer
The application is configured to use Courier notification infastructure to message users. In order to use the application's mailer, create an account at https://www.courier.com/. Follow Courier's setup instructions and prompts.

The process should yield a bearer token in the HTTPS request Courier generates. Copy this token, and paste it in the application environment as `COURIER_AUTH_TOKEN`. Also set `EABLE_EMAIL='true'`. That's it! You should be able to interact with the configured emailer through Courier.

It's worth noting that the application is only configured for email use through Courier, but Courier supports a variety of modern notification methods.

## Roadmap
- Learning Management System (LMS) Integration
- Expanded Question Type Support
- WebSocket Open Polling Connection for Live Updates and Feedback
- Upgrade Test Suite to Heavier Duty Framework
- Smart Classmate Pairing Suggestions
- Request Rate Limiting

## Database Schema
![Schema](https://github.com/OSU-MC/MyClassroom/assets/25465133/d987e780-fd0e-4ea5-bd18-c72de5d8c32c)


## Endpoints
[API Endpoints Doc](/API%20Endpoints%20MyClassroom.pdf)

## Getting Involved
Feel free to open an issue for feature requests or bugs. We openly accept pull requests for bug fixes.

## Licensing
GNU General Public License v3.0
