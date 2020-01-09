const request = require("supertest");

const server = require("../../../server/server");

const db = require("../../../database/dbConnection");

beforeAll(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.seed.run();
  await db.destroy();
});

describe("passport routes", () => {
  describe("GET /passport", () => {
    //? Does it allow for unauthorized access?
    test("should return a 401 for unauthorized clients", async () => {
      const expectedStatusCode = 401;

      const passportResponse = await request(server).get("/api/passport");

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for the input provided?
    test("should return a 200 status code on success", async () => {
      const testUser = { username: "test", password: "test" };
      const expectedStatusCode = 200;

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .get("/api/passport")
        .set("authorization", loginResponse.body.token);

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const testUser = { username: "test", password: "test" };

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .get("/api/passport")
        .set("authorization", loginResponse.body.token);

      expect(passportResponse.body).toEqual(
        expect.objectContaining({
          entries: expect.any(Array),
        })
      );
    });
  });

  describe("POST /passport/entry", () => {
    //? Does it allow for unauthorized access?
    test("should return a 401 for unauthorized clients", async () => {
      const expectedStatusCode = 401;

      const passportResponse = await request(server).post("/api/passport/entry");

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for the input provided?
    test("should return a 200 status code on success", async () => {
      const testUser = { username: "test", password: "test" };

      const newEntry = {
        name: "Joe's Crab Shack",
        street_address: "123 Road Dr",
        city: "Oceanview",
        state: "CA",
        zipcode: "12345",
        phone_number: "(123)-456-7890",
        stamped: true,
        personal_rating: 5,
        notes: "Woo some notes",
      };

      const expectedStatusCode = 201;

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .post("/api/passport/entry")
        .set("authorization", loginResponse.body.token)
        .send(newEntry);

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for the input provided?
    test("should return a 409 status code on conflict (already existing entry)", async () => {
      const testUser = { username: "test", password: "test" };

      const newEntry = {
        name: "Joe's Crab Shack",
        street_address: "123 Road Dr",
        city: "Oceanview",
        state: "CA",
        zipcode: "12345",
        phone_number: "(123)-456-7890",
        stamped: true,
        personal_rating: 5,
        notes: "Woo some notes",
      };

      const expectedStatusCode = 409;

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .post("/api/passport/entry")
        .set("authorization", loginResponse.body.token)
        .send(newEntry);

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const testUser = { username: "test", password: "test" };

      const newEntry = {
        name: "Joe's Crab Shack Two",
        street_address: "456 Road Dr",
        city: "Oceanview",
        state: "CA",
        zipcode: "12345",
        phone_number: "(456)-456-7891",
        stamped: true,
        personal_rating: 4,
        notes: "More notes",
      };

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .post("/api/passport/entry")
        .set("authorization", loginResponse.body.token)
        .send(newEntry);

      expect(passportResponse.body).toEqual(
        expect.objectContaining({
          entries: expect.any(Array),
        })
      );
    });
  });

  describe("PUT /passport/entry", () => {
    //? Does it allow for unauthorized access?
    test("should return a 401 for unauthorized clients", async () => {
      const expectedStatusCode = 401;

      const passportResponse = await request(server).put("/api/passport/entry/2");

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for the input provided?
    test("should return a 200 status code on success", async () => {
      const testUser = { username: "test", password: "test" };

      const editEntry = {
        name: "Bob's Crab Shack",
        street_address: "123 Road Dr",
        city: "Oceanview",
        state: "CA",
        zipcode: "12345",
        phone_number: "(123)-456-7890",
        stamped: true,
        personal_rating: 5,
        notes: "Woo some notes",
      };

      const expectedStatusCode = 200;

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .put("/api/passport/entry/2")
        .set("authorization", loginResponse.body.token)
        .send(editEntry);

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const testUser = { username: "test", password: "test" };

      const newEntry = {
        name: "Johns's Crab Shack Two",
        street_address: "123 Road Dr",
        city: "Oceanview",
        state: "CA",
        zipcode: "12345",
        phone_number: "(456)-456-7891",
        stamped: true,
        personal_rating: 4,
        notes: "More notes",
      };

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .put("/api/passport/entry/2")
        .set("authorization", loginResponse.body.token)
        .send(newEntry);

      expect(passportResponse.body).toEqual(
        expect.objectContaining({
          entries: expect.any(Array),
        })
      );
    });
  });

  describe("DELETE /passport/entry", () => {
    //? Does it allow for unauthorized access?
    test("should return a 401 for unauthorized clients", async () => {
      const expectedStatusCode = 401;

      const passportResponse = await request(server).delete("/api/passport/entry/2");

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for the input provided?
    test("should return a 200 status code on success", async () => {
      const testUser = { username: "test", password: "test" };

      const expectedStatusCode = 200;

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .delete("/api/passport/entry/2")
        .set("authorization", loginResponse.body.token);

      expect(passportResponse.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const testUser = { username: "test", password: "test" };

      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const passportResponse = await request(server)
        .delete("/api/passport/entry/1")
        .set("authorization", loginResponse.body.token);

      expect(passportResponse.body).toEqual(
        expect.objectContaining({
          entries: expect.any(Array),
        })
      );
    });
  });
});
