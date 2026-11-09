# Basecamp Community Website --- Product Requirements Document (PRD)

**Document version:** 1.0\
**Product:** Basecamp Community Platform\
**Status:** Product definition / implementation-ready baseline

------------------------------------------------------------------------

## 1. Product overview

Basecamp is an open community that brings people together to learn,
connect, collaborate, share ideas, and participate in workshops,
meetups, talks, networking sessions, and other community activities. It
is **not limited to students**. The platform should welcome students,
working professionals, founders, creators, educators, hobbyists, and
anyone interested in participating.

The website will be the community's central digital home. Visitors can
discover Basecamp, explore events, register or express interest, learn
about the community, and contact the organizers. Authenticated members
can manage their profiles and registrations. Administrators can manage
events, content, members, registrations, and website settings.

### Product goals

1.  Establish a recognizable, polished online identity for Basecamp.
2.  Make upcoming and past events easy to discover.
3.  Reduce manual event-registration and attendee-management work.
4.  Communicate that Basecamp is inclusive and open to a broad
    community.
5.  Give organizers a secure admin workspace to manage the platform.
6.  Deliver a fast, responsive, accessible experience with purposeful
    motion.

### Non-goals for the first release

-   A full social network with public member feeds or direct messaging.
-   Built-in video conferencing or course/LMS functionality.
-   Complex ticketing, seat maps, or multi-vendor payments.
-   Native iOS/Android apps.
-   Publicly exposing private member information.

------------------------------------------------------------------------

## 2. Brand and visual direction

Use the supplied Basecamp logo as the source of truth.

### Brand palette

The uploaded logo uses a near-black background, warm off-white mountain
lettering, and a vivid red inner peak. Use these as the foundation;
verify final values against the original design file before production.

  -----------------------------------------------------------------------
  Token                   Suggested value         Usage
  ----------------------- ----------------------- -----------------------
  `--bc-black`            `#080808`               Main backgrounds,
                                                  footer, dark sections

  `--bc-white`            `#F5F3EF`               Primary text on dark
                                                  backgrounds, light
                                                  surfaces

  `--bc-red`              `#F32936`               Primary CTA,
                                                  highlights, active
                                                  states

  `--bc-muted`            `#A7A5A2`               Secondary text

  `--bc-surface`          `#151515`               Cards and elevated dark
                                                  surfaces

  `--bc-border`           `#303030`               Dividers and card
                                                  borders
  -----------------------------------------------------------------------

Use red sparingly so it remains meaningful. Prefer high contrast,
generous spacing, strong typography, geometric shapes, and
mountain/route-inspired visual motifs. Avoid making every component red.

### Design principles

-   Bold, minimal, adventurous, welcoming, and community-first.
-   Logo remains clear and undistorted; never stretch or recolor it
    without approval.
-   Use the logo's angular mountain geometry as inspiration for section
    dividers, icons, and motion paths.
-   Use real community/event photography where available; avoid generic
    stock imagery as the primary identity.
-   Support dark-first styling while ensuring any light surfaces remain
    consistent with the brand.

### Motion and logo direction

-   Animate the mountain mark in a deliberate sequence: outer mountain
    strokes draw on, the red inner peak reveals, then the BASECAMP
    wordmark fades or tracks into place.
-   Use GSAP timelines for sequencing and ScrollTrigger for
    scroll-linked reveals.
-   Prefer a clean SVG recreation of the supplied logo for crisp,
    controllable path animation. Keep the original raster logo as a
    fallback.
-   If a sequence of logo frames is supplied, support frame-by-frame
    playback using an image sequence or sprite sheet. The current
    supplied asset is a single static logo image; it does not contain
    animation frames.
-   Provide a reduced-motion mode. When `prefers-reduced-motion` is
    enabled, show the static logo and remove non-essential motion.

------------------------------------------------------------------------

## 3. Target audiences and roles

  -----------------------------------------------------------------------
  Audience / role                     Needs
  ----------------------------------- -----------------------------------
  Public visitor                      Understand Basecamp, discover
                                      events, see community information,
                                      contact organizers

  Community member                    Create/update profile, register for
                                      events, review own registrations

  Event attendee                      Receive clear event details,
                                      registration confirmation, updates
                                      and cancellation information

  Content editor                      Update pages, FAQs, announcements,
                                      and event descriptions

  Event organizer                     Create events, manage
                                      registrations, check attendees in

  Super admin                         Manage roles, users, settings,
                                      audit activity, and all platform
                                      content
  -----------------------------------------------------------------------

A person may belong to more than one audience. Do not assume that every
member is a student.

------------------------------------------------------------------------

## 4. Product scope and information architecture

### Public website (`frontend/`)

1.  **Home**
    -   Animated Basecamp logo / hero.
    -   Short community introduction and clear value proposition.
    -   Primary actions: Explore Events, Join the Community.
    -   Featured and upcoming events.
    -   Community highlights, impact/statistics (only when verified),
        testimonials (with permission).
    -   Partner/sponsor strip when applicable.
    -   Footer with contact and social links.
2.  **About**
    -   Mission, vision, values, story, and community principles.
    -   Explain who can participate: students and non-students alike.
    -   Organizers/team profiles only with consent.
3.  **Events**
    -   Upcoming, past, and optionally featured events.
    -   Search and filters: category, date, format, location, audience.
    -   Event cards with date, title, format, location, and status.
    -   Pagination or load-more behavior.
4.  **Event detail**
    -   Title, description, schedule, venue/online link information,
        speakers, organizer, capacity, eligibility, registration
        deadline, and FAQs.
    -   Registration CTA and clear full/closed/cancelled states.
    -   Shareable event URL and social metadata.
5.  **Community / Join**
    -   Explain how to participate and community expectations.
    -   Join/signup CTA.
    -   Optional interest form for people not ready to create an
        account.
6.  **Contact**
    -   Contact form with validation, consent, spam protection, and
        success/error states.
    -   Public email/social links configured by admins.
7.  **Authentication**
    -   Sign up, sign in, sign out, password reset, email verification.
    -   Supabase Auth integration.
    -   Optional OAuth providers only after credentials and policy are
        configured.
8.  **Member area**
    -   Profile and preferences.
    -   My registrations and event status.
    -   Account/session controls.
9.  **System pages**
    -   404, unauthorized, maintenance, and generic error pages.

### Admin website (`admin/`)

-   Dashboard with operational summaries.
-   Event CRUD and event publishing workflow.
-   Registration list, search, filtering, export, and check-in.
-   Member management and role assignment (restricted).
-   Page/content management for selected public content.
-   Contact-message inbox or status management.
-   Site settings: branding assets, social links, contact details,
    navigation, and feature flags.
-   Audit log for important administrative actions.

### Backend (`backend/`)

-   REST API or typed RPC layer for business operations.
-   Supabase Auth token verification.
-   Prisma data access to Supabase PostgreSQL.
-   Validation, authorization, rate limiting, logging, and error
    handling.
-   Email notification integration behind a provider abstraction.
-   Background jobs for reminders and scheduled tasks when required.

------------------------------------------------------------------------

## 5. Functional requirements

Priority: **P0** = required for launch, **P1** = important next
increment, **P2** = later enhancement.

### Discovery and content

-   **FR-001 (P0):** Visitors can view the home, about, events, event
    details, and contact pages without signing in.
-   **FR-002 (P0):** Visitors can browse published events only.
-   **FR-003 (P0):** Visitors can search/filter events by supported
    attributes.
-   **FR-004 (P0):** Event detail pages have stable, shareable slugs.
-   **FR-005 (P1):** Past events can display galleries or recaps after
    media approval.
-   **FR-006 (P1):** Editors can manage FAQs and announcements through
    admin.

### Accounts and registration

-   **FR-010 (P0):** A visitor can register and sign in using Supabase
    Auth.
-   **FR-011 (P0):** A member can update their own profile.
-   **FR-012 (P0):** A signed-in member can register for an open event.
-   **FR-013 (P0):** The system prevents duplicate active registrations
    for the same member/event.
-   **FR-014 (P0):** The system enforces event capacity and registration
    deadline rules atomically on the server.
-   **FR-015 (P0):** Members can view their own registrations and
    statuses.
-   **FR-016 (P1):** Members can cancel a registration when the event's
    cancellation policy allows it.
-   **FR-017 (P1):** Waitlist support can be enabled per event.
-   **FR-018 (P1):** Email confirmation is sent after successful
    registration and for material event changes.

### Administration

-   **FR-020 (P0):** Admin users can create, edit, publish, unpublish,
    and cancel events.
-   **FR-021 (P0):** Admin users can view and manage registrations.
-   **FR-022 (P0):** Authorized organizers can check attendees in.
-   **FR-023 (P0):** Only authorized roles can access admin routes and
    privileged API operations.
-   **FR-024 (P0):** Admins can assign roles only if they have the
    required permission.
-   **FR-025 (P1):** Admins can export filtered registration data to
    CSV.
-   **FR-026 (P1):** Admins can manage homepage featured events and
    basic site content.
-   **FR-027 (P1):** Important admin actions are recorded in an audit
    log.

### Contact and communications

-   **FR-030 (P0):** Visitors can submit a contact message.
-   **FR-031 (P0):** The server validates and rate-limits contact
    submissions.
-   **FR-032 (P1):** Admins can mark messages as open, in progress, or
    resolved.
-   **FR-033 (P1):** Members can opt in to non-essential community
    updates; consent is stored.

------------------------------------------------------------------------

## 6. Core user journeys

### Journey A --- Discover and register

1.  Visitor opens the home page.
2.  Visitor selects Explore Events.
3.  Visitor filters events and opens an event detail page.
4.  Visitor signs in or creates an account if required.
5.  Visitor submits registration.
6.  Server validates event status, capacity, deadline, and duplicate
    registration.
7.  User sees a confirmation state and receives an email when email
    delivery is configured.

### Journey B --- Organizer publishes an event

1.  Authorized organizer signs in to admin.
2.  Organizer creates a draft event.
3.  Organizer adds event information, capacity, schedule, venue, and
    registration dates.
4.  Organizer previews the event.
5.  Organizer publishes it.
6.  Published event appears on the public events listing.

### Journey C --- Event check-in

1.  Organizer opens the event attendee list.
2.  Organizer searches for an attendee or scans a future QR credential.
3.  Organizer confirms identity and marks attendance.
4.  The system records check-in time and the admin actor.

------------------------------------------------------------------------

## 7. Content model and event lifecycle

### Event status

`DRAFT → PUBLISHED → COMPLETED`\
Alternative terminal/exception states: `CANCELLED`, `ARCHIVED`.

-   Draft events are private to authorized staff.
-   Published events are public and may accept registrations.
-   Completed events remain available as past-event content.
-   Cancelled events display a clear notice and stop new registrations.
-   Archived events are hidden from normal listings but retained for
    records.

### Registration status

`CONFIRMED`, `WAITLISTED`, `CANCELLED`, `ATTENDED`, `NO_SHOW`.

Registration state changes must be validated on the server. Do not rely
on client-side checks for capacity or eligibility.

### Required event fields

-   Title, slug, summary, description.
-   Category/tags.
-   Start/end date-time with timezone.
-   Format: in-person, online, or hybrid.
-   Venue/address or online joining instructions (private joining
    instructions must not be public).
-   Cover image and optional gallery.
-   Capacity, registration open/close timestamps, waitlist setting.
-   Audience/eligibility description (inclusive and explicit).
-   Organizer contact or internal owner.
-   Publication status.

------------------------------------------------------------------------

## 8. Non-functional requirements

-   **Performance:** Aim for Core Web Vitals in the "good" range;
    optimize images, fonts, scripts, and animation.
-   **Responsive:** Support mobile, tablet, laptop, and large desktop
    layouts.
-   **Accessibility:** Target WCAG 2.2 AA; keyboard support, semantic
    HTML, visible focus, alt text, contrast, reduced motion.
-   **Security:** Enforce server-side authorization, input validation,
    secure secrets, rate limits, and database access policies.
-   **Privacy:** Collect only necessary personal data; show clear
    consent and privacy information.
-   **Reliability:** Graceful error states, retries for safe transient
    operations, backups, and monitoring.
-   **SEO:** Server-render public pages where appropriate, canonical
    URLs, metadata, sitemap, robots rules, and structured event data
    where valid.
-   **Maintainability:** Shared types/contracts, linting, tests,
    documented environment variables, and reproducible migrations.
-   **Observability:** Structured logs, error tracking, uptime
    monitoring, and operational alerts.

------------------------------------------------------------------------

## 9. Analytics and success measures

Track privacy-conscious events such as:

-   Event listing views and event detail views.
-   Search/filter usage.
-   Registration started/completed/cancelled.
-   Contact form submissions.
-   Admin event publication and check-in totals.

Suggested measures:

-   Event detail-to-registration conversion.
-   Registration completion rate.
-   Attendance vs. confirmed registrations.
-   Returning visitors and member retention.
-   Time taken by organizers to publish an event.
-   Contact response time.

Do not collect sensitive personal information for analytics. Define
consent and retention before enabling third-party analytics.

------------------------------------------------------------------------

## 10. Release plan

### MVP

-   Brand-led responsive public site.
-   About and contact pages.
-   Event listing and event detail pages.
-   Supabase Auth and member profile.
-   Event registration with capacity and duplicate protection.
-   Admin login, event management, registration management, and
    check-in.
-   Basic email confirmation.
-   Core SEO, accessibility, security, and analytics foundations.

### Release 1.1

-   Waitlists and cancellation workflow.
-   CSV export.
-   CMS-like homepage content and FAQs.
-   Contact-message management.
-   Audit log and richer admin dashboard.

### Future

-   QR check-in.
-   Event galleries and recaps.
-   Community directory with explicit member opt-in.
-   Calendar integrations.
-   Multi-chapter or multi-city community support.
-   Payments only if a real ticketing requirement is approved.

------------------------------------------------------------------------

## 11. Acceptance criteria for launch

-   Public pages work on supported mobile and desktop widths.
-   Visitors can find and open published events.
-   A member can register for an open event and see the resulting
    status.
-   Duplicate registrations are rejected safely.
-   Capacity cannot be exceeded under concurrent requests.
-   Admin permissions are enforced by the backend, not only by hidden
    UI.
-   Unauthorized users cannot access private event data or admin
    operations.
-   Admins can publish an event and see it on the public website.
-   Reduced-motion preferences are respected.
-   Forms have validation, accessible labels, and useful success/error
    states.
-   Production migrations can be applied from a clean database using
    documented commands.
-   No secrets are committed to source control.

------------------------------------------------------------------------

## 12. Assumptions and open decisions

The following must be confirmed before production:

1.  Official public contact email, social links, and community
    description.
2.  Whether registration requires an account or supports guest
    registration.
3.  Email provider and sender domain.
4.  Hosting provider and production domains.
5.  Whether events are free, paid, or mixed (payments are excluded from
    MVP).
6.  Who can approve event publication and assign admin roles.
7.  Privacy policy, terms, retention, and consent wording.
8.  Final logo source files (prefer SVG) and any individual animation
    frames.
9.  Whether Basecamp needs multiple chapters, locations, or organizer
    teams at launch.
