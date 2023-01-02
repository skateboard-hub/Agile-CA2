import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";

const expect = chai.expect;
let db;
let user1token;

describe("Users endpoint", () => {
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
      await User.deleteMany();
      // Register two users
      await request(api).post("/api/users?action=register").send({
        username: "user1",
        password: "test1",
      });
      await request(api).post("/api/users?action=register").send({
        username: "user2",
        password: "test2",
      });
    } catch (err) {
      console.error(`failed to Load user test Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
  });

  describe("POST /api/users/:userName/favourites ", () => {
    describe("Add to a favourite film to the user", () => {
      it("should return a 201 status", () => {
        return request(api)
          .post("/api/users/user1/favourites")
          .send({
            id: 729648
          })
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.a("object");
          });
      });
    });
  });

  
  describe("GET /api/users/:userName/favourites ", () => {
    describe("should return a 200 status and have one favourite film", () => {
      it("should return a 200 status", () => {
        return request(api)
        .get(`/api/users/user1/favourites`)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(0);
        });
      });
    });
  });

  describe("POST /api/users/:username/movie/:id/favourites ", () => {
    describe("Detele a specified film from favourite list", () => {
      it("should return a 201 status", () => {
        return request(api)
        .post(`/api/users/user1/movie/729648/favourites`)
        .expect(201)
        .then((res) => {
          expect(res.body.favourites).to.be.a("array")
        })
      });
    });
  });

});
