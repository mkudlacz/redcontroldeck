# Redcontroldeck — Publishing Workflow

## Overview

The site is built with [Eleventy (11ty)](https://www.11ty.dev/), a static site generator. You write content as Markdown files, push to GitHub, and Cloudflare Pages builds and deploys automatically. No CMS, no dashboard — just files and git.

---

## Tech stack

| Layer | Tool |
|---|---|
| Site generator | Eleventy 3.x |
| Source files | `src/` |
| Build output | `_site/` (generated, not committed) |
| Hosting | Cloudflare Pages |
| Deployment | Auto-deploy on push to `main` |
| Domain | redcontroldeck.com |

---

## Project structure

```
src/
  _data/
    projects.json       ← project list (edit to add/remove projects)
  _includes/
    base.njk            ← shared layout (nav, head)
    post.njk            ← writing post layout
  assets/               ← images, CSS, favicon
  writing/
    writing.json        ← default layout for all posts (don't touch)
    your-post.md        ← your content goes here
  about/index.njk       ← About page
  projects/index.njk    ← Projects page
  index.njk             ← Home page
```

---

## Writing a post

Create a new `.md` file in `src/writing/`. The filename becomes the URL slug.

**Example:** `src/writing/my-first-post.md` → `redcontroldeck.com/writing/my-first-post/`

### Frontmatter

Every post needs a frontmatter block at the top:

```markdown
---
title: "Your Post Title"
date: 2026-05-12
type: post
hero: /assets/your-image.jpg
---

Your content here. Write in standard Markdown.
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Displayed as the post headline |
| `date` | For posts | Format: YYYY-MM-DD |
| `type` | Yes | `post` (dated) or `essay` (evergreen, no date shown) |
| `hero` | No | Path to image in `src/assets/`, or an external URL. Shown at top of post and as thumbnail on home page. |

### Post vs Essay

- **post** — has a date, appears in the Posts section of the Writing index, date shown on home page row
- **essay** — no date, appears in the Essays section, labeled "Essay" on home page

---

## Adding an image

1. Drop the image file into `src/assets/`
2. Reference it in frontmatter as `/assets/filename.jpg`

Supported formats: JPG, PNG, SVG, WebP.

---

## Writing in Obsidian

If your Obsidian vault is separate from the repo, write your post there and copy the `.md` file into `src/writing/` when ready to publish. Make sure the frontmatter block is at the top.

Alternatively, point an Obsidian folder directly at `src/writing/` so saves go straight to the repo.

---

## Publishing (the full loop)

```bash
# 1. Write your post, save it to src/writing/your-post.md
# 2. Add any images to src/assets/

# 3. Commit and push
git add src/
git commit -m "Add post: your post title"
git push
```

Cloudflare Pages detects the push, runs `npm run build`, and deploys `_site/` to redcontroldeck.com. Usually live within 30–60 seconds.

---

## Adding or editing a project

Edit `src/_data/projects.json`:

```json
[
  {
    "name": "Project Name",
    "url": "https://example.com",
    "description": "One sentence description.",
    "status": "active",
    "image": "/assets/project-image.jpg"
  }
]
```

| Field | Notes |
|---|---|
| `name` | Displayed as the project title |
| `url` | Link target. Use `"#"` for projects not yet live. |
| `description` | Shown below the title on home and projects pages |
| `status` | `active`, `in progress`, `archived` — shown as a small label |
| `image` | Optional. Path to image in `src/assets/`. |

---

## Previewing locally

```bash
npm run serve -- --port 8090
```

Open `http://localhost:8090`. The server live-reloads on file changes.

---

## Cloudflare Pages build settings

These are set once in the Cloudflare Pages dashboard (Settings → Builds & deployments):

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `_site` |
| Root directory | *(leave blank)* |

---

## What you never need to touch

- `src/_includes/` — layout templates (only edit if changing site design)
- `src/writing/writing.json` — sets default layout for all posts
- `package.json` / `package-lock.json` — dependency files
- `_site/` — generated output, not committed to git
