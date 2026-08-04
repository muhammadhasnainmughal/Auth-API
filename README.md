# Secure API with Supabase Auth

This project is a secure backend API built with Express.js that handles user authentication (Sign Up, Log In, Log Out) and protects specific routes using Supabase as the Identity Provider.

## Setup Instructions

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on `.env.example` and add your Supabase project URL and anon key.

## Run the Server

Start the server using the following command:
```bash
node index.js
```

## API Endpoints
| Route | Purpose | Auth Required |
| --- | --- | --- |
| `POST /auth/signup` | Create a new user account | No |
| `POST /auth/login` | Authenticate & return a JWT | No |
| `GET /public/info` | Read public, open data | No |
| `GET /protected/profile` | Read private profile data | Yes (Bearer Token) |
| `GET /protected/dashboard` | Read private dashboard data | Yes (Bearer Token) |
| `POST /auth/logout` | End the user's session | Yes (Bearer Token) |

### **How to Test**
1. **Sign Up**: `POST /auth/signup` with `email`, `password`.
2. **Log In**: `POST /auth/login` with `email`, `password` to get a JWT.
3. **Protect**: Use the returned JWT in the `Authorization: Bearer <token>` header for `/protected/profile` or `/protected/dashboard`.

## Strategy
* Supabase handles Authentication (Sign Up, Log In, Log Out).
* Express.js handles API routes and middleware.
* Supabase JWT is used for authentication.

## Features
* User Sign Up
* User Log In
* User Log Out
* Protected Routes
* Public Routes
* JWT Authentication
* Swagger UI Documentation

## Tech Stack
* Express.js
* Supabase
* Swagger UI

## Swagger UI Documentation

![Swagger UI Screenshot](./swagger-screenshot.png)

📖 Swagger UI Documentation Interactive API documentation is available via Swagger UI. You can test the full Auth API cycle directly from your browser without using terminal commands.

Run the containers and visit: http://localhost:3000/docs

Developed as part of the FlyRank Backend Track.

## License

ISC License

Copyright (c) 2026, Muhammad Hasnain Mughal (HM Developers)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.