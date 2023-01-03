# Assignment 2 - Agile Software Practice.
​
Name: Shunyi Xu
​
## API endpoints.
​​
+ GET api/movies - Get all movie genres.
+ GET api/movies/:id - get the details of a specific movie.
+ GET api/movies/:id/images
+ GET api/movies/:id/reviews
+ POST api/movies/:id/reviews
+ GET api/movies/upcoimng/:page
+ GET api/movies/topRated/:page

+ GET api/peoples/popular/|page
+ GET api/peoples/:id
+ FET api/peoples?:id/images

+ GET api/genres

+ GET api/users
+ POST api/users
+ PUT api/users/:id
+ GET api/users/:username/favourites
+ POST api/users/:username/favourites
+ /api/users/:username/movies/:id/favourites

## Test cases.
​
~~~
  Users endpoint
    POST /api/users/:userName/favourites
      Add to a favourite film to the user
        √ should return a 201 status (126ms)
  Users endpoint
      GET /api/users/:userName/favourites
      should return a 200 status and have one favourite film
        √ should return a 200 status
    POST /api/users/:username/movie/:id/favourites
      Detele a specified film from favourite list
        √ should return a 201 status (54ms)

  Movies endpoint
    GET /api/movies/:id/reviews
      when the id is valid
        √ should return the status 200 and the list of reviews
      when the id is invalid
        √ should return the NOT found message
    GET /api/movies/page/:page
      √ should return the movies got depending on page
    GET /api/movies/upcoming/:page
      when the page is valid
        √ should return the status 200 and the page list of upcoming movies (183ms)
      when the page is invalid
        √ should return the NOT found message
    GET /api/movies/topRated/:page
      when the page is valid
        √ should return the status 200 and the page list of upcoming movies (90ms)
      when the page is invalid
        √ should return the NOT found message
    GET /api/movies/tmdb/movie/:id
      when the user is authenticated
        when the id is valid number
          √ should return an object of the movie's details in tmdb and status 200 (177ms)
      when the user is not authenticated
        √ should return a status 401 and Unauthorized message
    GET /api/movies/tmdb/movie/:id/images
      when the user is authenticated
        when the id is valid number
          √ should return an object of the movie's details in tmdb and status 200 (177ms)
      when the user is not authenticated
        √ should return a status 401 and Unauthorized message

  Peoples endpoint
    GET /api/peoples/popular/:page
      √ should return 20 popular peoples and a status 200 (81ms)
    GET /api/peoples/:id
      √ should return the detail information of the person
    GET /api/peoples/:id/images
      √ should return the information of photo of the person

  Genres endpoint
    GET /api/genres
      √ should return all kinds of genres


  18 passing (7s)
  
~~~

## Independent Learning (if relevant)
​
For Option B, specify the URL of the Coveralls webpage that contains your tests' code coverage metrics:

https://coveralls.io/github/skateboard-hub/Agile-CA2

