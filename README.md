# Svelte SaaS Starter

This is a starter template for building a SaaS application using Svelte and SvelteKit.

## Features

- **DB + Auth**: Supabase
- **Payments**: Stripe
- **Styling**: Tailwind
- **UI**: Shadcn UI

## Local Development

### Prerequisites

- Node.js >= 22.0.0
- PNPM >= 9.0.0
- Stripe CLI >= 1.26.1

Stripe CLI:

```bash
stripe login
```

Supabase Local Setup (Optional):

```bash
pnpm supabase init
pnpm supabase start
```

## Setup

Create .env.local file:

```bash
pnpm run db:setup
```

### Run Project

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app in action.

Optionally, you can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:5173/api/stripe/webhook
```

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

---

## TODO:
- [x] Project structure and setup
- [x] Supabase local + remote setup
- [x] Add Shadcn UI
- [x] Dark / Light mode
- [x] Authentication flow
- [ ] Homepage UI
- [ ] Pricing Page UI
- [ ] DB schema and seed
- [ ] Stripe checkout
- [ ] Stripe webhooks
- [ ] Paywall
- [ ] User Settings
- [ ] SMTP Setup + Templates
- [ ] Notification Emails
