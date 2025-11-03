## Project Folder Structure

_Purpose_: Quick reference to how files are organized and what each directory is for.​

### Root

- public/: Static assets served as-is (e.g., vite.svg).​
- src/: Application source code.​
- App.jsx, App.css, index.css: Global app shell and base styles.​
- main.jsx: Entry point that mounts the React app.​

### src/app

- AppRoutes.jsx: Central route definitions using React Router.​

### src/assets

- images/: General image assets used in the app.​
- logos/: Brand and logo files.​
- styles/: Global or shared CSS, tokens, or utility styles.​

### src/components

- common/: Reusable building blocks (buttons, inputs, cards).​
- loaders/: Loading spinners and skeleton components.​
- ui/: Higher-level UI widgets and composites.​

### src/layouts

- MainLayout.jsx: App-wide layout wrapper that composes Header and Footer with an outlet for pages.​

### src/pages

- Home/: Home page screen components.​
- Jobs/: Jobs listing or related pages.​
- PageNotFound/: 404 not found screen.​
- Pathway/: Path or roadmap related screen.​
- Portfolio/: Portfolio showcase screen.​

### Header and Footer

- components/common/Header.jsx: Site header (logo, nav). Rendered inside MainLayout.​
- components/common/Footer.jsx: Site footer (links, credits). Rendered inside MainLayout.​

### src/utils

- Helper functions, formatters, and shared utilities
