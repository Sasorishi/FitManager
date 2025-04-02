# FitManager

FitManager is a web application designed to help sports coaches efficiently manage their clients, assign training sessions, track progress, and set personalized nutrition goals.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, ShadCN
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **TypeScript**: Strongly typed JavaScript with TypeScript
- **Testing**: Jest
- **Architecture**: SOLID principles

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (Latest LTS version recommended)
- **npm** / **yarn** / **pnpm** (for package management)
- **Git** (for version control)

## Getting Started

First, install dependencies:

```bash
make install
```

Then, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Client Management**: Store and manage client profiles (height, weight, allergies, goals, etc.).
- **Training Sessions**: Assign workouts with structured schedules, alternating sessions, and rest days.
- **Performance Tracking**: Monitor progress over time.
- **Nutrition Planning**: Define calorie intake goals.
- **User-Friendly Interface**: Designed for both coaches and clients.

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

## Deployment

The project is deployed on **Vercel** for seamless integration and performance. You can deploy your own instance by linking the repository to Vercel and following the deployment guide.

## Testing

Run Jest tests:

```bash
make test
```

## License

This project is licensed under the MIT License.
