# Aarush — freelance portfolio

An independent Next.js / TypeScript portfolio with a live Three.js sculpture, locally hosted typography, responsive project previews, service accordions, and an email-draft inquiry form.

## Run

```sh
npm install
npm run dev -- --port 3002
```

Open http://localhost:3002. Production: `npm run build` then `npm start`.

## Verify

```sh
npm run typecheck
npm run build
node scripts/verify.mjs
```

Browser verification expects the dev server on port 3002 and Playwright Chromium installed (`npx playwright install chromium`). It checks responsive overflow, project filtering, accordions, material controls, inquiry validation, mobile navigation, and reduced motion. Screenshots go into `.impeccable/review/`.

## Content

- Edit services, projects, links, and the contact email in `app/page.tsx`.
- The email form opens a prefilled draft in the visitor’s email app. It does not send messages or store submissions on a server.
- Tomas and EchoFoil previews were captured from the client sites linked in the supplied repositories. EchoFoil is described as a storefront preview.
- CrackAI (https://www.crackai.tech/) is the AI Resources project, confirmed by the user.
- Font licensing is in `public/fonts/OFL.txt`; project screenshot origins are in `public/projects/PROVENANCE.md`.
- Sculpture responds to the pointer, supports orange/chrome materials and pause/play, honors reduced motion, suspends rendering out of view, and includes a non-WebGL fallback.

## Deploy

Deploy this `freelance-portfolio` directory as the application root to a Next.js-compatible host. No environment variables or external APIs are required. Configure a production domain before adding canonical metadata.

## Payments

The Payments navigation link opens the project-payment section. It currently shows “Online payments coming soon” and a working email link to request payment instructions. No payment can be collected yet.

When ready, set `paymentSettings.url` in `lib/payments.ts` to your own hosted HTTPS payment URL (for example, your provider’s payment link). The section automatically replaces its pending state with the payment button. Set `buttonLabel` if desired. No card information or payment credentials are stored by this portfolio. Payment confirmation is handled by the provider, not inferred from returning to this site.
