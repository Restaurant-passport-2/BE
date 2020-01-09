const request = require("supertest");

const server = require("../../server/server");

describe("server.js", () => {
  describe("index route", () => {
    //? Does it return the correct status code for the input provided?
    test("should return an OK status code", async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a JSON object", async () => {
      const expectedBody = { message: "API running!" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });

    //? Does the data returned, if any, have the right content type?
    test("should return a content type of application/json", async () => {
      const expectedContentType = "application/json";
      const response = await request(server).get("/");

      expect(response.type).toEqual(expectedContentType);
    });
  });

  describe("404 fallback route", () => {
    //? Does it return the correct status code for the input provided?
    test("should return a NOT FOUND status code", async () => {
      const expectedStatusCode = 404;

      const response = await request(server).get("/invalidroute");

      expect(response.status).toEqual(expectedStatusCode);
    });

    //? Does it return the data in the expected format?
    test("should return a JSON object", async () => {
      const expectedBody = { message: "Invalid route" };

      const response = await request(server).get("/invalidroute");

      expect(response.body).toEqual(expectedBody);
    });

    //? Does the data returned, if any, have the right content type?
    test("should return a content type of application/json", async () => {
      const expectedContentType = "application/json";
      const response = await request(server).get("/invalidroute");

      expect(response.type).toEqual(expectedContentType);
    });
  });
});
