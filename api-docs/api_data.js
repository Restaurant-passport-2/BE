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
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please provide username & password to login\"\n}",
          "type": "json"
        },
        {
          "title": "401 Error-Response",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Invalid username/password combination\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Server error\"\n}",
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
    "title": "User signup",
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
            "description": "<p>User's full name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>User's city.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zipcode",
            "description": "<p>User's zipcode.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please provide name, email, username, password, city, and zipcode\"\n}",
          "type": "json"
        },
        {
          "title": "500 Error-Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Server error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/auth/authRouter.js",
    "groupTitle": "Auth"
  }
] });
