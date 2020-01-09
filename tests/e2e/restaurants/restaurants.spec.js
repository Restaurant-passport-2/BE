const request = require("supertest");

const server = require("../../../server/server");

describe("restaurant search route", () => {
  //? Does it return the correct status code for the input provided?
  test("should return an OK status code", async () => {
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
  test("should return a properly formatted JSON object", async () => {
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
});
