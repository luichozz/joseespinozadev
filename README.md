# My Portfolio

A personal portfolio website built with **React 19**, **TypeScript**, and **Vite**, structured as an **NX monorepo** following the **Unified Presentational Architecture (UPA)** pattern.

---

## Architecture — UPA

The project is split into three workspace packages, each with a clear responsibility:

```
packages/
├── lib/        @portfolio/lib      Data, types, and the loader
├── web-ui/     @portfolio/web-ui   All UI components and styles
└── view/       @portfolio/view     App entry — assembles lib + web-ui
```

### Data flow

```
lib (data + LoaderWrapper)
  └── view (render-prop → injects data)
        └── web-ui (pure presentational components)
```

- **`lib`** owns all data and types. `LoaderWrapper` is a render-prop component that loads data and passes it down — the single source of truth for what the app knows. When you add API calls or async fetching later, this is the only place that changes.
- **`web-ui`** is purely presentational. Every component receives its data as props and has no knowledge of where data comes from.
- **`view`** is the composition layer. It wires `LoaderWrapper` to the `web-ui` sections and nothing else.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript 5.9 | Type safety |
| Vite 7 | Dev server & bundler |
| NX 20 | Monorepo orchestration & caching |
| Material UI 7 | Component library (NavBar, icons) |
| Emotion | CSS-in-JS (MUI peer dep) |
| Lottie React | Pixel cat animation in nav |
| Cloudinary | Image hosting & delivery |
| Fontsource Roboto | Self-hosted font |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement.

---

## Commands

### Root scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build  →  dist/
npm run preview    # Serve production build locally
npm run lint       # Lint all packages
```

### NX — target a specific package

```bash
npx nx run @portfolio/view:dev
npx nx run @portfolio/view:build
npx nx run @portfolio/view:preview
npx nx run @portfolio/view:lint
npx nx run @portfolio/web-ui:lint
npx nx run @portfolio/lib:lint
```

### NX — run across all packages

```bash
# All packages
npx nx run-many --target=lint --all
npx nx run-many --target=build --all

# Only packages affected by changes since main
npx nx affected --target=lint
npx nx affected --target=build
```

### NX — utilities

```bash
npx nx graph    # Open interactive dependency graph in the browser
npx nx reset    # Clear the NX build/lint cache
```

---

## Package Structure

### `packages/lib` — Data & Loader

```
src/
├── types/index.ts          Experience, AboutData interfaces
├── data/
│   ├── about.ts            Title, intro text, profile image ID
│   └── experience.ts       Work experience array
├── loaders/
│   └── LoaderWrapper.tsx   Render-prop component — injects LoaderData
└── index.ts                Barrel exports
```

**To add new data:** create a file in `data/`, add the type to `types/index.ts`, include it in `LoaderData` inside `LoaderWrapper.tsx`, and export from `index.ts`.

### `packages/web-ui` — UI Components

```
src/
├── components/
│   ├── NavBar/             Fixed top nav with smooth scroll + pixel cat
│   ├── IconBar/            Fixed left-side social icon bar
│   ├── CloudImage/         Cloudinary image wrapper
│   ├── AboutSection/       Hero section with title, photo, intro
│   ├── ExperienceSection/  Grid of experience cards
│   ├── ExperienceCard/     Individual experience card
│   └── ProjectsSection/    Projects placeholder
├── styles/main.css         All section styles and animations
├── theme/colors.ts         Color palette constants
└── index.ts                Barrel exports + CSS side-effect import
```

**To add a new component:** create a folder under `components/`, build the component, and export it from `index.ts`.

### `packages/view` — App Entry

```
src/
├── App.tsx       Wraps LoaderWrapper, renders all sections
├── App.css       App container scroll snap styles
├── main.tsx      React root, CSS variables, font imports
└── index.css     Global reset
index.html
vite.config.ts    Path aliases for @portfolio/lib and @portfolio/web-ui
```

---

## Adding a New Section (Example)

1. **Add data** in `packages/lib/src/data/mySection.ts` and its type in `types/index.ts`
2. **Extend `LoaderData`** in `LoaderWrapper.tsx` to include it
3. **Build the component** in `packages/web-ui/src/components/MySection/`
4. **Export** from `packages/web-ui/src/index.ts`
5. **Render** in `packages/view/src/App.tsx` inside the `LoaderWrapper` render prop

---

## Theme

Colors are defined in `packages/web-ui/src/theme/colors.ts` and applied as CSS custom properties in `packages/view/src/main.tsx`:

| Variable | Value | Usage |
|---|---|---|
| `--background` | `#F5E9E7` | Soft beige — section backgrounds |
| `--primary` | `#8A9DB1` | Muted blue-gray — accents, tags |
| `--secondary` | `#C1C0C2` | Gray — subtle text |
| `--accent` | `#837D68` | Warm tan-brown — headings, body text |

---

## NX Caching

`build` and `lint` results are cached locally by NX. If nothing changed, re-running them is instant. To force a fresh run:

```bash
npx nx reset
```
