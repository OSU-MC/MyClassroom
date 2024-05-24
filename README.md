# Open-Source Classroom Polling Software
## Dependencies
- npm: 10.7.0
- node: 22.2.0
- docker: 24.0.9

## Get Started!
### Download/Install
Install Docker
- Refer to the [Get Docker Guide](https://docs.docker.com/get-docker/) for installing and setting up Docker. Docker Desktop is recommended for simplifying local development.

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
- Modify `/server/.env` to update the MyClassroom Server configuration.
- Modify `/client/.env` to update the MyClassroom Client configuration.

### Start MyClassroom Application
Start MyClassroom using the following command:
```
npm run start
```

### Stop MyClassroom Application
Press **Ctrl+C** to stop the server and shut down the Docker container.

## Development info
### Client
For more info about developing for the frontend client, visit [client/README.md](https://github.com/OSU-MC/MyClassroom/tree/dev/client)

### Server 
For more info about developing for the backend server and database, visit [server/README.md](https://github.com/OSU-MC/MyClassroom/tree/dev/server)
