# HallThrusterVis
A web app that demonstrates the Hall Effect Thruster to the general public (ASU / NASA Psyche mission capstone).

Developers: Bryan Culver, Cameron Troy, Julio Jovel, Ira Sigman, Kyle Johnson

## Develop

```
cd hall-eff-thr-vis
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in hall-eff-thr-vis/dist
npm run preview  # serve the production build locally
```

The app is a fully static site (Vite + React + three.js from npm), so it can be hosted on any free static host.

## 3D models are loaded by URL

No 3D assets are bundled with the app. `hall-eff-thr-vis/src/config/models.json` maps each view
(Thruster, Chamber, Injector, Cathode, Coils) to an `.obj` (+ optional `.mtl`) file:

- Entries can be absolute URLs, or paths relative to `baseUrl`.
- `baseUrl` can be overridden at build time with `VITE_MODEL_BASE_URL` (see `.env.example`).
- The host must send CORS headers (GitHub Pages, jsDelivr, Cloudflare R2/S3 with CORS all do).

Currently `baseUrl` points at jsDelivr, pinned to commit `f73c513`, which still contains the original files.
To move them elsewhere, upload the `meshes/` and `materials/` folders and change `baseUrl`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes on every push to `master`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
Optionally set a repository variable `MODEL_BASE_URL` to override the asset host.

`Parts In Progress/` holds the SolidWorks/CAD source files and is not used by the app.
