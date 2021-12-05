# Twigs

A simple Social Media structure where the users can share blogs and arts. Gain followers and Follow people Around! 


# Project Files 

Go to the master branch to get project files.

# Frontend Frameworks

I have used React.js to build the front end of the app.

#Frontend tools
 1. Redux- To manage and centralize application state
 2. Emailjs- To send one-to-one emails
 3. Materialize UI: To build simple but versatile grids and images only.
 4. Axios: To connect to backend

# Backend Tools
1. Node and Expressjs: I have used Node with Express to create local servers and than Apis to connect to the fron end.
2. MongoDb:  I have used shared cluster of Mongodb as the database.
3. Firebase Storage: As i am using all free resources there is nothing more comfortable than firebase's free 5gb storage 
4. JwtToken: I have used Token authentication system
5. Cors: to set cross origin headers
6. bcrypt: to encrypt passwords
7. dotenv: to encode and decode env
8. moment: to manipulate dates and times
9. mongoose: to ease access to mongodb
10. multer: to accept files as form data, store in system memory and later to firebase

# File System
For image storage I have used file system rather than directly storing base64 strings or blobs into database. This would have caused large chunks of data to get stored in my database due of which data transaction would have lagged.


#Password Encryption
For password encryption, I have used bcrypt which uses hash encryption and salting

# Servers

There are basically two servers, 
One is a image bucket which is solely dedicated to store images  and send back urls.
The other one is the main server which does all the backend jobs.
As i am using Microservice structure ( and not monolithic structure ), I had to take care of all the CORS rules and elinimate the erros. 

Frontend hosted at: Netlify
Backend and Bucket hosted at: Heroku

Lastly, The app is my personal Project which is running on very fragile servers ( As free servers are very fragile ).

# Screenshot
![2](https://user-images.githubusercontent.com/66993478/144737984-d301f554-1227-4bdd-846e-fbb8aac00852.png)
![3](https://user-images.githubusercontent.com/66993478/144737987-9a6a3f54-d7f6-455a-89ad-0e9e634c91a5.png)
![4](https://user-images.githubusercontent.com/66993478/144737988-6ec591da-465f-43b4-87b7-8d2f3f38cfa5.png)
![5](https://user-images.githubusercontent.com/66993478/144737989-860abb93-875b-46e5-8b9c-ef8d0c2fc0e1.png)
![1](https://user-images.githubusercontent.com/66993478/144737990-15e707a1-870d-4cad-be19-f868c3e716ca.png)

