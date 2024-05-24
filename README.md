# Open-Source Classroom Polling Software
## Dependencies
- npm: 10.7.0
- node: 22.2.0
- docker: 24.0.9

## Get Started!
### Download/Install
Install Docker
- Refer to the  Get Docker Guide](https://docs.docker.com/get-docker/) for installing and setting up Docker. Docker Desktop is recommended for simplifying local development.

Clone the GitHub repository:
```
git clone git@github.com:OSU-MC/MyClassroom.git
```

Install the application dependencies:
```
npm install
```

### Configure Environment
Configure the local environment:
```
npm run config
```
- The server can be manually configured by modifying the `/server/.env` file. The `DEV_DB_...` and `TEST_DB_...` values should match those in the database/user creation commands listed in the setup steps below. Additionally, `CLIENT_URL` should be set to the front end application URL. For basic testing, the default values can be used.
- The client can be manually configured by modifying the `/client/.env` file. `REACT_APP_API_URL` should be set to the backend URL. For basic testing, the default values can be used.

### Start MyClassroom Application
Start MyClassroom using the following command:
```
npm run start
```

Press **Ctrl+C** to stop the server and shut down the Docker container.

For more database commands and testing controls, review [server/README.md](https://github.com/OSU-MC/MyClassroom/tree/dev/server)
