# GreenBin AI — Deployment Guide

Stack: MongoDB Atlas (database) → Render (backend API) → Vercel (frontend).

Deploy in that order — the frontend needs the backend's URL, and the backend needs the database's connection string.

---

## 1. MongoDB Atlas

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. **Database Access** → add a database user (username/password, not your Atlas login).
3. **Network Access** → add IP address `0.0.0.0/0` (allow access from anywhere) — required since Render's outbound IPs aren't static on the free tier.
4. **Connect** → "Drivers" → copy the connection string, e.g.:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/greenbin?retryWrites=true&w=majority
   ```
   Replace `<username>`/`<password>` and add a database name (e.g. `greenbin`) before the `?`.

Keep this string — it's your `MONGO_URI`.

---

## 2. Backend → Render

1. Push this repo to GitHub if you haven't already.
2. On [render.com](https://render.com) → **New** → **Web Service** → connect the repo.
3. Configure:
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free is fine for a demo.
4. Add environment variables (Render dashboard → Environment):

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | your Atlas connection string |
   | `JWT_SECRET` | any long random string |
   | `JWT_EXPIRES_IN` | `7d` |
   | `GEMINI_API_KEY` | your Gemini API key ([Google AI Studio](https://aistudio.google.com/apikey)) |
   | `GEMINI_MODEL` | `gemini-1.5-flash` |
   | `CLIENT_URL` | your Vercel URL (add this **after** step 3 below, once you know it) |

   Render sets `PORT` automatically — the app already reads `process.env.PORT`.
5. Deploy. Once live, note the URL, e.g. `https://greenbin-ai-backend.onrender.com`. Test it: `GET /api/health` should return `{"status":"ok",...}`.

### ⚠️ Known limitation: uploaded images are not persistent

Waste Scanner images are saved to disk (`backend/uploads/`) and served via `/uploads/...` — see [WasteScanner feature notes]. Render's filesystem is **ephemeral**: uploaded images are lost whenever the service redeploys or (on the free tier) spins down after inactivity and restarts. This won't break the app — new scans still work — but **old images will 404** after a restart, while the scan's text data (name, category, points) in MongoDB remains fine.

For a hackathon demo this is usually acceptable. If you need images to survive restarts, the fix is to swap local disk storage for a cloud store (e.g. Cloudinary or S3) in `backend/controllers/scanController.js` — same `imageUrl` field, different write path.

---

## 3. Frontend → Vercel

1. On [vercel.com](https://vercel.com) → **Add New** → **Project** → import the repo.
2. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
3. Add an environment variable:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://greenbin-ai-backend.onrender.com/api` (your Render URL + `/api`) |

   This is required — without it, the app falls back to relative `/api` calls, which only work in local dev (proxied by Vite). In production there's no proxy, so API calls would 404.
4. Deploy. Note the resulting URL, e.g. `https://greenbin-ai.vercel.app`.

---

## 4. Close the loop: lock down CORS

Go back to Render → your backend service → Environment → set:

```
CLIENT_URL=https://greenbin-ai.vercel.app
```

Redeploy the backend. This restricts the API to only accept requests from your deployed frontend (the code already reads `process.env.CLIENT_URL` for CORS — see `backend/server.js`). Until you set this, `CLIENT_URL` defaults to `*` (any origin), which works but is unnecessarily permissive.

---

## 5. Post-deploy checklist

- [ ] `https://<your-backend>.onrender.com/api/health` returns `{"status":"ok"}`
- [ ] Register a new account on the deployed frontend
- [ ] Log in, refresh the page — session should persist (JWT in `localStorage`)
- [ ] Upload Waste → Analyze → result card appears, scan saved
- [ ] Scan History shows the scan, category filter works
- [ ] Dashboard shows real Current Score / Items Recycled / Badges / Progress
- [ ] AI Chat responds and history persists across a refresh
- [ ] Toggle dark mode — check it persists across a refresh
- [ ] Visit a nonexistent route (e.g. `/foo`) — 404 page renders
- [ ] Visit on a phone-width viewport — sidebar collapses to a drawer, layout doesn't overflow

---

## Environment variable reference

**Backend (Render)** — see `backend/.env.example`:

| Variable | Required | Notes |
|---|---|---|
| `NODE_ENV` | recommended | `production` on Render |
| `PORT` | no | Render sets this automatically |
| `MONGO_URI` | yes | from MongoDB Atlas |
| `JWT_SECRET` | yes | any long random string |
| `JWT_EXPIRES_IN` | no | defaults to `7d` in code |
| `GEMINI_API_KEY` | yes | from Google AI Studio |
| `GEMINI_MODEL` | no | defaults to `gemini-1.5-flash` in code |
| `CLIENT_URL` | recommended | your Vercel origin, for CORS |

**Frontend (Vercel)** — see `frontend/.env.example`:

| Variable | Required | Notes |
|---|---|---|
| `VITE_API_BASE_URL` | yes, in production | your Render backend URL + `/api` |

Local development needs no `.env` changes on the frontend (leave `VITE_API_BASE_URL` unset) — only the backend needs a real `.env` (copied from `.env.example`) to run at all.
