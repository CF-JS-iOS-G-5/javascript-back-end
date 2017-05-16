# javascript-back-end

## TBD E-BusinessCard App name

### Group Members
  Michael Treat, Isak Swearingen, Disa Marnesdottr,  Lindsay Gilbert, Patrick Sheridan

---

## Overview
  An easy to use business card app for the modern world. The initial app will use Meetup to show upcoming meetups per programming language and who is going to each. Then allows for easy business card exchange.

---
## Models

### User Model

  This is what an example User object will look like in our database. When a User is made, the only property that is required to be filled out is ``` userId ``` because that is what relates a user from Meetup's database to a user in our database. The other properties can be updated or omitted as needed.
  
  The user will also have a property ```user.cards``` that will be added when the user is made. This is defaulted to an empty array that will later be filled with references to the User's Cards that they have made.

```
{
  "userId": 123,
  "cards": [],
  "bio": "lessis.me",
  "city": "New York",
  "country": "us",
  "lat": 40.77,
  "localized_country_name": "USA",
  "lon": -73.95,
  "name": "Bobby Tables",
  "state": "NY",
}
```



### Business Card Model

  A Card is a business card that the user makes and that is attached to that user, and a user can have multiple cards. The 3 things that are required for this model are ```_id```,```cardJPG```, and ```userId```.

```_id```     refers to this card's unique id.
```cardJPG``` refers to the URI for the JPG image of the card.
```userId```  refers to the userId property of the user that made this card. This is what links a card to a user.

The rest of the properties can be updated or omitted as needed.



This is what an example Card would look like:
```
{
  _id : "<card Id>",
  "cardJpg" : "<string of .jpg route in AWS S3>",
  "userId" : "[{schema.objectId, ref: 'card'}]",
  "name" : "Kevith Baclon",
  "phoneNumber" : "555-867-5309",
  "email" : "business@biz.biz",
  "jobTitle" : "Rodeo Clown",
  "company" : "Amazon",
  "websites" : "[pleasegivemeajobmicrosoft.com]",
  "skills" : "['space marine','javascript', 'CSS']",
}
```
---

## Routes

This section lists the routes that we have defined for the app. In addition, we have also defined the routes that we will be using when making calls to the meetup api.


### This section is broken into 3 parts:


##### User routes 
- These are routes that will interact with the User objects in the database.

##### Card routes 
- These are the routes that will interact with the Card objects in the database. 

- Some of these routes will also interact with the User database, for example the PUT or DELETE routes will also need to update the User in the user database to reflect the changes.

##### Meetup API routes (MUAPI) 
- These are the routes that will be used when interacting with the MUAPI.
- Some of these routes will interact with User objects 

---

## User routes

### POST: api/user


  This route will create a new User. This will take the data we get back from the meetup api about the user that has just signed in using OAuth.

  The only property that is required on the request is ```{"userId" : "123"}``` as that property is what relates the user from the meetup database to a user in our database. Other properties about the User can change in the meetup database or in our User database without breaking the references between the two databases since the userId property will never be changed in either database.

Here is an example of what a request may look like:

#### Request:

```https://businesstime.herokuapp.com/api/user```

The request.body would look similar to this. Only "userId" is required, and it must match what the userId that was received from the Meetup api when the user logged in.
```

{
  "userId": 123,
  "bio": "lessis.me",
  "city": "New York",
  "country": "us",
  "lat": 40.77,
  "localized_country_name": "USA",
  "lon": -73.95,
  "name": "Bobby Tables",
  "state": "NY",
}
```

#### Response:

  Attached to the response object will be two useful properties: ```res.text & res.user```.
  
 - The ```res.text``` will return a status both a status code and a message. On success it will look like this:
   ```
      200
      Success. The User has been created in the database.
   ```
 - The ```res.user``` will return an instance of the user that was just created in the database. It will resemble the modeled user data listed in the models section.
  
  
### GET: api/user/:userId

  This route will get a specific user from the database.

#### Request:

```https://businesstime.herokuapp.com/api/user/123```

#### Response:

   Attached to the response object will be two useful properties: ```res.text & res.user```.
  
 - The ```res.text``` will return a status both a status code and a message. On success it will look like this:
   ```
      200
      Success. The user has been found in the database.
   ```
 - The ```res.user``` will return an instance of the user that was just retrieved from the database. It will resemble the modeled user data listed in the models section.

### PUT: api/user/:userId

  This route will update a user's information. The only property that cannot be updated is ```userId```.

#### Request:

  ```https://businesstime.herokuapp.com/api/user/123```
  
  The ```request.body``` will have the properties that need to be updated. It will be sent over in JSON format:
```
This is what req.body will be equal to:

{
  "name" : "Sally",
  "bio" : "I'm a software developer from Seattle WA!",
  "city" : "New York", 
  "etc",
  "etc",
  ......
}
```

#### Response:

  Attached to the response object will be two useful properties: ```res.text & res.user```.
  
 - The ```res.text``` will return a status both a status code and a message. On success it will look like this:
   ```
      201
      Success. The user has been updated.
   ```
 - The ```res.user``` will return an instance of the user that was just updated in the database. It will resemble the modeled user data listed in the models section.

### DELETE: api/user/:userId

  This route deletes a user from the database and will also automatically hit another route to delete any cards that the user had in the database.
  
#### Request:

  ```https://businesstime.herokuapp.com/api/user/123```
  
  No additional parameters are needed as the route will automatically look at the User's Cards and remove them from the card database and from the AWS S3 bucket.
  
#### Response:

  Attached to the response object will be ```res.text```.
  
 - The ```res.text``` will return a status both a status code and a message. On success it will look like this:
   ```
      204
      Success. The user and their cards have been deleted from the database and removed from the S3 bucket respectivly.
   ```
---

## Card Routes

### POST: api/user/:userId/card

  This route will create a new Card and will store the JPG image of the Card in the AWS S3 bucket.
  - ### IMPORTANT: ###### this will also automatically update ```user.cards``` by pushing ```_id``` into the array.

#### Request:

  ```https://businesstime.herokuapp.com/api/user/123/card```

  This is what the ```request.body``` would look like. The only required properties are ```_id```,```cardJPG```, and ```userId```. **** see note on bottom.
```
{
  _id : "<card Id>",
  "cardJpg" : "<string of .jpg route>",
  "userId" : "[{schema.objectId, ref: 'card'}]",
  "name" : "Kevith Baclon",
  "phoneNumber" : "555-867-5309",
  "email" : "business@biz.biz",
  "jobTitle" : "Rodeo Clown",
  "company" : "Amazon",
  "websites" : "[pleasegivemeajobmicrosoft.com]",
  "skills" : "['space marine','javascript', 'CSS']",
}
```

*_id, "cardJpg" and "userId" are required.

#### Response: 

 Attached to the response object will be three useful properties: ```res.text```, ```res.user```, and ``` res.card```.
  
 - The ```res.text``` will return a status both a status code and a message. On success it will look like this:
   ```
      201
      Success. The Card has been added to the database.
   ```
 - The ```res.user``` will return an instance of the user that has been updated with the new Card added to ```user.cards``` It will resemble the modeled user data listed in the models section.
 - the ```res.card``` will return the card that was just made. It is equal to ```user.card[`${indexOfNewlyCreatedCard}`]```.
  


**** ( DEVNOTE * these may not actually be required, and may need to be created after we reveive the rest of the data.)

### DELETE: api/user/:userId/card

  This route will delete all of the cards that the user currently has. It will remove them from the database and will also remove them from the AWS S3 bucket.
  
#### Request:
  
  ```https://businesstime.herokuapp.com/api/user/123/card```

  No other data is needed as this will automatically delete all the user's cards and remove them from the S3 Bucket and from the database.

#### Response:

 Attached to the response object will be two useful properties: ```res.text & res.user```.
  
 - The ```res.text``` will return a status both a status code and a message. On success it will look like this:
   ```
      201
      Success. All of the user's cards have been removed from the database and removed from the AWS S3 bucket.
   ```
 - The ```res.user``` will return an instance of the user that has been updated. It should now have ```user.cards === []``` The rest of the object will resemble the modeled user data listed in the models section.


### DELETE: api/user/:userId/card/:cardId

  This route will delete a specific card from the database and from the S3 bucket. It will also update ```user.cards``` to reflect the specified card having been removed.

#### Request:
  ```https://businesstime.herokuapp.com/api/user/123/card/102949```

  No other parameters are required as this will automaticall delete the card from the database, remove it from the S3 bucket, and update ```user.cards``` to refelct the card having been removed.

#### Response: 



### Put API/user/card?userId="userId" cardId="_id"

Request:

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
Response: Return status 200 and requested card object.

###Meet up API calls

Search all events based off specific params

#GET api/meetup/events?language=""&zip=""

Request:
```
{
  "language" : "python"
  "zip" : "98210"
}
```

This will be used to complete this api call as such:
https://api.meetup.com/find/events?key=${process.env.key}&sign=true&photo-host=public&text=${language}&zip=${zip}&radius=1

Response:

The response will be a large JSON object that looks like this:
```
{
  created: 1485402648000,
  duration: 7200000,
  id: "rbnxmmywhbtb",
  name: "PyLadies Learning Circle",
  rsvp_limit: 28,
  status: "upcoming",
  time: 1494898200000,
  updated: 1494828119000,
  utc_offset: -25200000,
  waitlist_count: 0,
  yes_rsvp_count: 12,
  venue: {
    id: 1094522,
    name: "Starbucks",
    lat: 47.60737228393555,
    lon: -122.33409118652344,
    repinned: false,
    address_1: "1125 4th Ave, Seattle ",
    address_2: "Fourth and Seneca",
    city: "Seattle",
    country: "us",
    localized_country_name: "USA",
    phone: "(206) 623-0860",
    zip: "98101",
    state: "WA"
},
group: {
  created: 1350353510000,
  name: "Seattle PyLadies",
  id: 5411282,
  join_mode: "open",
  lat: 47.68000030517578,
  lon: -122.29000091552734, 
  urlname: "Seattle-PyLadies",
  who: "Pythonistas"
},
link: "https://www.meetup.com/Seattle-PyLadies/events/239650725/",
description: "<p>We are a group supporting each other as we learn/deepen our Python....</p> ",
visibility: "public"
},```
The things you will want to use are:

``` 
res.group.id -> returns id:5411282 
res.group.urlname -> returns "Seattle-PyLadies"
res.link -> "https://www.meetup.com/Seattle-PyLadies/events/239650725/
res.description -> "<description of event>"

```
Use the meet-up api docs for more information. 







