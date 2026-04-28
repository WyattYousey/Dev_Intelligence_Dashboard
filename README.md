# Dev Intelligence Dashboard

**Dev Intelligence Dashboard** is a recruiter/developer-facing GitHub dashboard built with React and Vite. It allows users to search for GitHub profiles, inspect a user's repositories, and view repo details and README content in a modern dashboard layout.

## Demo & Pitch Video

A short demo and pitch video is included to explain the motivation, core features, and the user experience of the app:

- **Demo video**: [https://example.com/demo-video](https://example.com/demo-video)
- **Pitch video**: [https://example.com/pitch-video](https://example.com/pitch-video)

> The demo covers searching for a GitHub user, viewing profile metrics, repository previews, and the responsive README dashboard behavior on tablet/mobile.

## Screenshots

The following screenshots show the app in use across different screens:

1. **Homepage search** - user lookup input and focus behavior.
   [Homepage Search](./screenshots/homepage.png)
2. **User dashboard** - profile summary, metrics, and repository cards.
   [User Dashboard](./screenshots/user-dashboard.png)
3. **Repository detail page** - health score, metadata, language breakdown, and rendered README.
   [Repo Details](./screenshots/repo-detail.png)
4. **Mobile/tablet responsive layout** - stacked dashboard widgets and mobile README placement.
   [Mobile Layout](./screenshots/mobile-layout.png)

## What the app does

This project is a GitHub profile and repository intelligence dashboard with the following capabilities:

- Search for GitHub users by username.
- Display normalized user profile data including avatar, bio, follower counts, and repo count.
- Cache GitHub user and README responses in local storage to improve repeat visit performance.
- Show repository summaries with star/fork/issue counts.
- Render repository README content in the app with markdown support.
- Provide a responsive dashboard grid that changes layout for desktop, tablet, and mobile.
- Protect the app behind a simple token-based login flow for a final project demonstration.

## Tech Stack

- **React 19** for UI and component architecture.
- **Vite** for fast development and optimized builds.
- **React Router v7** for client-side routing.
- **Chart.js** and **react-chartjs-2** for visualizing repository language data.
- **react-markdown** with **remark-gfm** and **rehype-raw** for README rendering.
- **CSS modules** via plain CSS files with responsive media queries.

## Major techniques used

- **Custom hooks**: `useLocalStorage` integrates browser storage with React state.
- **API normalization**: GitHub API responses are normalized before rendering.
- **Conditional rendering**: UI adjusts for mobile/tablet breakpoints and available content.
- **Cache layer**: localStorage caches user, README, and repo data to reduce repeated network calls.
- **Reusable dashboard components**: `DashboardLayout`, `DashboardWidget`, `MetaGrid`, and `StatCard` create a consistent dashboard experience.
- **Responsive design**: breakpoints are managed across desktop, tablet, and mobile layouts for a polished final project.

## Project structure

- `src/components/` - reusable UI components and layout elements.
- `src/pages/` - page containers for home, login, user dashboard, repo details, and 404.
- `src/utils/` - GitHub API helpers, validation, README image path processing, and normalization logic.
- `src/hooks/` - custom React hooks (`useLocalStorage`).
- `src/components/styles/` - component-specific CSS files.

## How to run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

## Possible future improvements

- Add real GitHub OAuth instead of a fake localStorage token.
- Add more robust markdown sanitization instead of `rehype-raw` only.
- Improve error display for failed GitHub fetches.
- Add unit tests for normalization and validation utilities.

---

### By Wyatt Yousey
