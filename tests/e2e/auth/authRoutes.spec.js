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

describe("Login/Signup routes", () => {
  describe("POST /auth/login", () => {
    //? Does it return the correct status code for valid credentials?
    test("should return a 200 status code on success", async () => {
      const testUser = { username: "test", password: "test" };
      const expectedStatusCode = 200;

      const response = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for missing parameters?
    test("should return a 400 status code on missing parameters", async () => {
      const missingParams = { username: "some" };
      const expectedStatusCode = 400;

      const response = await request(server)
        .post("/api/auth/login")
        .send(missingParams);

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for invalid credentials?
    test("should return a 401 status code on invalid username/password", async () => {
      const invalidUser = { username: "invalid", password: "invalid" };
      const expectedStatusCode = 401;

      const response = await request(server)
        .post("/api/auth/login")
        .send(invalidUser);

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const testUser = { username: "test", password: "test" };

      const response = await request(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(response.body).toEqual(
        expect.objectContaining({
          user: {
            name: expect.any(String),
            username: expect.any(String),
            email: expect.any(String),
            city: expect.any(String),
            zipcode: expect.any(String),
            passport: expect.any(Array),
          },
          token: expect.any(String),
        })
      );
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on failure", async () => {
      const invalidUser = { username: "invalid", password: "invalid" };

      const response = await request(server)
        .post("/api/auth/login")
        .send(invalidUser);

      expect(response.body).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });

  //* SIGNUP ROUTE TESTS
  describe("POST /auth/signup", () => {
    //? Does it return the correct status code for successful signup?
    test("should return a 201 status code on success", async () => {
      const newSignup = {
        name: "Bob",
        email: "bob@email.com",
        username: "bob",
        password: "bobby123",
        city: "bobbington",
        zipcode: "12345",
      };
      const expectedStatusCode = 201;

      const response = await request(server)
        .post("/api/auth/signup")
        .send(newSignup);

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for missing parameters?
    test("should return a 400 status code on missing parameters", async () => {
      const missingParams = { email: "bob@email.com", username: "bob", password: "bobby123" };
      const expectedStatusCode = 400;

      const response = await request(server)
        .post("/api/auth/signup")
        .send(missingParams);

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the correct status code for duplicate signup?
    test("should return a 409 status code on 'already existing' user'", async () => {
      const newSignup = {
        name: "Bob",
        email: "bob@email.com",
        username: "bob",
        password: "bobby123",
        city: "bobbington",
        zipcode: "12345",
      };
      const expectedStatusCode = 409;

      const response = await request(server)
        .post("/api/auth/signup")
        .send(newSignup);

      expect(response.status).toEqual(expectedStatusCode);
    });
  });

  describe("Combined functionality", () => {
    beforeAll(async () => {
      await db.seed.run();
    });

    //? Can I login with a user I just created?
    test("should allow user login after signing up", async () => {
      const newSignup = {
        name: "Bob",
        email: "bob@email.com",
        username: "bob",
        password: "bobby123",
        city: "bobbington",
        zipcode: "12345",
      };

      const newLogin = {
        username: "bob",
        password: "bobby123",
      };

      const expectedStatusCode = 200;

      await request(server)
        .post("/api/auth/signup")
        .send(newSignup);

      const responseLogin = await request(server)
        .post("/api/auth/login")
        .send(newLogin);

      expect(responseLogin.status).toEqual(expectedStatusCode);
    });
  });
});
