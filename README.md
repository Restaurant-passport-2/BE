# Restaurant Passport

Restaurant Passport is an app for people that want to log what restaurants they have been to, as well as find new places in their area that they might be interested in but haven't heard of before.
This repository serves as the backend for the project. See the [Product Canvas](https://docs.google.com/document/d/1mw1DhTwas-AW_0jQtWr1EpigJKfQa2jW4-wGprVToLw/edit?usp=sharing) for more information.

## Technologies used:

General:

- [NodeJS](https://nodejs.org/en/) backend.
- [ExpressJS](https://expressjs.com/) framework for the API.

Security

- [CORS](https://www.npmjs.com/package/cors) for Cross-Origin configuration.
- [helmet](https://www.npmjs.com/package/helmet) for basic security adjustments to the server.
- [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken) for securely transmitting data between client-server
- [bcrypt](https://www.npmjs.com/package/bcrypt) for encrypting/hashing sensitive user data.

Testing:

- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)

Database:

- [knex](https://www.npmjs.com/package/knex) as the query builder and interface to postgres
- [pg](https://www.npmjs.com/package/pg) PostgreSQL

## Installation

```bash
$ npm install
```

## Running the server

```bash
# production mode
$ npm run start

# development mode
$ npm run start:dev
```

## Testing

```bash
# run endpoint tests
$ npm run test:e2e

# database tests
$ npm run test

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE)
