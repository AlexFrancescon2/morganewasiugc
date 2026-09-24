# UGC portfolio

React + Vite + [Motion](https://motion.dev). Built so content can later be
managed from an admin panel without touching the UI.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Where things live

```
src/
  styles/tokens.css     Design tokens: colour, type, space, radius, shadow, layers
  styles/global.css     Reset + base styles
  theme/motion.js       Motion tokens: easings, durations, springs, stagger
  content/              ← YOUR CONTENT (edit these files for now)
    site.js             name, headline, intro, email, socials, about, stats
    projects.js         portfolio pieces + filter categories
    services.js         rates
    process.js          the 4 steps
    brands.js           marquee brand names
    schema.js           the data shapes (the contract for the admin panel)
  lib/content.js        data layer: the ONE place content is read from
  hooks/useContent.js   useContent('projects') → { data, status, error }
  components/           one folder per section, each with a CSS module
  pages/Home.jsx        page composition
```

## Tokens

Two layers in `tokens.css`:

- **Primitives** such as `--blue-100: #DFECFF`, `--blue-500: #7880B5` and `--blue-900: #202030`
- **Semantic** such as `--color-bg`, `--color-text` and `--color-accent`. Components only use these.

Dark sections just add the class `theme-inverse`, which re-maps the semantic tokens.

## Adding your media

1. Put files in `public/media/` (e.g. `pancakes.mp4`, `pancakes.jpg`)
2. In `src/content/projects.js`, set
   `media: { type: 'video', src: '/media/pancakes.mp4', poster: '/media/pancakes.jpg' }`

With no `src`, a styled placeholder shows (plate / bottle / book shape by category).
Videos autoplay muted on hover in the grid and play in the detail view.
Keep clips short and compressed (under ~4 MB, 720×1280 is plenty).

## Admin panel (iteration 2): what's already prepared

- **All content goes through `lib/content.js`.** Swap `localSource` for an API
  source with the same `{ peek, get }` shape and the whole site reads from your
  database instead (Supabase, Firebase, Sanity, or your own API all work).
- **`content/schema.js`** documents every field the admin form needs.
- Every item has a stable `id`, an `order` (for drag-to-reorder) and a `published`
  flag (for drafts). `featured` controls the three hero cards.
- **Routing is set up** with react-router. Add `/admin/*` in `App.jsx`
  behind a login.
- Media uploads will go to storage (e.g. Supabase Storage); the admin
  just writes the resulting URL into `media.src`.

## Motion notes

- `MotionConfig reducedMotion="user"` respects the visitor's OS setting.
- The hero is the one orchestrated load moment. Everything else responds to
  the visitor: filters reflow, tiles expand into the detail view (shared `layoutId`),
  rate rows open. The About paragraph reveals word by word on scroll.
