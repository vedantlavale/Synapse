# Synapse

A personal knowledge hub to capture, organize, and revisit your ideas. Save notes, links, and snippets in a private dashboard, then share selected content via a public link. Built for focus, speed, and simple sharing.

## Features

- **Personal Dashboard**: Securely store and manage your content (notes, links, snippets)
- **Content Organization**: Tag and categorize your knowledge base
- **Shareable Links**: Generate public links to share specific content collections
- **Responsive Design**: Modern UI built with Tailwind CSS and shadcn/ui
- **Authentication**: Email/password authentication with better-auth
- **Database**: PostgreSQL with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: better-auth
- **Database**: PostgreSQL, Prisma ORM
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (or npm/yarn)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vedantlavale/Synapse.git
cd Synapse
```

2. Install dependencies:
```bash
pnpm install
```

## Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Update the `.env` file with your values:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/synapse"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here-make-it-long-and-random"
BETTER_AUTH_URL="http://localhost:3000"

# Optional: Email configuration (if you want to enable email verification)
# EMAIL_FROM="noreply@yourdomain.com"
# EMAIL_HOST="smtp.gmail.com"
```

## Database Setup

1. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

2. Generate Prisma client:
```bash
npx prisma generate
```

## Running the Application

1. Start the development server:
```bash
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/sign-up/email` - User registration
- `POST /api/auth/sign-in/email` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session

### Content Management
- `GET /api/v1/content` - Fetch user's content
- `POST /api/v1/content` - Create new content
- `DELETE /api/v1/content` - Delete content

### Sharing
- `POST /api/v1/brain/share` - Generate shareable link
- `GET /api/v1/brain/share/[sharelink]` - Access shared content

## Project Structure

```
brainly-next/
├── .env.example                 # Environment variables template
├── AUTH_API.md                  # Authentication API documentation
├── components.json              # shadcn/ui configuration
├── eslint.config.mjs            # ESLint configuration
├── middleware.ts                # Next.js middleware
├── next-env.d.ts                # Next.js TypeScript declarations
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies and scripts
├── pnpm-lock.yaml               # pnpm lock file
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── app/                         # Next.js app directory
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication routes
│   │   │   └── [...all]/        # Better-auth catch-all route
│   │   │       └── route.ts
│   │   └── v1/                  # Version 1 API
│   │       ├── brain/           # Brain/share related APIs
│   │       │   └── share/       # Sharing functionality
│   │       │       ├── route.ts
│   │       │       └── [sharelink]/ # Dynamic share link route
│   │       │           └── route.ts
│   │       ├── content/         # Content management
│   │       │   └── route.ts
│   │       ├── debug-auth/      # Debug authentication
│   │       │   └── route.ts
│   │       └── test-session/    # Test session
│   │           └── route.ts
│   ├── brain/                   # Public brain pages
│   │   └── share/               # Shared content pages
│   │       └── [sharelink]/     # Dynamic share page
│   │           └── page.tsx
│   ├── dashboard/               # User dashboard
│   │   └── page.tsx
│   ├── login/                   # Login page
│   │   └── page.tsx
│   ├── signup/                  # Signup page
│   │   └── page.tsx
│   ├── favicon.ico              # Favicon
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                  # React components
│   ├── auth-provider.tsx        # Authentication provider
│   ├── content-card-new.tsx     # New content card component
│   ├── content-card.tsx         # Content card component
│   ├── signin-form.tsx          # Sign-in form
│   ├── signup-form.tsx          # Sign-up form
│   ├── dashboard/               # Dashboard components
│   │   ├── ContentGrid.tsx      # Content grid display
│   │   ├── ShareBrainDialog.tsx # Share dialog
│   │   └── Sidebar.tsx          # Dashboard sidebar
│   ├── dialogue/                # Dialog components
│   │   ├── Dialogue.tsx         # Generic dialogue
│   │   └── ShareBrainDialog.tsx # Share brain dialogue
│   ├── drawer/                  # Drawer components
│   │   └── LogOutDrawer.tsx     # Logout drawer
│   ├── navbar/                  # Navigation components
│   │   └── navbar.tsx           # Main navbar
│   └── ui/                      # UI components (shadcn/ui)
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── collapsible.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       └── tooltip.tsx
├── hooks/                       # Custom React hooks
│   ├── use-dashboard.ts         # Dashboard hook
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-responsive.ts        # Responsive design hook
├── lib/                         # Utility libraries
│   ├── auth-client.ts           # Authentication client
│   ├── auth.ts                  # Authentication utilities
│   └── utils.ts                 # General utilities
├── prisma/                      # Database schema and migrations
│   ├── migrations/              # Database migrations
│   │   ├── 20250831080304_init/
│   │   │   └── migration.sql
│   │   ├── 20250831083150_init/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma            # Prisma schema
├── public/                      # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── types/                       # TypeScript type definitions
    └── content.ts               # Content-related types
```

## Database Schema

The application uses the following main models:

- **User**: User accounts with authentication
- **Content**: User-created content (notes, links, snippets)
- **Tag**: Content tags for organization
- **Link**: Shareable links for content collections
- **Account/Session**: Authentication-related models (managed by better-auth)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

