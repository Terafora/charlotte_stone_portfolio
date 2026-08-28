# Charlotte Stone — portfolio and field notes

A static, file-based portfolio and blog. There is no CMS, database or backend to maintain: every case study and article lives in a Markdown file and becomes a page when the site is built.

## Add a blog post

1. Copy `content/writing/_template.md`.
2. Rename the copy using a short URL-friendly name, for example `what-i-learned.md`.
3. Fill in the details between the `---` lines and write the article below them using Markdown.
4. Change `draft: true` to `draft: false` when it is ready.

The new article automatically appears on `/writing` and gets its own page at `/writing/what-i-learned`.

## Add a case study

Follow the same process using `content/work/_template.md`. The filename becomes the URL and `order` controls its position on the work page.

Available accent colours are `aqua`, `lilac`, `yellow`, `coral` and `pink`. Separate tags with commas. A draft is excluded from the built site.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

When deploying somewhere other than local development, set `NEXT_PUBLIC_SITE_URL` to the final origin (for example `https://portfolio.example.com`) so canonical and social-sharing links use the correct absolute URL.
