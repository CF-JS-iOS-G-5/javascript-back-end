# javascript-back-end

# TBD E-BusinessCard App name

## Group Members
  Michael Treat, Isak Swearingen, Disa Marnesdottr,  Lindsay Gilbert, Patrick Sheridan

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

Response: This will send back the new user and a response 200 on a successful post and 400 on an unsuccessful one.

### GET api/user?id
Gets a user.

Enter in the specific user id to get the instance of that user.
Request should be formatted thusly:
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

*_id, "cardJpg" and "userId" are required.

Response: Return status 200 and the updated user.

### Delete API/user/card?userId="userId"
Deletes all cards for an instance of the user.
Request:

```
{
"id":"1234"
}
```    

Response: Status 200 and returns updated user.

### Delete API/user/card?userId="userId" cardId="_id"
  Deletes specific card from database.

Request:

```
{
"userId":"1234"
"cardId" : "<_id>"
}
```

Response: Return status 200 and updated user object.

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







