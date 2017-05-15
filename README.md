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
  card: "schema.id Ref'card'"
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
  "skills" : "['space marine','javascript', 'professional pirate']",
  "cardJpg" : "<string of .jpg route>",
}
```
