# Sustainable Living Education Platform

An educational React web application that helps students learn and practice sustainable living habits through focused lessons, hands-on projects, and progress tracking. The app is fully client-side with a mock backend structure using localStorage for persistence.

## Tech Stack

- **React + Vite**
- **TypeScript**
- **React Router DOM**
- **Tailwind CSS**
- **Context API** for authentication
- **localStorage** for persistence

## Features

- **Authentication**
  - Login and registration
  - Role selection: **Student** or **Admin**
  - Auth state stored in context and `localStorage`
  - Protected and role-based routes

- **Student experience**
  - **Dashboard** with sustainability score, suggestions, and badges
  - **Lessons module** with categories, lesson detail pages, and scored quizzes
  - **Projects module** to join projects and submit completion reflections
  - **Resources page** with search and category filters (articles, PDFs, websites)
  - **Progress tracker** with completion percentages and visual progress bar

- **Admin experience**
  - **Admin dashboard** with overview metrics (lesson/project/resource counts, engagement)
  - **Manage lessons**: view current lessons and draft new ones
  - **Manage projects**: view participation metrics and draft new projects
  - **Manage resources**: review resources and draft new ones
  - All admin forms are wired to local state to mirror future API interactions.

- **UX and accessibility**
  - Clean, responsive layout with a soft green sustainability theme
  - Accessible forms and navigation (semantic HTML, labels, and aria attributes)
  - Role-aware navigation bar and dashboard sidebar
  - Toast notifications for key actions (login, registration, submissions)
  - Dark mode toggle with persistence
  - Error boundary for resilient rendering

## Getting Started

### Prerequisites

- Node.js (LTS) and npm installed on your machine.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open the printed URL (usually `http://localhost:5173`) in your browser.

### Production build

```bash
npm run build
npm run preview
```

## Folder Structure

The source code uses a feature-first layout with a clear separation of concerns:

- `src/app`
  - `router.tsx` – All public, student, and admin routes and route protection.
  - `providers.tsx` – Composes global providers (theme, auth, toast, router).

- `src/components`
  - `ui/` – Reusable, presentational UI primitives (buttons, cards, inputs, progress bar, badges, toast).
  - `layout/` – App shell components (navbar, sidebar, main layout).
  - `shared/` – Cross-cutting utilities like the theme context and error boundary.

- `src/features`
  - `auth/` – Auth context and login/register pages.
  - `lessons/` – Lessons list and detail pages with quiz logic and completion tracking.
  - `projects/` – Project list, join actions, and completion proof submission.
  - `resources/` – Filterable resources page.
  - `dashboard/` – Landing page, student dashboard, and progress tracker.
  - `admin/` – Admin dashboards and management views for lessons, projects, and resources.

- `src/hooks`
  - `useAuth()` – Consumes the authentication context.
  - `useLessons()` – Manages lesson data and per-lesson progress, including completion and scores.
  - `useProjects()` – Tracks project participation and completion reflections.
  - `useResources()` – Manages resource filters and derived lists.
  - `useTheme()` – Toggles and persists light/dark theme.

- `src/services`
  - `mockData.ts` – Strongly typed mock data for users, lessons, projects, and resources, structured like API responses.

- `src/types`
  - Shared TypeScript interfaces for users, lessons, projects, resources, and submissions.

- `src/utils`
  - `storage.ts` – Safe helpers for reading/writing JSON state to `localStorage`.

## State and Persistence

- **Auth**: The authenticated user is stored in React context and persisted in `localStorage` as a mock JWT-like token. A seeded admin user (`admin@sustainability.edu`) is available.
- **Lessons**: Lesson definitions are loaded from `mockData.ts`, and per-lesson quiz scores and completion flags persist in `localStorage`.
- **Projects**: Joining a project and submitting reflections creates participation records saved to `localStorage`.
- **Theme**: Light/dark theme preference is stored and restored from `localStorage`.

Sustainability score is calculated as:

```text
score = lessonsCompleted * 10 + projectsCompleted * 25
```

This score powers the student dashboard and progress tracker.

## Future Scalability and Backend Integration

The application is structured to plug in a real backend with minimal changes:

- Replace the `mockData.ts` imports with API calls in the custom hooks (`useLessons`, `useProjects`, `useResources`).
- Swap `storage.ts`–based persistence with network requests while keeping the same TypeScript interfaces.
- Wire the admin forms to create/update/delete endpoints for lessons, projects, and resources.
- Introduce authentication endpoints and real JWT tokens in the auth context.

Additional scalability ideas:

- Add Recharts-based visualizations to the dashboards using the existing metrics.
- Implement multi-tenant support for schools or class groups.
- Add internationalisation (i18n) for multi-language support.
- Integrate real file storage for project evidence instead of plain text reflections.

## Deployment

The app is built with Vite and produces a static bundle suitable for modern static hosting:

- **Vercel** – Create a new project from your Git repository and use the default Vite + React build settings.
- **Netlify** – Configure the build command `npm run build` and publish directory `dist`.

Both platforms provide automatic HTTPS, previews for pull requests, and simple rollbacks, making them ideal for this type of frontend-only education platform.

