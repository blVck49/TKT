TRKO

A simple Nodejs/Express Restful API

There are two models. The user and the project model
port = 8001

#USER

Register a user(POST)

endpoint = http://localhost:port/api/v1/users
body = email, password

Login a user(POST)

endpoint = http://localhost:port/api/v1/users/login
body = email, password

#PROJECT

At this stage the user has to be logged in

create a Project(POST)

endpoint = http://localhost:port/api/v1/projects
body = title, description

Get all projects(GET)

endpoint = http://localhost:port/api/v1/projects




