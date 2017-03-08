### PROJECT DESCRIPTION:

"Student Social Network" is an application for a group of students and alumni who desire to share their projects, get feedback on projects, get new ideas, and create more social interaction and connection, possibly leading to project collaboration.

### PRIMARY USER:

The primary user could be a student from Galvanize who is busy and feels awkward communicating with the students of other web development classes or data science classes because they don't see them often enough. This student would like to view other student projects for ideas and also receive feedback on his or her project.

The network is secure and private. A student must be invited or must send a request for acceptance. After the invitation is sent by an administrator the student will receive an email with a hashed link. They follow the link to a signup page where the password they create is passed through bcrypt and added to the database. The hashed link for signup then becomes disabled.

After login the user is directed to the homepage where they can read statuses, comment on a status, create a status, view projects, give feedback on projects, or post a project.

### TECHNOLOGIES:

* React
* Bootstrap
* Node
* Express
* Knex
* PostgreSQL
* bcrypt
* jsonwebtoken
* emailjs

### FUTURE DEVELOPMENT:

Future Development includes improvement of reusable react components, more editing functionality, and more topics in addition to the projects page, such as an events page.
