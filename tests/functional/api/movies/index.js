import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";
import { movieReviews } from '../../../../api/movies/moviesData'
import User from "../../../../api/movies/movieModel";

let seedData = {
  movieReviews : []
} 
movieReviews.results.forEach(review => seedData.movieReviews.push(review) )

const expect = chai.expect;
let db;
let movie;
let numReviews;
let token;

describe("Movies endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    while (movieReviews.results.length > 0) {
      movieReviews.results.pop()
   }
   // Repopulate datastore
   seedData.movieReviews.forEach(review => movieReviews.results.push(review)  )
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await Movie.deleteMany();
      await Movie.collection.insertMany(movies);
      await User.deleteMany();
      // Register a user
      await request(api).post("/api/users?action=register").send({
        username: "user1",
        password: "test1",
      });
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });

  describe("GET /api/movies/:id/reviews", () => {
    describe("when the id is valid", () => {
      it("should return the status 200 and the list of reviews", (done) => {
        request(api)
          .get("/api/movies/527774/reviews")
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.equal(527774);
            done()
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/movies/1/reviews")
          .expect(404)
          .expect({
            status_code: 404,
            message: "The resource you requested could not be found.",
          });
          
      });
    });
  });

  describe("GET /api/movies/page/:page ", () => {
    it("should return the movies got depending on page", () => {
      request(api)
        .get("/api/movies/page/2")
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
        });
    });
  });

  describe("GET /api/movies/upcoming/:page", () => {
    describe("when the page is valid", () => {
      it("should return the status 200 and the page list of upcoming movies", (done) => {
        request(api)
          .get("/api/movies/upcoming/2")
          .expect(200)
          .end((err, res) => {
            expect(res.body.results).to.be.a("array");
            expect(res.body.results.length).to.equal(20);
            done()
          });
      });
    });
    describe("when the page is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/movies/upcoming/9999999")
          .expect(404)
          .expect({"message":"Invalid page.","status_code":404})
      });
    });
  });

  describe("GET /api/movies/topRated/:page", () => {
    describe("when the page is valid", () => {
      it("should return the status 200 and the page list of upcoming movies", (done) => {
        request(api)
          .get("/api/movies/topRated/2")
          .expect(200)
          .end((err, res) => {
            expect(res.body.results).to.be.a("array");
            expect(res.body.results.length).to.equal(20);
            done()
          });
      });
    });
    describe("when the page is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/movies/topRated/99999999")
          .expect(404)
          .expect({"message":"Invalid page.","status_code":404})
      });
    });
  });

  describe("GET /api/movies/tmdb/movie/:id", () => {
    describe("when the user is authenticated", () => {
      before(() => {
        token = "BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M"
      })
      describe("when the id is valid number", () => {
        it("should return an object of the movie's details in tmdb and status 200", () => {
          return request(api)
            .get(`/api/movies/tmdb/movie/791373}`)
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("id", 791373);
            });
        });
      });
    });
    describe("when the user is not authenticated", () => {
      before(() => {
        token = "1"
      })
      it("should return a status 401 and Unauthorized message", () => {
        return request(api)
          .get(`/api/movies/tmdb/movie/791373}`)
          .set("Authorization", token)
          .expect(401)
          .expect("Unauthorized");
      });
    });
  });

  describe("GET /api/movies/tmdb/movie/:id/images", () => {
    describe("when the user is authenticated", () => {
      before(() => {
        token = "BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M"
      })
      describe("when the id is valid number", () => {
        it("should return an object of the movie's details in tmdb and status 200", () => {
          return request(api)
            .get(`/api/movies/tmdb/movie/791373/images`)
            .set("Authorization", token)
            .expect(200)
            .then((res) => {
              expect(res.body.backdrops).to.be.a("array")
            });
        });
      });
    });
    describe("when the user is not authenticated", () => {
      before(() => {
        token = "1"
      })
      it("should return a status 401 and Unauthorized message", () => {
        return request(api)
          .get(`/api/movies/tmdb/movie/791373/images`)
          .set("Authorization", token)
          .expect(401)
          .expect("Unauthorized");
      });
    });
  });



});
