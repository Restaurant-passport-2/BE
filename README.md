# Restaurant Passport

Restaurant Passport is an app for people that want to log what restaurants they have been to, as well as find new places in their area that they might be interested in but haven't heard of before.
This repository serves as the backend for the project. See the [Product Canvas](https://docs.google.com/document/d/1mw1DhTwas-AW_0jQtWr1EpigJKfQa2jW4-wGprVToLw/edit?usp=sharing) for more information.

## [API Documentation](https://restaurant-passport-apidocs.netlify.com/)

API documentation generated with [ApiDoc](https://apidocjs.com/)

## Technologies used:

General:

- [NodeJS](https://nodejs.org/en/) backend.
- [ExpressJS](https://expressjs.com/) framework for the API.
- [express-session](https://www.npmjs.com/package/express-session) session middleware for managing user state across requests.

Security

- [CORS](https://www.npmjs.com/package/cors) for Cross-Origin configuration.
- [helmet](https://www.npmjs.com/package/helmet) for basic security adjustments to the server.
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

## Required environment variables

These are required to get the server working after install:

- NODE_ENV - production / development
- PORT - For heroku deployment
- DATABASE_ENV - testing / developing / production
- DATABASE_URL - Production database connection string (used by heroku)
- DATABASE_URL_DEV - development database connection string
- DATABASE_URL_TEST - testing database connection string
- JWT_SECRET - Key for encrypting JWTs
- HASH_SALT_ROUNDS - Salt rounds for bcrypt hashes
- YELP_API_KEY - Used by the /restaurants/search route
- YELP_API_SEARCH - URL for the yelp business search endpoint

## Running the server

```bash
# production mode
$ npm run start

# development mode
$ npm run start:dev
```

## Developing

```bash
# migrate database to latest
$ npm run db:latest

# rollback database migrations
$ npm run db:rollback

# seed the database
$ npm run db:seed
```

## Testing

```bash
# run endpoint tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE)
