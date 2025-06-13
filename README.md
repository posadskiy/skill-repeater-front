# Skill Repeater Frontend

A React application for managing and tracking skill repetition.

## Features

- User authentication (login/register)
- Create, read, update, and delete skills
- Track skill repetition history
- Mark skills as repeated
- View next repetition dates

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
VITE_API_URL=http://localhost:8080
```

3. Start the development server:
```bash
npm run dev
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Mantine UI
- React Query
- React Router
- Axios

## Project Structure

- `/src/api` - API client and services
- `/src/components` - Reusable components
- `/src/pages` - Page components
- `/src/types` - TypeScript type definitions

## Development

The application uses:
- Mantine UI for components and styling
- React Query for data fetching and caching
- React Router for navigation
- Axios for API requests

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.
