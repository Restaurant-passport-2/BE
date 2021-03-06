define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "User login",
    "name": "PostLogin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Valid username associated with an account.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Valid password associated with an account.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": " HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"name\": \"Test User\",\n    \"username\": \"test\",\n    \"email\": \"test@email.com\",\n    \"city\": \"Fake City\",\n    \"zipcode\": \"12345\",\n    \"passport\": [\n      {\n        \"restaurant_id\": 1,\n        \"name\": \"Crusty Crab\",\n        \"street_address\": \"1146 Nagoya Way\",\n        \"city\": \"San Pedro\",\n        \"state\": \"CA\",\n        \"zipcode\": \"90731\",\n        \"phone_number\": \"(310) 519-9058\",\n        \"website_url\": \"No website listed\",\n        \"personal_rating\": 4,\n        \"notes\": \"Some notes about this restaurant\",\n        \"stamped\": true\n      }\n    ]\n  },\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU3ODUyNDM2MywiZXhwIjoxNTc4NTM1MTYzfQ.gD7EZeNhypJZ5GA7Ag2HbHyWtLRo8mJ3-mqEGFVGfZA\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Missing username or password parameters in request.</p>"
          }
        ],
        "401 Unauthorized": [
          {
            "group": "401 Unauthorized",
            "type": "json",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>The username/password combination was invalid.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server side error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "400 Error-Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Please provide username & password to login\"\n}",
          "type": "json"
        },
        {
          "title": "401 Error-Response",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Invalid username/password combination\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/auth/authRouter.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/signup",
    "title": "User Signup",
    "name": "PostSignup",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Full name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Strong password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>Client's city of residence.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zipcode",
            "description": "<p>Client's residence zipcode.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": " HTTP/1.1 200 OK\n{\n  \"user\": {\n    \"name\": \"Chuck Norris\",\n    \"username\": \"loneranger\",\n    \"email\": \"chuck@norris.com\",\n    \"city\": \"Chuck City\",\n    \"zipcode\": \"12345\",\n    \"passport\": []\n  },\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTU3ODUyNDQ2NiwiZXhwIjoxNTc4NTM1MjY2fQ.g1Xc0Gk_ebQmBjFKGMSvFTEIc99YeBUUXleI2vMK8Xw\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "json",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Missing a required parameter for registration.</p>"
          }
        ],
        "409 Conflict": [
          {
            "group": "409 Conflict",
            "type": "json",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Account already exists.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server side error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "400 Error-Response",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Please provide name, email, username, password, city, and zipcode\"\n}",
          "type": "json"
        },
        {
          "title": "409 Error-Response",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"Account already exists\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/auth/authRouter.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/passport/entry/:id",
    "title": "Delete passport entry",
    "name": "DeletePassportEntry",
    "group": "Passport",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>restaurant id to delete.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": " HTTP/1.1 200 OK\n{\n  \"entries\": [\n    {\n      \"restaurant_id\": 1,\n      \"name\": \"Crusty Crab\",\n      \"street_address\": \"1146 Nagoya Way\",\n      \"city\": \"San Pedro\",\n      \"state\": \"CA\",\n      \"zipcode\": \"90731\",\n      \"phone_number\": \"(310) 519-9058\",\n      \"website_url\": \"No website listed\",\n      \"personal_rating\": 4,\n      \"notes\": \"Some notes about this restaurant\",\n      \"stamped\": true\n    },\n    {\n      \"restaurant_id\": 2,\n      \"name\": \"A Restaurant Name\",\n      \"street_address\": \"123 Road Dr\",\n      \"city\": \"Ficticious City\",\n      \"state\": \"Some State\",\n      \"zipcode\": \"12345\",\n      \"phone_number\": \"No phone number listed\",\n      \"website_url\": \"No website listed\",\n      \"personal_rating\": 0,\n      \"notes\": \"Best chili dogs ever\",\n      \"stamped\": true\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Alternate-Response",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401 Unauthorized": [
          {
            "group": "401 Unauthorized",
            "type": "json",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Missing or invalid token in authorization header.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server side error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "401 Error-Response",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Token invalid\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/passport/passportRouter.js",
    "groupTitle": "Passport"
  },
  {
    "type": "get",
    "url": "/passport",
    "title": "Get user passport",
    "name": "GetPassport",
    "group": "Passport",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": " HTTP/1.1 200 OK\n{\n  \"entries\": [\n    {\n      \"restaurant_id\": 1,\n      \"name\": \"Crusty Crab\",\n      \"street_address\": \"1146 Nagoya Way\",\n      \"city\": \"San Pedro\",\n      \"state\": \"CA\",\n      \"zipcode\": \"90731\",\n      \"phone_number\": \"(310) 519-9058\",\n      \"website_url\": \"No website listed\",\n      \"personal_rating\": 4,\n      \"notes\": \"Some notes about this restaurant\",\n      \"stamped\": true\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401 Unauthorized": [
          {
            "group": "401 Unauthorized",
            "type": "json",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Missing or invalid token in authorization header.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server side error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "401 Error-Response",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Token invalid\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/passport/passportRouter.js",
    "groupTitle": "Passport"
  },
  {
    "type": "post",
    "url": "/passport/entry",
    "title": "Create a passport entry",
    "name": "PostEntry",
    "group": "Passport",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "street_address",
            "description": "<p>Street address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State (2 Char abrev): CA, NV, AZ, etc.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zipcode",
            "description": "<p>Restaurant zipcode.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>Business phone number.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "website_url",
            "description": "<p>Restaurant's website.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "stamped",
            "description": "<p>Whether you have been there or not.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "personal_rating",
            "description": "<p>Rating between 1-5.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notes",
            "description": "<p>Notes about the restaurant.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n{\n  \"entries\": [\n    {\n      \"restaurant_id\": 1,\n      \"name\": \"Crusty Crab\",\n      \"street_address\": \"1146 Nagoya Way\",\n      \"city\": \"San Pedro\",\n      \"state\": \"CA\",\n      \"zipcode\": \"90731\",\n      \"phone_number\": \"(310) 519-9058\",\n      \"website_url\": \"No website listed\",\n      \"personal_rating\": 4,\n      \"notes\": \"Some notes about this restaurant\",\n      \"stamped\": true\n    },\n    {\n      \"restaurant_id\": 2,\n      \"name\": \"A Restaurant Name\",\n      \"street_address\": \"123 Road Dr\",\n      \"city\": \"Ficticious City\",\n      \"state\": \"Some State\",\n      \"zipcode\": \"12345\",\n      \"phone_number\": \"No phone number listed\",\n      \"website_url\": \"No website listed\",\n      \"personal_rating\": 0,\n      \"notes\": \"Best chili dogs ever\",\n      \"stamped\": true\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401 Unauthorized": [
          {
            "group": "401 Unauthorized",
            "type": "json",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Missing or invalid token in authorization header.</p>"
          }
        ],
        "409 Conflict": [
          {
            "group": "409 Conflict",
            "type": "json",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Resource already exists</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server side error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "401 Error-Response",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Token invalid\"\n}",
          "type": "json"
        },
        {
          "title": "409 Error-Response",
          "content": "HTTP/1.1 401 Conflict\n{\n   \"error\": \"Restaurant already exists in another entry\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/passport/passportRouter.js",
    "groupTitle": "Passport"
  },
  {
    "type": "put",
    "url": "/passport/entry/:id",
    "title": "Edit passport entry",
    "name": "PutPassportEntry",
    "group": "Passport",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>restaurant id to delete.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": " HTTP/1.1 200 OK\n{\n  \"entries\": [\n    {\n      \"restaurant_id\": 1,\n      \"name\": \"Crusty Crab\",\n      \"street_address\": \"1146 Nagoya Way\",\n      \"city\": \"San Pedro\",\n      \"state\": \"CA\",\n      \"zipcode\": \"90731\",\n      \"phone_number\": \"(310) 519-9058\",\n      \"website_url\": \"No website listed\",\n      \"personal_rating\": 4,\n      \"notes\": \"Some notes about this restaurant\",\n      \"stamped\": true\n    },\n    {\n      \"restaurant_id\": 2,\n      \"name\": \"A Restaurant Name\",\n      \"street_address\": \"123 Road Dr\",\n      \"city\": \"Ficticious City\",\n      \"state\": \"Some State\",\n      \"zipcode\": \"12345\",\n      \"phone_number\": \"No phone number listed\",\n      \"website_url\": \"No website listed\",\n      \"personal_rating\": 0,\n      \"notes\": \"Best chili dogs ever\",\n      \"stamped\": true\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Alternate-Response",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401 Unauthorized": [
          {
            "group": "401 Unauthorized",
            "type": "json",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Missing or invalid token in authorization header.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server side error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "401 Error-Response",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Token invalid\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/passport/passportRouter.js",
    "groupTitle": "Passport"
  },
  {
    "type": "get",
    "url": "/restaurants/search",
    "title": "Search for restaurants",
    "name": "GetSearch",
    "group": "Restaurants",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location",
            "description": "<p>&quot;city, state&quot; or &quot;city, zipcode&quot;.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "term",
            "description": "<p>Search term, for example &quot;food&quot; or &quot;restaurants&quot;. The term may also be business names, such as &quot;Starbucks&quot;.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "categories",
            "description": "<p>Categories to filter the search results with..</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "price",
            "description": "<p>Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$. The price filter can be a list of comma delimited pricing levels. For example, &quot;1, 2, 3&quot; will filter the results to show the ones that are $, $$, or $$$.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "open_now",
            "description": "<p>Default to false. When set to true, only return the businesses open now.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort_by",
            "description": "<p>Suggestion to the search algorithm that the results be sorted by one of the these modes: best_match, rating, review_count or distance. The default is best_match.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of business results to return. By default, it will return 20. Maximum is 50.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "description": "<p>Offset the list of returned business results by this amount.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"businesses\": [\n    {\n      \"name\": \"Larsen's Steakhouse - Valencia\",\n      \"url\": \"https://www.yelp.com/biz/larsens-steakhouse-valencia-valencia?adjust_creative=V39ZouXZhFWakYvJzmT8QQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=V39ZouXZhFWakYvJzmT8QQ\",\n      \"image_url\": \"https://s3-media2.fl.yelpcdn.com/bphoto/JukjDzIcdbJ6iuLKyuLltg/o.jpg\",\n      \"is_closed\": false,\n      \"price\": \"$$$$\",\n      \"rating\": 4,\n      \"review_count\": 555,\n      \"categories\": [\n        {\n          \"alias\": \"steak\",\n          \"title\": \"Steakhouses\"\n        },\n        {\n          \"alias\": \"seafood\",\n          \"title\": \"Seafood\"\n        },\n        {\n          \"alias\": \"newamerican\",\n          \"title\": \"American (New)\"\n        }\n      ],\n      \"coordinates\": {\n        \"latitude\": 34.41728,\n        \"longitude\": -118.56143\n      },\n      \"location\": {\n        \"address1\": \"24320 Town Center Dr\",\n        \"address2\": \"Ste 130\",\n        \"address3\": \"\",\n        \"city\": \"Valencia\",\n        \"zip_code\": \"91355\",\n        \"country\": \"US\",\n        \"state\": \"CA\",\n        \"display_address\": [\n          \"24320 Town Center Dr\",\n          \"Ste 130\",\n          \"Valencia, CA 91355\"\n        ]\n      },\n      \"phone\": \"+16612881002\",\n      \"display_phone\": \"(661) 288-1002\",\n      \"distance\": 2.82,\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401 Unauthorized": [
          {
            "group": "401 Unauthorized",
            "type": "json",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Missing or invalid token in authorization header.</p>"
          }
        ],
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "type": "json",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Server side error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "401 Error-Response",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"error\": \"Token invalid\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/restaurants/restaurantRouter.js",
    "groupTitle": "Restaurants"
  }
] });
