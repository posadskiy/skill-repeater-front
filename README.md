# Skill Repeater Frontend

React SPA for the Skill Repeater platform — manage skills, track repetitions, and monitor progress through a clean, responsive interface.

## Features

- **Authentication** — login and registration via external auth/user services
- **Skill list** — view all skills with next repetition date, level, and priority
- **Skill CRUD** — create, view, edit, and delete skills with interval and priority settings
- **Repeat action** — mark a skill as repeated to advance its level and schedule the next date
- **Repetition history** — view the full history of when a skill was practiced
- **User settings** — profile and preference management
- **Protected routes** — JWT-based auth guard redirects unauthenticated users to login

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Email/password authentication |
| `/register` | Register | New account creation |
| `/skills` | Skills | List all skills with status indicators |
| `/skills/create` | Create Skill | Form for new skill (name, description, period, interval, priority) |
| `/skills/:id` | Skill Details | View skill info, repeat it, view history |
| `/skills/:id/edit` | Edit Skill | Modify existing skill settings |
| `/settings` | User Settings | Profile and preferences |

## Tech Stack

- **Build:** Vite 6
- **UI:** React 19, TypeScript 5
- **Components:** Mantine 8 (core, dates, notifications, hooks), Tabler Icons
- **Data:** TanStack React Query, Axios
- **Routing:** React Router 7
- **Auth:** JWT stored in `localStorage`, automatic 401 redirect
- **Linting:** ESLint 9

## Setup

1. Install dependencies:

```bash
npm ci
```

2. Create a `.env` file:

```env
VITE_API_URL=http://localhost:8210/
VITE_AUTH_URL=http://localhost:8100/
VITE_USER_URL=http://localhost:8090/v0
```

3. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Routes and layout (AppShell with sidebar navigation)
├── api/
│   ├── client.ts         # Axios instances (api/auth/user) with JWT interceptors
│   ├── auth.ts           # Login, register, getCurrentUser
│   ├── skills.ts         # Skill CRUD, repeat, history API calls
│   └── user.ts           # User service signup
├── components/
│   └── AppShell.tsx      # Shared layout shell
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Skills.tsx
│   ├── SkillDetails.tsx
│   ├── CreateSkill.tsx
│   ├── EditSkill.tsx
│   └── UserSettings.tsx
└── types/
    └── api.ts            # Skill, RepeatHistory, Priority, Period types
```

## Environment Variables

All three variables are **required** — the app throws at startup if any is missing.

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Skill Repeater backend base URL | `http://localhost:8210/` |
| `VITE_AUTH_URL` | External auth service base URL | `http://localhost:8100/` |
| `VITE_USER_URL` | External user service base URL | `http://localhost:8090/v0` |

## Production

Built with `npm run build`, output in `dist/`. Production Docker image uses Nginx Alpine to serve the static SPA with health checks for Kubernetes probes.

## Deployment

Kubernetes manifest and deploy scripts are in `deployment/`. Shared cluster config (namespace, ConfigMap, Secrets, Traefik ingress) lives in the parent repo's `deployment/` directory.

```bash
./deployment/scripts/build-and-push.sh <version>
./deployment/scripts/deploy.sh <version>
```
