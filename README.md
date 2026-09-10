This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Email Setup

Outbound email is handled by Resend, not SpaceMail. Cloudflare is only used for DNS and routing.

Required environment values:

- `FROM_EMAIL` and `FROM_NAME` for the sender identity
- `RESEND_API_KEY` for outbound delivery
- `ADMIN_REPLY_TO_EMAIL` if you want replies from users to land in a dedicated admin inbox
- `EMAIL_INBOUND_WEBHOOK_SECRET` for the inbound email webhook

Admin users can open the dashboard user directory, send a message directly to a user, and the reply path will return to the configured admin inbox.

If you want user replies to appear inside the dashboard, connect Cloudflare Email Routing to a Worker that forwards replies to `/api/email/inbound`.

Cloudflare setup:

1. Route `support@globalnexustracker.com` through Cloudflare Email Routing.
2. Point the routing rule to a Worker using [cloudflare/email-routing-worker.ts](cloudflare/email-routing-worker.ts).
3. Set `INBOUND_WEBHOOK_URL` to `https://www.globalnexustracker.com/api/email/inbound`.
4. Set `INBOUND_WEBHOOK_SECRET` in both the Worker and your app environment.

The worker extracts the reply thread from the address plus-tag and posts the inbound reply into the portal inbox tables.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
