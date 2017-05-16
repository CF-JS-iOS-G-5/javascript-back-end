# javascript-back-end

Jump tabs:

[Routes](https://github.com/CF-JS-iOS-G-5/javascript-back-end#routes)

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
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      200
      Success. The User has been created in the database.
   ```
 - The ```res.user``` will be an instance of the user that was just created in the database. It will resemble the modeled user data listed in the models section.
  
  
### GET: api/user/:userId

  This route will get a specific user from the database.

#### Request:

```https://businesstime.herokuapp.com/api/user/123```

#### Response:

   Attached to the response object will be two useful properties: ```res.text & res.user```.
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      200
      Success. The user has been found in the database.
   ```
 - The ```res.user``` will be an instance of the user that was just retrieved from the database. It will resemble the modeled user data listed in the models section.

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
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      201
      Success. The user has been updated.
   ```
 - The ```res.user``` will be an instance of the user that was just updated in the database. It will resemble the modeled user data listed in the models section.

### DELETE: api/user/:userId

  This route deletes a user from the database and will also automatically hit another route to delete any cards that the user had in the database.
  
#### Request:

  ```https://businesstime.herokuapp.com/api/user/123```
  
  No additional parameters are needed as the route will automatically look at the User's Cards and remove them from the card database and from the AWS S3 bucket.
  
#### Response:

  Attached to the response object will be ```res.text```.
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      204
      Success. The user and their cards have been deleted from the database and removed from the S3 bucket respectivly.
   ```
---

## Card Routes

### POST: api/user/:userId/card

  This route will create a new Card and will store the JPG image of the Card in the AWS S3 bucket.
  - ### IMPORTANT: this will also automatically update ```user.cards``` by pushing ```_id``` into the array.

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
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      201
      Success. The Card has been added to the database.
   ```
 - The ```res.user``` will be an instance of the user that has been updated with the new Card added to ```user.cards``` It will resemble the modeled user data listed in the models section.
 - the ```res.card``` will be an instance of the card that was just made. It is equivalant to ```user.card[indexOfNewCard]```.
  


**** ( DEVNOTE * these may not actually be required, and may need to be created after we reveive the rest of the data.)

### DELETE: api/user/:userId/card

  This route will delete all of the cards that the user currently has. It will remove them from the database and will also remove them from the AWS S3 bucket.
  
#### Request:
  
  ```https://businesstime.herokuapp.com/api/user/123/card```

  No other data is needed as this will automatically delete all the user's cards and remove them from the S3 Bucket and from the database.

#### Response:

 Attached to the response object will be two useful properties: ```res.text & res.user```.
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      201
      Success. All of the user's cards have been removed from the database and removed from the AWS S3 bucket.
   ```
 - The ```res.user``` will be an instance of the user that has been updated. It should now have ```user.cards === []``` The rest of the object will resemble the modeled user data listed in the models section.


### DELETE: api/user/:userId/card/:cardId

  This route will delete a specific card from the database and from the S3 bucket. It will also update ```user.cards``` to reflect the specified card having been removed.

#### Request:
  ```https://businesstime.herokuapp.com/api/user/123/card/102949```

  No other parameters are required as this will automatically delete the card from the database, remove it from the S3 bucket, and update ```user.cards``` to refelect the card having been removed.

#### Response: 

  Attached to the response object will be two useful properties: ```res.text & res.user```.
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      201
      Success. The specific card has been removed from the database, the AWS S3 bucket, and user.cards has been updated.
   ```
 - The ```res.user``` will be an instance of the user that has been updated. ```user.cards``` should no longer include the specific card. The rest of the object will resemble the modeled user data listed in the models section.

### PUT: api/user/:userId/card/:cardId

  This route will allow a user to update a card. Cannot update ```_id``` and ```userId```.

#### Request:
  
  ```https://businesstime.herokuapp.com/api/user/123/card/102949```
 
 The request.body should look similar to this:
```
{
  "cardJpg" : "<string of .jpg route>",
  "name" : "Kevin Bacon",
  "phoneNumber" : "425-555-5309",
  "email" : "business@biznes.biz",
  "jobTitle" : "Circus Clown",
  "company" : "Amazonia",
  "websites" : "[]",
  "skills" : "['space marine','javascript', 'CSS']",
}
```
#### Response:

 Attached to the response object will be three useful properties: ```res.text```, ```res.user```, and ``` res.card```.
  
 - The ```res.text``` will have a status code and a message. On success it will look like this:
   ```
      201
      Success. The Card has been update.
   ```
 - The ```res.user``` will be an instance of the user. Note, this route does NOT update the user property as no card has been added or removed from ```user.cards```. Only the _Card_ that ```user.cards[indexOfUpdatedCard]``` **_references_** will change. The rest of the User object will resemble the modeled user data listed in the models section.
 - the ```res.card``` will be an instance of the card that was just updated. It is equivalant to ```user.card[indexOfUpdatedCard]```.
 
 ---

## Meet-up API calls (MUAPI)

  These are all the routes we use to make requests from the MUAPI. Please look at the [MUAPI docs](https://secure.meetup.com/meetup_api) for more information on the types of parametes you can send on our routes.
  
### GET: api/meetup/events?text=""

  This route will get all of the meetup events that match the specified programming language. This looks at 30 mile radius around Seattle, WA.
  
  
  This route will hit the ```https://api.meetup.com/find/events``` route on the MUAPI. For more info on the ```/find/events``` route on the MUAPI docs click [here](https://secure.meetup.com/meetup_api/console/?path=%2Ffind%2Fevents).
  
  The value of the "text" key should be the name of a programming language.

#### Request:

  ```https://businesstime.herokuapp.com/api/meetup/events?text="python"```
  
  Additional paramaters may be added to refine the search.
  
#### Response:

  The response will be an array containing all the event results that are returned.
  
  Here is the syntax to find some property for a specific event:
  
  ```response.events[i].someProperty``` 
  
  Here are also some quick shortcuts to find some of the more useful specific properties:
  
  Save typing:
  ```let event = response.events[0]```
  
  This is the name of the location:
  ```event.venue.name```
  
  These are the lat and lon properties:
  ```
     event.venue.lat
     event.venue.lon
  ```
  
  These add up to create the whole address of the location:
  ```event.venue.address_1
     event.venue.address_2
     event.venue.city
     event.venue.zip``` 
     
  This is the phone number of the venue:
  ```event.venue.phone```
  
  This is the name of the event and a link to the website on Meetup:
  ```
     event.group.name
     event.link
  ``` 
  
  ##### IMPORTANT :
  
  These two properties will be used in other routes to make a detailed requests for rsvp data:
    ```
    event.group.urlname    
    event.group.id
    ``` 
    
    
 ##### Response.event[0]
 
  This is and example of what an event object will look like. The shortcuts above map the same as shown below.
 
 ```
notes are next to each important key:value pairs
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
    name: "Starbucks",   <-- Name of the location the event is held.
    lat: 47.60737228393555,  <-- GPS coords.
    lon: -122.33409118652344,
    repinned: false,
    address_1: "1125 4th Ave, Seattle ",  <-- Address of location
    address_2: "Fourth and Seneca",
    city: "Seattle",
    country: "us",
    localized_country_name: "USA",
    phone: "(206) 623-0860",  <--- Phone Number of venue
    zip: "98101",
    state: "WA"
},
group: {
  created: 1350353510000,
  name: "Seattle PyLadies",  <-- Name of the group.
  id: 5411282,  <-- IMPORTANT!! This is the id of the event!
  join_mode: "open",
  lat: 47.68000030517578,
  lon: -122.29000091552734, 
  urlname: "Seattle-PyLadies",  <-- IMPORTANT!! This is the urlname of the event!
  who: "Pythonistas"
},
link: "https://www.meetup.com/Seattle-PyLadies/events/239650725/",  <-- Link to the group's website.
description: "<p>We are a group supporting each other as we learn/deepen our Python....</p> ", res.
visibility: "public"
},```







