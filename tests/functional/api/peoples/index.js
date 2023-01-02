import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import People from "../../../../api/peoples/peopleModel";
import api from "../../../../index";
import peoples from "../../../../seedData/peoples";

const expect = chai.expect;
let db;

describe("Peoples endpoint", () => {
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
      await People.deleteMany();
      await People.collection.insertMany(peoples);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });

  describe("GET /api/peoples/popular/:page ", () => {
    it("should return 20 popular peoples and a status 200", (done) => {
      request(api)
        .get(`/api/peoples/popular/1`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.results).to.be.a("array");
          expect(res.body.results.length).to.equal(20);
          done();
        });
    });
  });

  describe("GET /api/peoples/:id ", () => {
    it("should return the detail information of the person", (done) => {
      request(api)
        .get(`/api/peoples/2359226`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("object");
        });
        done();

    });
  });

  describe("GET /api/peoples/:id/images ", () => {
    it("should return the information of photo of the person", (done) => {
      request(api)
        .get(`/api/peoples/2359226/images`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.id).to.equal(2359226);
        });
        done();

    });
  });
  
  
});
