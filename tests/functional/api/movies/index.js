import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;

describe("Movies endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
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
          .get("/api/movies/upcoming/9999")
          .expect(500)
          
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
          .get("/api/movies/topRated/9999")
          .expect(500)
          
      });
    });
  });

});
