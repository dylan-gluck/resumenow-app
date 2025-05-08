# ResumeNow

![Version](https://img.shields.io/badge/version-0.0.2-blue.svg)
![Framework](https://img.shields.io/badge/framework-SvelteKit%202-FF3E00.svg)
![Svelte](https://img.shields.io/badge/svelte-5.0.0-FF3E00.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)
![PNPM](https://img.shields.io/badge/pnpm-9.15.4-orange.svg)

ResumeNow is an intelligent resume tailoring and job application platform that helps job seekers maximize their chances of landing interviews. It automatically customizes resumes for specific job postings, streamlines the application process, and provides interview preparation tools.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Resume Structure](#resume-structure)
- [Form Implementation](#form-implementation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Smart Resume Tailoring**: Upload your master resume once and let our system customize it for each job application.
- **Automated Job Applications**: Set your preferences and let the system handle job searching and application submissions.
- **Interview Preparation**: Get company insights, potential questions, and tailored talking points for interviews.
- **Comprehensive Resume Builder**: Create detailed resumes with sections for:
  - Contact information
  - Professional summary
  - Education history
  - Work experience
  - Technical skills
  - Projects
  - Open source contributions
  - Certifications
  - Publications and conferences
  - Languages
  - Volunteer work
  - Interests and references

## Technology Stack

- **Frontend**:
  - [SvelteKit 2](https://kit.svelte.dev/): Next-generation Svelte framework
  - [Svelte 5](https://svelte.dev/): Modern reactive UI framework with new runes API
  - [TypeScript](https://www.typescriptlang.org/): Type-safe JavaScript
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework
  - [Shadcn UI](https://ui.shadcn.com/): Component library built with Tailwind

- **Backend**:
  - [Supabase](https://supabase.com/): Postgres database, authentication, and storage
  - [SvelteKit API routes](https://kit.svelte.dev/docs/routing): Server-side route handlers

- **Form Management**:
  - [SuperForms](https://superforms.rocks/): Type-safe form library for SvelteKit
  - [Zod](https://zod.dev/): TypeScript-first schema validation

- **Payments**:
  - [Stripe](https://stripe.com/): Payment processing platform

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/resumenow.git
cd resumenow/app
```

2. **Install dependencies**

This project uses PNPM as the package manager:

```bash
pnpm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in the values:

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PUBLIC_STRIPE_KEY=your_stripe_public_key
```

4. **Set up the database**

```bash
pnpm supabase init
pnpm supabase start
```

## Development

1. **Start the development server**

```bash
pnpm dev
```

This will start a local development server at http://localhost:5173.

2. **Building for production**

```bash
pnpm build
```

3. **Preview the production build**

```bash
pnpm preview
```

4. **Other useful commands**

```bash
pnpm check     # Run TypeScript type checking
pnpm format    # Format code with Prettier
pnpm lint      # Run ESLint and Prettier checks
```

## Project Structure

```
app/
├── src/
│   ├── app.css          # Global CSS
│   ├── app.html         # App template
│   ├── lib/             # Shared components and utilities
│   │   ├── components/  # Reusable UI components
│   │   │   ├── logo/    # Logo components
│   │   │   ├── resume-form/ # Resume form components
│   │   │   │   ├── fields/  # Form fields
│   │   │   │   └── sections/ # Resume sections
│   │   │   └── ui/     # UI components from shadcn
│   │   ├── hooks/      # Custom Svelte hooks
│   │   ├── types/      # TypeScript types
│   │   └── utils.ts    # Utility functions
│   └── routes/         # SvelteKit routes
│       ├── (marketing)/ # Marketing pages
│       ├── app/        # App routes (authenticated)
│       └── auth/       # Authentication routes
├── static/             # Static assets
├── supabase/           # Supabase configuration
│   └── migrations/     # Database migrations
├── README.md           # Project documentation
└── package.json        # Project dependencies
```

## Resume Structure

The resume structure is defined using TypeScript interfaces:

- `ContactInfo`: Name, email, phone, address, social profiles
- `Education`: Institution, degree, field of study, graduation details
- `WorkExperience`: Company, position, dates, responsibilities, technologies
- `Skill`: Name, proficiency level, years of experience
- `TechnicalSkills`: Programming languages, frameworks, databases, tools
- `Project`: Name, description, technologies, links, achievements
- `Certification`: Name, issuer, dates, credential ID
- `OpenSourceContribution`: Project name, type, description, URL

## Form Implementation

ResumeNow uses SuperForms with Zod for form validation:

```typescript
// Basic form setup example
import { superForm } from 'sveltekit-superforms';
import { zodClient } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

// Inside component
const form = superForm(data.form, {
  validators: zodClient(formSchema),
  dataType: 'json'
});

const { form: formData, enhance } = form;
```

### Component Structure

Forms are organized hierarchically:

1. **Main Form Component**: `ResumeForm.svelte` - Primary wrapper
2. **Section Components**: Group related fields (e.g., `ContactSection.svelte`)
3. **Field Components**: Reusable form fields with type-safe binding

### Svelte 5 Features

The project uses Svelte 5's new features:

- `$state()` for reactive variables
- `$derived()` for computed values
- `$effect()` for side effects
- `$props()` for component props
- Snippets for content projection

## License

This project is licensed under the MIT License - see the LICENSE file for details.
