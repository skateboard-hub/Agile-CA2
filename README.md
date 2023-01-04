# Assignment 2 - Agile Software Practice.
​
Name: Shunyi Xu
​
## API endpoints.
​​
+ GET api/movies - Get the information for 20 movies from the API
+ GET api/movies/:id - Get the primary information about a movie
+ GET api/movies/:id/images - Get the images that belong to a movie.
+ GET api/movies/:id/reviews - Retrieve the details of a movie or TV show review
+ POST api/movies/:id/reviews - Add a movie review
+ GET api/movies/upcoimng/:page - Get a list of upcoming movies in theatres.
+ GET api/movies/topRated/:page - Get the top rated movies on TMDB.

+ GET api/peoples/popular/|page - Get a list of the current popular movies on TMDB. 
+ GET api/peoples/:id - Get the primary person details by id.
+ GET api/peoples?:id/images - Get the images for a person.

+ GET api/genres - Get the list of official genres for movies.

+ GET api/users - Get find all the users for the App.
+ POST api/users - Authenticate the identity of user
+ PUT api/users/:id - Update the user information in the App
+ GET api/users/:username/favourites - Find the the user's the list of favourite movies
+ POST api/users/:username/favourites - Add a movie to the user's favorite movie list
+ /api/users/:username/movies/:id/favourites - Delete a movie from the user's favourite list

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

