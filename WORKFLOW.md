# Redcontroldeck — Publishing Workflow

## Overview

The site is built with [Eleventy (11ty)](https://www.11ty.dev/). You write posts as Markdown files directly in the repo, push to GitHub via the Obsidian Git plugin, and Cloudflare Pages builds and deploys automatically. No CMS, no dashboard.

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

## Where you write

**Write directly in `src/writing/` inside the repo.** This folder is your Obsidian vault's writing home — no iCloud vault, no copying files between folders.

The repo vault is located at:
```
/Users/mkudlacz/Projects/Sites/redcontroldeck/
```

Posts with `draft: true` in their frontmatter are invisible to the site — they won't appear on any page and won't be built. This means you can safely write and save unfinished work in `src/writing/` without it going live. When you're ready to publish, remove the `draft` line and sync.

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
draft: true
---

Your content here. Write in standard Markdown.
```

Start every new post with `draft: true`. Remove that line when you're ready to publish.

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Displayed as the post headline |
| `date` | For posts | Format: YYYY-MM-DD |
| `type` | Yes | `post` (dated) or `essay` (evergreen, no date shown) |
| `hero` | No | Path to image in `src/assets/`, shown at top of post and as row thumbnail on home page |
| `draft` | No | Set to `true` to hide from the site. Remove the line entirely to publish. |

### Post vs Essay

- **post** — has a date, shown in the Posts section of Writing, date shown on home page
- **essay** — no date, shown in the Essays section, labeled "Essay" on home page

---

## Adding an image

1. Drop the image file into `src/assets/`
2. Reference it in frontmatter as `/assets/filename.jpg`

---

## Obsidian setup (macOS)

Your Obsidian vault for this site is the repo root:
```
/Users/mkudlacz/Projects/Sites/redcontroldeck/
```

The **Obsidian Git** plugin (by Vinzent Schneider) is installed. It gives you git push/pull from inside Obsidian without opening a terminal.

**To navigate to your writing folder quickly:** the `src/writing/` folder is bookmarked in the Obsidian sidebar.

---

## Publishing workflow (step by step)

### Starting a new draft

1. In Obsidian, open `src/writing/`
2. Create a new note — name it with hyphens, no spaces (e.g. `my-post-title.md`)
3. Add the frontmatter block at the top with `draft: true`
4. Write your post

### Publishing when ready

1. Remove `draft: true` from the frontmatter (or delete the line entirely)
2. Make sure `date` is set if it's a post
3. Press `Cmd+P` → type **"Git: Commit-and-sync"** → Enter
4. Cloudflare builds and deploys — live within ~60 seconds

That's it. No terminal, no extra steps.

### Saving work-in-progress without publishing

Just leave `draft: true` in the frontmatter and use **"Git: Commit-and-sync"** whenever you want to save. The file will be pushed to GitHub but the site won't show it.

---

## Adding or editing a project

Edit `src/_data/projects.json` directly in Obsidian or VS Code:

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

Open `http://localhost:8090`. Live-reloads on file changes.

---

## Cloudflare Pages build settings

Set once in the Cloudflare Pages dashboard (Settings → Builds & deployments):

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `_site` |
| Root directory | *(leave blank)* |

---

## What you never need to touch

- `src/_includes/` — layout templates
- `src/writing/writing.json` — sets default layout for all posts
- `package.json` / `package-lock.json` — dependencies
- `_site/` — generated output, not committed
