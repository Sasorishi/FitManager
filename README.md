# FitManager

FitManager is a web application designed to help sports coaches efficiently manage their clients, assign training sessions, track progress, and set personalized nutrition goals.

## Project Overview
FitManager is a comprehensive fitness management application designed to help coaches and clients manage training sessions, nutrition plans, and overall fitness goals. The application leverages a robust backend to handle user authentication, data storage, and business logic.

## Features
- **Client Management**: Store and manage client profiles (height, weight, allergies, goals, etc.).
- **Training Sessions**: Assign workouts with structured schedules, alternating sessions, and rest days.
- **Performance Tracking**: Monitor progress over time.
- **Nutrition Planning**: Define calorie intake goals.
- **User-Friendly Interface**: Designed for both coaches and clients.
- **User Authentication**: Secure login and registration using Supabase.
- **Training Session Management**: Create, update, and track training sessions.
- **Nutrition Plans**: Manage personalized nutrition plans for clients.
- **Client and Coach Management**: Keep track of client and coach information.

## Database Schema
The following UML diagram represents the database schema used in FitManager:

![UML Diagram](assets/uml.png)

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, ShadCN
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **TypeScript**: Strongly typed JavaScript with TypeScript
- **Testing**: Jest
- **Architecture**: SOLID principles

## Technologies Used
- **TypeScript**: For type-safe JavaScript development.
- **Jest**: For unit testing services and ensuring code reliability.
- **Supabase**: For authentication and database management.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (Latest LTS version recommended)
- **npm** / **yarn** / **pnpm** (for package management)
- **Git** (for version control)

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `make install`.
3. Set up environment variables in `.env.local`.
4. Run tests using `make test`.

## Development Commands

The project uses a **Makefile** to simplify common tasks:

- **Install dependencies:**
  ```bash
  make install
  ```
- **Lint the code:**
  ```bash
  make lint
  ```
- **Format the code:**
  ```bash
  make format
  ```
- **Run tests:**
  ```bash
  make test
  ```

## Development Workflow

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd fitmanager
   ```
2. **Install dependencies**
   ```bash
   make install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
4. **Check for linting issues**
   ```bash
   make lint
   ```
5. **Format code before committing**
   ```bash
   make format
   ```
6. **Run tests before pushing changes**
   ```bash
   make test
   ```
7. **Deploy on Vercel** (if needed)
   ```bash
   vercel --prod
   ```

## Contribution Guidelines
Contributions are welcome! Please fork the repository and submit a pull request for review.

## Deployment

The project is deployed on **Vercel** for seamless integration and performance. You can deploy your own instance by linking the repository to Vercel and following the deployment guide.

## Testing

Run Jest tests:

```bash
make test
```

## License
This project is licensed under the MIT License.
