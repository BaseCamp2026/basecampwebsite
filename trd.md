# Basecamp Community Website --- Technical Requirements Document (TRD)

**Document version:** 1.0\
**Architecture:** TypeScript monorepo with separate `frontend`,
`backend`, and `admin` applications\
**Database:** Supabase-managed PostgreSQL\
**ORM and migrations:** Prisma ORM + Prisma Migrate

------------------------------------------------------------------------

## 1. Technical overview

Build Basecamp as a maintainable three-application platform:

``` text
basecamp/
├── frontend/       # Public website and member experience
├── backend/        # API, business logic, Prisma schema and migrations
├── admin/          # Private organizer/admin dashboard
├── packages/
│   ├── contracts/  # Shared API types, schemas, enums
│   ├── ui/         # Optional shared UI primitives
│   └── config/     # Shared lint/TypeScript configuration
├── docs/
├── package.json
└── README.md
```

The three requested top-level folders remain distinct. Shared packages
are optional but recommended to avoid duplicated contracts and design
tokens.

### Recommended stack

  -----------------------------------------------------------------------
  Layer                               Technology
  ----------------------------------- -----------------------------------
  Language                            TypeScript

  Public frontend                     Next.js (App Router) + React

  Admin frontend                      Next.js (separate app) + React

  Styling                             Tailwind CSS + CSS variables

  Animation                           GSAP + ScrollTrigger

  3D / WebGL                          Three.js, optionally React Three
                                      Fiber and Drei

  UI animation                        Framer Motion for small state
                                      transitions; avoid competing
                                      animation ownership

  Backend                             Node.js + NestJS (or Fastify if a
                                      smaller service is preferred)

  API contract                        REST + OpenAPI; Zod validation

  Database                            Supabase PostgreSQL

  ORM                                 Prisma

  Migrations                          Prisma Migrate

  Authentication                      Supabase Auth

  File storage                        Supabase Storage

  Email                               Resend/Postmark or another approved
                                      transactional provider

  Testing                             Vitest, React Testing Library,
                                      Playwright

  Quality                             ESLint, Prettier, TypeScript strict
                                      mode

  Monitoring                          Sentry or equivalent + structured
                                      server logs
  -----------------------------------------------------------------------

**Important:** Supabase and Prisma have different responsibilities.
Supabase hosts PostgreSQL, Auth, and Storage. Prisma connects to the
Supabase PostgreSQL database for typed queries and schema migrations. Do
not use Prisma as a replacement for Supabase Auth.

------------------------------------------------------------------------

## 2. Application boundaries

### `frontend/` --- public site and member experience

Responsibilities:

-   Public marketing pages, event discovery, event detail pages.
-   Signup/signin/reset-password screens using Supabase Auth.
-   Member profile and registration history.
-   Responsive layouts and SEO metadata.
-   Calls backend API for protected business operations.
-   Uses Supabase browser/client SDK only for approved Auth flows and
    public storage access; privileged database writes go through
    backend.

Suggested structure:

``` text
frontend/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── events/page.tsx
│   │   ├── events/[slug]/page.tsx
│   │   ├── community/page.tsx
│   │   └── contact/page.tsx
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   └── reset-password/page.tsx
│   ├── account/
│   │   ├── profile/page.tsx
│   │   └── registrations/page.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── brand/
│   ├── navigation/
│   ├── events/
│   ├── forms/
│   ├── motion/
│   └── ui/
├── lib/
│   ├── api-client.ts
│   ├── supabase/
│   ├── seo/
│   └── config.ts
├── public/
│   ├── images/
│   └── brand/
├── tests/
├── package.json
└── tsconfig.json
```

### `backend/` --- API and domain logic

Responsibilities:

-   REST endpoints and business rules.
-   Verify Supabase access tokens.
-   Authorize users and roles on every protected operation.
-   Prisma schema, generated client, and migration history.
-   Event publishing, registration, capacity, waitlist, check-in.
-   Contact form processing and notification dispatch.
-   Audit logging, rate limiting, validation, and error mapping.

Suggested structure:

``` text
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── guards/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   └── validation/
│   ├── auth/
│   ├── users/
│   ├── events/
│   ├── registrations/
│   ├── contact/
│   ├── uploads/
│   ├── notifications/
│   ├── audit/
│   └── health/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── test/
├── package.json
└── .env.example
```

### `admin/` --- admin and organizer dashboard

Responsibilities:

-   Separate admin application and route space.
-   Dashboard, event editor, attendee/registration management.
-   Check-in, content settings, member/role administration.
-   Uses the same backend API and shared contracts.
-   Does not connect directly to the database using a privileged key.

Suggested structure:

``` text
admin/
├── app/
│   ├── login/page.tsx
│   ├── (dashboard)/
│   │   ├── page.tsx
│   │   ├── events/page.tsx
│   │   ├── events/new/page.tsx
│   │   ├── events/[id]/page.tsx
│   │   ├── registrations/page.tsx
│   │   ├── members/page.tsx
│   │   ├── messages/page.tsx
│   │   ├── content/page.tsx
│   │   └── settings/page.tsx
│   └── layout.tsx
├── components/
├── lib/
│   ├── api-client.ts
│   └── auth/
├── public/
├── tests/
└── package.json
```

------------------------------------------------------------------------

## 3. System architecture

``` text
Browser
  ├── frontend (public/member Next.js app)
  └── admin (admin Next.js app)
          |
          | HTTPS + Supabase access token
          v
      backend API
          ├── Auth token verification (Supabase)
          ├── Role/permission checks
          ├── Input validation + business rules
          ├── Prisma Client
          |       |
          |       v
          |   Supabase PostgreSQL
          ├── Supabase Storage (signed upload/read URLs)
          └── Email provider
```

### Key rules

1.  Browser clients must never receive the Supabase service-role key or
    database password.
2.  The backend verifies the Supabase JWT and then loads the
    application's user/role record.
3.  Every privileged endpoint performs server-side authorization.
4.  Prisma is used in the backend only; frontend/admin do not import
    Prisma Client.
5.  Supabase Row Level Security (RLS) should be enabled on tables
    exposed through Supabase APIs. Backend database access via Prisma
    uses a database connection and must still enforce application
    authorization. Do not assume RLS automatically protects a direct
    privileged database connection.
6.  Use a pooled connection string for runtime/serverless traffic and a
    direct connection string for Prisma migrations where required by the
    selected Supabase setup.

------------------------------------------------------------------------

## 4. Database design

Use UUID primary keys. Store timestamps in UTC (`timestamptz`) and
retain the event's IANA timezone (for example, `Asia/Kolkata`) for
display and schedule interpretation.

### Core entities

  Table                    Purpose
  ------------------------ ----------------------------------------------------------
  `profiles`               Application profile linked to Supabase Auth user ID
  `events`                 Event information, publication state, schedule, capacity
  `event_categories`       Event categories
  `event_category_links`   Many-to-many event/category relation
  `registrations`          Member-to-event registration and attendance status
  `contact_messages`       Public contact submissions
  `site_settings`          Controlled key/value website settings
  `pages`                  Editable content pages, if CMS-lite is enabled
  `announcements`          Community announcements
  `audit_logs`             Record of privileged administrative actions

### Relationship summary

-   One Supabase Auth user has one `Profile`.
-   One `Event` has many `Registrations`.
-   One `Profile` has many `Registrations`.
-   Events and categories have a many-to-many relationship.
-   An admin action may create one `AuditLog` record.

### Prisma schema baseline

The following is a starting point; refine field lengths, indexes, enums,
and deletion behavior during implementation.

``` prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum UserRole {
  MEMBER
  EDITOR
  ORGANIZER
  ADMIN
  SUPER_ADMIN
}

enum EventStatus {
  DRAFT
  PUBLISHED
  COMPLETED
  CANCELLED
  ARCHIVED
}

enum EventFormat {
  IN_PERSON
  ONLINE
  HYBRID
}

enum RegistrationStatus {
  CONFIRMED
  WAITLISTED
  CANCELLED
  ATTENDED
  NO_SHOW
}

model Profile {
  id          String   @id @db.Uuid // Must equal Supabase Auth user UUID
  displayName String   @map("display_name") @db.VarChar(120)
  email       String   @unique @db.VarChar(320)
  avatarUrl   String?  @map("avatar_url")
  bio         String?  @db.VarChar(500)
  role        UserRole @default(MEMBER)
  marketingOptIn Boolean @default(false) @map("marketing_opt_in")
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)

  registrations Registration[]

  @@map("profiles")
}

model Event {
  id                   String      @id @default(uuid()) @db.Uuid
  title                String      @db.VarChar(180)
  slug                 String      @unique @db.VarChar(200)
  summary              String      @db.VarChar(320)
  description          String
  coverImageUrl        String?     @map("cover_image_url")
  format               EventFormat
  status               EventStatus @default(DRAFT)
  venueName            String?     @map("venue_name") @db.VarChar(180)
  venueAddress         String?     @map("venue_address")
  onlineJoinUrl        String?     @map("online_join_url")
  startsAt             DateTime    @map("starts_at") @db.Timestamptz(6)
  endsAt               DateTime    @map("ends_at") @db.Timestamptz(6)
  timezone             String      @default("Asia/Kolkata") @db.VarChar(64)
  registrationOpensAt  DateTime?   @map("registration_opens_at") @db.Timestamptz(6)
  registrationClosesAt DateTime?   @map("registration_closes_at") @db.Timestamptz(6)
  capacity             Int?
  waitlistEnabled      Boolean     @default(false) @map("waitlist_enabled")
  audienceDescription  String?     @map("audience_description")
  publishedAt          DateTime?   @map("published_at") @db.Timestamptz(6)
  createdById          String      @map("created_by_id") @db.Uuid
  createdAt            DateTime    @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt            DateTime    @updatedAt @map("updated_at") @db.Timestamptz(6)

  registrations Registration[]

  @@index([status, startsAt])
  @@index([createdById])
  @@map("events")
}

model Registration {
  id         String             @id @default(uuid()) @db.Uuid
  eventId    String             @map("event_id") @db.Uuid
  profileId  String             @map("profile_id") @db.Uuid
  status     RegistrationStatus @default(CONFIRMED)
  registeredAt DateTime         @default(now()) @map("registered_at") @db.Timestamptz(6)
  checkedInAt DateTime?         @map("checked_in_at") @db.Timestamptz(6)
  checkedInBy String?           @map("checked_in_by") @db.Uuid
  updatedAt  DateTime           @updatedAt @map("updated_at") @db.Timestamptz(6)

  event   Event   @relation(fields: [eventId], references: [id], onDelete: Cascade)
  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)

  @@unique([eventId, profileId])
  @@index([eventId, status])
  @@index([profileId, registeredAt])
  @@map("registrations")
}

model ContactMessage {
  id        String   @id @default(uuid()) @db.Uuid
  name      String   @db.VarChar(120)
  email     String   @db.VarChar(320)
  subject   String?  @db.VarChar(180)
  message   String
  status    String   @default("OPEN") @db.VarChar(30)
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  @@index([status, createdAt])
  @@map("contact_messages")
}

model AuditLog {
  id          String   @id @default(uuid()) @db.Uuid
  actorId     String   @map("actor_id") @db.Uuid
  action      String   @db.VarChar(120)
  resource    String   @db.VarChar(80)
  resourceId  String?  @map("resource_id") @db.VarChar(100)
  metadata    Json?
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  @@index([actorId, createdAt])
  @@index([resource, resourceId])
  @@map("audit_logs")
}
```

**Schema notes**

-   `Profile.id` is the Supabase Auth UUID. Provision profile rows from
    a trusted server-side Auth webhook or a backend profile-provisioning
    flow.
-   Do not store passwords in `profiles`; Supabase Auth owns
    credentials.
-   The `createdById` and `checkedInBy` fields should be validated
    against existing profiles in application logic; add explicit
    relations if desired.
-   Use a dedicated enum for contact status in the production schema.
-   For event capacity, use a transaction and a concurrency-safe
    strategy (for example, a row lock or a database function) so
    simultaneous requests cannot exceed capacity.
-   Consider soft deletion or archival for records that must be retained
    for audit/legal purposes.

------------------------------------------------------------------------

## 5. Supabase setup

### Required Supabase services

1.  **PostgreSQL:** Main application database.
2.  **Auth:** Email/password and optional OAuth identity.
3.  **Storage:** Event covers, approved galleries, and profile avatars.
4.  **RLS:** Policies for any tables accessed through Supabase client
    APIs.
5.  **Backups:** Configure and test restore procedures appropriate to
    the Supabase plan.

### Storage buckets

Suggested buckets:

-   `event-covers` --- public read, organizer-only writes.
-   `event-gallery` --- public read only for published/approved assets;
    organizer-only writes.
-   `avatars` --- user-controlled access with strict path policies.

Validate MIME type, file size, extension, and ownership. Prefer signed
URLs for private objects. Never trust a client-provided file URL as
proof of authorization.

### Environment variables

Backend `.env.example`:

``` env
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://...pooled-connection..."
DIRECT_URL="postgresql://...direct-connection..."
SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
SUPABASE_ANON_KEY="YOUR_PUBLIC_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="SERVER_ONLY_SECRET"
SUPABASE_JWT_ISSUER="https://YOUR_PROJECT.supabase.co/auth/v1"
EMAIL_PROVIDER_API_KEY="SERVER_ONLY_SECRET"
FRONTEND_URL="http://localhost:3000"
ADMIN_URL="http://localhost:3001"
```

Frontend and admin should receive only the public Supabase URL and
anon/publishable key, plus their backend API base URL. Never prefix a
service-role key with `NEXT_PUBLIC_` or expose it to browser bundles.

Use separate development, staging, and production Supabase projects.
Store secrets in deployment secret management, not in Git.

------------------------------------------------------------------------

## 6. Prisma migrations and workflow

Prisma Migrate is the schema migration mechanism. Supabase dashboard
edits should not become an untracked parallel schema workflow.

### Initial setup

``` bash
cd backend
npm install prisma @prisma/client
npx prisma init
```

Configure `DATABASE_URL` for the runtime pooler and `DIRECT_URL` for the
direct database connection as supported by the Supabase project
configuration.

### Create and apply a migration in development

``` bash
npx prisma migrate dev --name init_basecamp
npx prisma generate
```

### Deploy migrations in staging/production

``` bash
npx prisma migrate deploy
npx prisma generate
```

### Inspect database

``` bash
npx prisma studio
```

### Migration rules

-   Commit `prisma/schema.prisma` and the complete `prisma/migrations/`
    directory.
-   Every schema change must have a reviewed migration.
-   Production uses `prisma migrate deploy`, never `migrate dev`.
-   Take/verify backups before risky production changes.
-   Prefer additive migrations, deploy compatible application code, then
    remove old fields in a later migration.
-   Do not edit an already-applied production migration.
-   Do not mix ad-hoc dashboard schema changes with Prisma-managed
    migrations.
-   Use a dedicated migration/CI database role with only the permissions
    required.
-   Test migrations against a clean database and a copy of
    production-like data before release.

------------------------------------------------------------------------

## 7. Authentication and authorization

### Authentication

-   Supabase Auth handles account creation, email verification, login,
    logout, password reset, and token refresh.
-   Frontend obtains the user's access token through the Supabase
    client.
-   Frontend sends `Authorization: Bearer <access_token>` to the
    backend.
-   Backend verifies token signature, issuer, audience, expiry, and
    claims using a maintained Supabase-compatible JWT verification
    approach.
-   Backend maps the verified subject (`sub`) to `Profile.id`.

### Authorization

Use role-based access control (RBAC):

  Role          Permissions
  ------------- -----------------------------------------------------------
  MEMBER        Manage own profile and own registrations
  EDITOR        Manage approved public content
  ORGANIZER     Create/manage assigned events and attendee lists
  ADMIN         Manage events, content, members, and operational settings
  SUPER_ADMIN   Manage roles, global settings, and all resources

Rules:

-   Default role is `MEMBER`.
-   Never accept a role value from a public signup request.
-   Role changes are restricted to authorized server-side operations.
-   Protect both UI routes and API endpoints; UI route guards alone are
    insufficient.
-   Consider event-level organizer assignment for least-privilege
    access.
-   Log role changes and sensitive admin operations.

------------------------------------------------------------------------

## 8. API design

Base path: `/api/v1`

Use JSON request/response bodies, consistent error envelopes,
pagination, and OpenAPI documentation.

### Public endpoints

  ----------------------------------------------------------------------------
  Method                  Endpoint                  Purpose
  ----------------------- ------------------------- --------------------------
  GET                     `/events`                 List published events;
                                                    supports
                                                    search/filter/pagination

  GET                     `/events/:slug`           Published event detail

  POST                    `/contact`                Submit contact message

  GET                     `/site-settings/public`   Return allowlisted public
                                                    settings
  ----------------------------------------------------------------------------

### Member endpoints

  -------------------------------------------------------------------------------------
  Method                  Endpoint                              Purpose
  ----------------------- ------------------------------------- -----------------------
  GET                     `/me`                                 Current member profile

  PATCH                   `/me`                                 Update allowed profile
                                                                fields

  GET                     `/me/registrations`                   Current member's
                                                                registrations

  POST                    `/events/:eventId/registrations`      Register for event

  DELETE                  `/events/:eventId/registrations/me`   Cancel own registration
                                                                if allowed
  -------------------------------------------------------------------------------------

### Admin endpoints

  -------------------------------------------------------------------------------------
  Method                  Endpoint                              Purpose
  ----------------------- ------------------------------------- -----------------------
  GET/POST                `/admin/events`                       List/create events

  GET/PATCH/DELETE        `/admin/events/:id`                   Read/update/archive
                                                                event

  POST                    `/admin/events/:id/publish`           Publish event

  GET                     `/admin/events/:id/registrations`     List attendees

  POST                    `/admin/registrations/:id/check-in`   Check in attendee

  GET                     `/admin/members`                      Search members

  PATCH                   `/admin/members/:id/role`             Change role with
                                                                elevated permission

  GET/PATCH               `/admin/contact-messages`             Manage contact messages

  GET                     `/admin/audit-logs`                   Review audit trail
  -------------------------------------------------------------------------------------

### API behavior

-   Validate all inputs with Zod or equivalent schemas.
-   Use cursor or page-based pagination with bounded page size.
-   Return `401` for unauthenticated requests and `403` for insufficient
    permissions.
-   Return `404` for missing resources; avoid leaking private resource
    existence.
-   Return `409` for duplicate registration or capacity conflict.
-   Return `422` for semantically invalid input.
-   Return `429` for rate limits.
-   Include request IDs in logs and error responses.
-   Do not return stack traces or secrets in production errors.

Example success response:

``` json
{
  "data": {
    "id": "event-uuid",
    "status": "CONFIRMED"
  }
}
```

Example error response:

``` json
{
  "error": {
    "code": "EVENT_FULL",
    "message": "This event has reached its registration limit.",
    "requestId": "request-id"
  }
}
```

------------------------------------------------------------------------

## 9. Registration concurrency and integrity

Registration is a critical business operation and must be handled
entirely on the backend.

Recommended flow:

1.  Verify member identity.
2.  Begin a database transaction.
3.  Lock the event row or call a database function that safely
    serializes capacity checks.
4.  Confirm event is published and registration window is open.
5.  Check whether the member already has an active registration.
6.  Count active confirmed registrations.
7.  If capacity remains, create `CONFIRMED`; otherwise create
    `WAITLISTED` only when enabled, or return `409 EVENT_FULL`.
8.  Commit.
9.  Dispatch confirmation email asynchronously after successful commit.

The unique constraint on `(event_id, profile_id)` prevents duplicate
rows, but status transitions must also be handled carefully. Test
concurrent requests with more clients than remaining seats.

------------------------------------------------------------------------

## 10. Frontend design system and animation implementation

### Design tokens

Centralize brand tokens in CSS variables and share them between frontend
and admin:

``` css
:root {
  --bc-black: #080808;
  --bc-white: #f5f3ef;
  --bc-red: #f32936;
  --bc-muted: #a7a5a2;
  --bc-surface: #151515;
  --bc-border: #303030;
  --radius-card: 18px;
  --content-width: 1200px;
}
```

Use accessible contrast and test the final palette. Red is an accent,
not the default background for large text areas.

### GSAP

Use GSAP for orchestrated sequences:

-   Logo intro timeline.
-   Hero title and CTA entrance.
-   ScrollTrigger reveals for selected sections.
-   Event card stagger animations.
-   Page transition only if it does not interfere with
    navigation/accessibility.

Implementation guidance:

-   Scope animations with `gsap.context()` in React effects.
-   Revert timelines and ScrollTriggers on component unmount.
-   Avoid animating layout-heavy properties; prefer `transform` and
    `opacity`.
-   Do not create duplicate ScrollTriggers during React development
    remounts.
-   Respect `prefers-reduced-motion`.

### Logo animation plan

Preferred production approach:

1.  Obtain an SVG version of the Basecamp logo or trace the supplied
    image into clean vector paths.
2.  Separate the outer off-white mountain, red inner peak, and wordmark
    into independent SVG groups.
3.  Animate outer mountain paths with `stroke-dasharray` /
    `stroke-dashoffset` or a masked reveal.
4.  Reveal the red peak after the outer mark begins drawing.
5.  Fade/track in the wordmark.
6.  Hold the complete logo, then transition into the homepage hero.

For supplied image frames:

-   Normalize frames to the same canvas dimensions and alignment.
-   Keep a consistent frame rate and preload the sequence.
-   Use a canvas/image-sequence renderer or sprite sheet if performance
    is better.
-   Provide a static fallback for low-power devices and reduced-motion
    users.

The currently attached image is a single raster logo, not a sequence.
The first implementation can recreate its visual elements as SVG; exact
frame-by-frame animation requires the additional frames.

### Three.js

Use Three.js only where 3D adds real value:

-   Optional subtle mountain/terrain-inspired hero scene.
-   Low-poly geometry or a restrained 3D contour environment.
-   Pointer response should be subtle and disabled on touch/low-power
    contexts where appropriate.

Performance constraints:

-   Lazy-load the 3D scene after the primary hero content.
-   Use compressed, low-poly assets and cap device pixel ratio.
-   Pause rendering when the scene is offscreen or tab is hidden.
-   Provide a CSS/static fallback when WebGL is unavailable.
-   Do not place essential text or navigation inside the WebGL canvas.
-   Avoid 3D on every page; reserve it for the home hero or a campaign
    section.

### Animation library policy

Use GSAP as the primary timeline/scroll animation engine, Three.js for
3D, and optionally Framer Motion for isolated UI state transitions.
Avoid having multiple libraries animate the same element.

------------------------------------------------------------------------

## 11. Security requirements

-   HTTPS in all deployed environments.
-   Secrets in server-side environment variables/secret manager only.
-   Supabase service-role key and database credentials are backend-only.
-   Verify JWTs on every protected backend request.
-   RBAC and resource ownership checks on the server.
-   RLS enabled and tested for client-accessible Supabase tables.
-   Validate and sanitize all user input.
-   Rate-limit login-sensitive auxiliary endpoints, contact submissions,
    and registration attempts.
-   Use CSRF protection where cookie-based sessions are used; configure
    CORS to known origins.
-   Set secure headers and a restrictive Content Security Policy
    compatible with required assets.
-   Restrict uploads by size, MIME type, extension, and authorization.
-   Avoid logging access tokens, passwords, private event URLs, or
    unnecessary personal data.
-   Keep dependencies patched and run dependency/security scanning in
    CI.
-   Apply data retention and deletion rules consistent with the
    published privacy policy.

------------------------------------------------------------------------

## 12. Testing strategy

### Unit tests

-   Event publication rules.
-   Registration eligibility and deadline rules.
-   Capacity and waitlist decision logic.
-   Role/permission policies.
-   Input validation and API error mapping.

### Integration tests

-   Prisma repository operations against a test PostgreSQL database.
-   Supabase JWT verification.
-   Registration transaction behavior.
-   Admin event creation and publication.
-   Contact form rate limiting.

### End-to-end tests (Playwright)

-   Public visitor browses events.
-   Member signs up/signs in.
-   Member registers and sees confirmation.
-   Duplicate registration is rejected.
-   Organizer creates and publishes an event.
-   Unauthorized member cannot open admin pages or call admin APIs.
-   Organizer checks in an attendee.
-   Contact form success and validation errors.
-   Mobile navigation and reduced-motion behavior.

### Visual and accessibility tests

-   Test common mobile/tablet/desktop breakpoints.
-   Keyboard-only navigation.
-   Focus visibility and form labels.
-   Contrast and reduced-motion checks.
-   Screenshot regression for homepage, events, event detail, and admin
    dashboard.

------------------------------------------------------------------------

## 13. Deployment and environments

Recommended environments:

-   **Local:** local app servers and a development Supabase project (or
    local Supabase stack).
-   **Staging:** production-like Supabase project, test email provider,
    protected staging domains.
-   **Production:** production Supabase project, verified sender domain,
    monitoring and backups.

Suggested deployment topology:

-   `frontend/` → Next.js hosting.
-   `admin/` → separate Next.js deployment or protected subdomain.
-   `backend/` → Node.js service/container.
-   Supabase → managed PostgreSQL, Auth, Storage.

Suggested domains:

-   `basecamp.example` --- public site.
-   `admin.basecamp.example` --- admin.
-   `api.basecamp.example` --- backend.

These are placeholders; configure actual domains before deployment.

### CI pipeline

1.  Install dependencies using the lockfile.
2.  Run formatting/lint checks.
3.  Run TypeScript checks.
4.  Run unit and integration tests.
5.  Build frontend, admin, and backend.
6.  For approved deployment, apply `prisma migrate deploy`.
7.  Deploy services.
8.  Run smoke tests and verify health endpoints.

Do not automatically run destructive database operations in deployment
pipelines.

------------------------------------------------------------------------

## 14. Observability and operations

-   `GET /health` for process health.
-   `GET /ready` for dependency readiness (database connectivity, etc.).
-   Structured JSON logs with request ID, route, status, and duration.
-   Error tracking with release/environment metadata.
-   Monitor API latency, 5xx rates, database pool saturation, email
    failures, and registration conflicts.
-   Set alerts for service downtime and repeated migration/deployment
    failures.
-   Document database backup and restore drills.
-   Keep an incident checklist and rollback plan.

------------------------------------------------------------------------

## 15. Implementation phases

### Phase 1 --- Foundation

-   Create monorepo and three applications.
-   Set up shared TypeScript/lint/style configuration.
-   Configure Supabase projects and environment variables.
-   Add Prisma schema, initial migration, and seed strategy.
-   Implement Auth token verification and RBAC.

### Phase 2 --- Public experience

-   Build design system and responsive navigation.
-   Implement logo animation and homepage.
-   Build About, Events, Event Detail, Community, and Contact pages.
-   Add SEO and accessibility foundations.

### Phase 3 --- Member and event operations

-   Implement profile and registration APIs.
-   Add capacity-safe registration transaction.
-   Build member registration dashboard.
-   Add email notifications.

### Phase 4 --- Admin

-   Build admin authentication/authorization shell.
-   Implement event CRUD and publishing.
-   Implement registration management and check-in.
-   Add member/content/settings tools and audit trail.

### Phase 5 --- Quality and launch

-   Automated test coverage.
-   Security review and RLS policy verification.
-   Performance, animation, and accessibility tuning.
-   Staging acceptance test.
-   Production migration and deployment runbook.

------------------------------------------------------------------------

## 16. Definition of done

A feature is complete only when:

-   Its requirements and permissions are documented.
-   UI works at supported breakpoints.
-   Server-side validation and authorization are implemented.
-   Loading, empty, success, and error states exist.
-   Tests cover core behavior and failure cases.
-   Accessibility and reduced-motion behavior are checked.
-   Logs do not expose secrets or unnecessary personal data.
-   Documentation and environment examples are updated.
-   Database changes include a reviewed Prisma migration.

------------------------------------------------------------------------

## 17. Open technical decisions

1.  Confirm whether NestJS or Fastify is preferred for the backend.
2.  Confirm whether frontend/admin should be separate Next.js
    deployments or a shared workspace.
3.  Select email provider and notification templates.
4.  Confirm whether guest event registration is required.
5.  Confirm if payments are ever needed; do not add payment complexity
    without a requirement.
6.  Confirm hosting provider, domain names, and CI platform.
7.  Obtain the original SVG logo and the promised animation frame
    sequence, if available.
8.  Confirm expected traffic, event capacity, and data retention
    requirements.
