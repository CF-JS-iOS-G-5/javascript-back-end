# javascript-back-end

# TBD E-BusinessCard App name

## Group Members
  Micheal Treat, Isak Swearingen, Disa Marnesdottr,  Lindsay Gilbert, Patrick Sheridan

## Overview
An easy to use business card app for the modern world. The initial app will use Meetup to show upcoming meetups per programming language and who is going to each. Then allows for easy business card exchange.


## Models
### User Model
This is the mock data the will be individual user data stored in the database using a correct signup route
```{
  "bio": "lessis.me",
  "city": "New York",
  "country": "us",
  "id": 123,
  "joined": 1223340961000,
  "lat": 40.77,
  "localized_country_name": "USA",
  "lon": -73.95,
  "name": "Bobby Tables",
  "state": "NY",
  "status": "active",
  "cards": [],
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
  "cardJpg" : "<string of .jpg route>",
  "userId" : "[{schema.objectId, ref: 'card'}]"
}
```

## Routes
### POST api/user
Creates new user.
Uses data obtained from the GET route to the meetup api to create a new user in the database.

```{
  "bio": "lessis.me",
  "city": "New York",
  "country": "us",
  "id": 123,
  "joined": 1223340961000,
  "lat": 40.77,
  "localized_country_name": "USA",
  "lon": -73.95,
  "name": "Bobby Tables",
  "state": "NY",
  "status": "active",
  "cards": [],
  }
``` 
*only objects required to create our schema is the user id.

Reponse:

This will send back the new user and a response 200 on a successful post and 400 on an unsuccessful one.

### GET api/user?id
Gets a user.

Enter in the specific user id to get the instance of that user.
Resquest should be formatted thusly:
```
{
"id":"1234"
}
```
The user will receive the requested user information and a 200 response if successful or a 404 response if not found.
The response will look similar to this:
```{
  "bio": "lessis.me",
  "city": "New York",
  "country": "us",
  "id": 123,
  "joined": 1223340961000,
  "lat": 40.77,
  "localized_country_name": "USA",
  "lon": -73.95,
  "name": "Bobby Tables",
  "state": "NY",
  "status": "active",
  "cards": [],
  }
``` 

### PUT api/user?id
This route updates a user's information.  

Enter in a user's specific ID to get the instance of that user, and allows the user to change information and save it.
```
{
"id":"1234"
}
```
This will retrieve the instance of that user.

```{
  "bio": "lessis.me",
  "city": "New York",
  "country": "us",
  "id": 123,
  "joined": 1223340961000,
  "lat": 40.77,
  "localized_country_name": "USA",
  "lon": -73.95,
  "name": "Bobby Tables",
  "state": "NY",
  "status": "active",
  "cards": [],
  }
``` 
After you receive the user information, you can change properties and repost the user to update it.

```{
  "bio": "lessis.me",
  "city": "Paris",
  "country": "fr",
  "id": 123,
  "joined": 1223340961000,
  "lat": 40.77,
  "localized_country_name": "FRA",
  "lon": -73.95,
  "name": "Bobby Tables",
  "state": "NY",
  "status": "active",
  "cards": [],
  }
``` 
A successful PUT request will send a 200 message, an unsuccessful request will send a 400 response.

### DELETE api/user?id
This route deletes a user.  
Enter in a user's id to remove them and all their cards from the database.
```
{
"id":"1234"
}
```
This should remove the instance of the user.  A successful request will create a 200 response, an unsuccessful request will send a 400 response.


### Create New Card

### Post API/user/card
  This creates a new card for the user, and also updates the user. 
  
  Request 
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
  "cardJpg" : "<string of .jpg route>",
  "userId" : "[{schema.objectId, ref: 'card'}]"
}
```

*_id, "cardJpg" and "userId" are required.

  Response
    Return status 200 and the updated user.
  
### Delete API/user/card?userId="userId"
  Deletes all cards for an instance of the user.
    Request
    ```
{
"id":"1234"
}
```    
    Response
      Status 200 and returns updated user. 
  
### Delete API/user/card?userId="userId" cardId="_id"
  Deletes specific card from database.
  
    Request
    
```
{
"userId":"1234"
"cardId" : "<_id>"
}
```

  Response
    Return status 200 and updated user object. 
    
### Put API/user/card?userId="userId" cardId="_id"
    Request
    
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
  "cardJpg" : "<string of .jpg route>",
  "userId" : "[{schema.objectId, ref: 'card'}]"
}
```
   Response
     Return status 200 and requested card object.
      

