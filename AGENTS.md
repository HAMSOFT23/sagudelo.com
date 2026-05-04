# sagudeloWeb

## Quick Start
1. Edit HTML files directly — no build step needed
2. Deploy static files to any host (Netlify, Vercel, GitHub Pages, etc.)
3. Contact form backend is a Cloudflare Worker — deploy `functions/sendMail.js` to Cloudflare

## Architecture
- `index.html` — home/bio
- `myGames.html` — game portfolio
- `contact.html` — form posts to `/functions/sendMail.js`
- `functions/sendMail.js` — Cloudflare Worker (reads `RESEND_API_KEY` from Cloudflare env)

## Key Files
| Path | Purpose |
|------|---------|
| `css/main.css` | Main styles (DepartureMono font) |
| `Fonts/DepartureMono-1.500/` | Custom font files |
| `functions/sendMail.js` | Serverless email handler |
| `js/contact.js` | Frontend form submission |

## Email Setup (Cloudflare Workers)
- Add `RESEND_API_KEY` in Cloudflare Workers dashboard
- Worker route: `/functions/sendMail.js`

## Development
- No npm scripts for dev — open `index.html` directly in browser
- No tests, linting, or typecheck configured
- Every code block should have the brackets on a separate line:

{

}


