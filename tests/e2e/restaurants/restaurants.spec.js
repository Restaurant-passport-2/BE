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

describe("restaurant search route", () => {
  describe("GET /restaurants/search", () => {
    //? Does it allow for unauthorized access?
    test("should return a 401 for unauthorized clients", async () => {
      const expectedStatusCode = 401;

      const response = await request(server).get("/api/restaurants/search?location=los angeles,ca");

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for the input provided?
    test("should return a 200 status code on success", async () => {
      const testUser = { username: "test", password: "test" };
      const expectedStatusCode = 200;

      const responseLogin = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const response = await request(server)
        .get("/api/restaurants/search?location=los angeles,ca")
        .set("authorization", responseLogin.body.token);

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const testUser = { username: "test", password: "test" };

      const responseLogin = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      const response = await request(server)
        .get("/api/restaurants/search?location=los angeles,ca")
        .set("authorization", responseLogin.body.token);

      expect(response.body).toEqual(
        expect.objectContaining({
          businesses: expect.any(Array),
        })
      );
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on failure", async () => {
      const response = await request(server).get("/api/restaurants/search?location=los angeles,ca");

      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });
});
