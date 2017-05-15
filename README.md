# javascript-back-end

# TBD E-BusinessCard App name

## Group Members
  Micheal Treat, Isak Swearingen, Disa Marnesdottr,  Lindsay Gilbert, Patrick Sheridan

## Overview
An easy to use business card app for the modern world. The initial app will use Meetup to show upcoming meetups per programming language and who is going to each. Then allows for easy business card exchange.


## Models
### User Model
This is the mock data the will be individual user data stored in the database using a correct signup route
```
{
  username: "guyMcAwesome",
  password: "<bcrypted secret password>",
  email: "superAwsome@aol.com",
  timeStamp: <Default date on user creation>,
  _id: <Objected created by Mongo on user signup>
  cards: "schema.id Ref'card'"
}
``` 

### Business Card Model
Mock business card data. 
```
{
  "name" : "Kevith Baclon",
  "phoneNumber" : "555-867-5309",
  "email" : "business@biz.biz",
  "jobTitle" : "Rodeo Clown",
  "company" : "Amazon",
  "websites" : "[pleasegivemeajobmicrosoft.com]",
  "skills" : "['space marine','javascript', 'CSS']",
  _id : "<card Id>",
  "cardJpg" : "<string of .jpg route>"
}
```

## Routes
### Signup Route POST :/api/signup
This is the user signup endpoint.
The following are required to be sent with the signup route request:
- username
- password
- email address

Request made in JSON format:
```
 {"username": "guyMcAwesome", "password": <bcrypted secret password>, "email": "superAwsome@aol.com"}
 ```
 
 Username and password will be hashed to securely store.
 The response back with be a 32 byte string jwt token that can be used for future requests. 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkdPR7de.eyJ0b2tlbiI6IjVhNTFiZmI1YTlkYzJjYzY0MGRkODljODIwZjZkZWZjY2RiMGNmOTc2NGI4YjZkYTUwNDk4NzljOGNjOWZmNDIiLCJpYXQiOjE0ODk1OTIzMjB9.vfM9xh4iFZFOU_aFpWz_z4SbTAwjbAkuRCgnyyhgnEk
```


