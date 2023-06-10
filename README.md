# Authentication API With Prisma ORM

This is an Express TypeScript server with Prisma as the ORM for managing user sessions and products.

## Functionalities

1. Create User: Allows the creation of a new user account with a username and password.

2. Login (Create Session): Authenticates a user by verifying their credentials and creates a session token for subsequent API requests.

3. Logout (Invalidate Session): Invalidates the current user session, requiring re-authentication for further API access.

4. Logout out of all devices: Logs out the user from all active sessions, rendering all session tokens invalid.

5. Create Product: Enables the creation of a new product with relevant details such as name, description, price, etc.

6. Update Product: Allows updating the details of an existing product such as name, description, price, etc.

7. Delete Product: Permanently removes a product from the system.

## Dependencies

- **@prisma/client** (^4.15.0): Prisma Client is an auto-generated database client for TypeScript and Node.js that provides type-safe access to your database.
- **argon2** (^0.30.3): A library for hashing passwords using the Argon2 algorithm, providing a secure and memory-hard password hashing mechanism.
- **express** (^4.18.2): A fast, unopinionated, and minimalist web framework for Node.js, used for building the server.
- **jsonwebtoken** (^9.0.0): A library for generating and verifying JSON Web Tokens (JWT) used for session authentication and authorization.
- **zod** (^3.21.4): A TypeScript-first schema validation library that helps to validate and parse data input.

## Database

This project uses PlanetScale as the database provider. The Prisma configuration file (`prisma/schema.prisma`) should be updated with the necessary connection settings for your PlanetScale database.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install the dependencies: `npm install`

## Configuration

1. Set up your database connection by modifying the Prisma configuration file located at `prisma/schema.prisma`. Update the connection URL and any other necessary settings.
2. Adjust any other server configurations or environment variables as needed.

## Usage

1. To run the dev server: `pnpm serve:dev`
2. Build and run the project: `pnpm serve:prod`
3. The server will be running on `http://localhost:1337` by default.

## Contributing

Contributions are welcome! If you discover any issues or have suggestions for improvement, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
