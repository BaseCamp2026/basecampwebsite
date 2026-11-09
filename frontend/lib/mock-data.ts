import { EventItem, Profile, Registration, ContactMessage, AuditLog } from './types';

export const INITIAL_USER: Profile = {
  id: 'usr-001',
  displayName: 'Aarav Sharma',
  email: 'aarav@basecamp.community',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Systems software engineer & weekend trail explorer. Building distributed systems and learning Rust.',
  role: 'MEMBER',
  occupation: 'Senior Software Engineer',
  companyOrOrg: 'Distributed Labs',
  marketingOptIn: true,
  createdAt: '2026-01-15T09:30:00Z',
  updatedAt: '2026-03-01T12:00:00Z',
};

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-101',
    title: 'Autonomous AI Agents: Architecture, Tooling & Production Deployment',
    slug: 'autonomous-ai-agents-workshop',
    summary: 'A hands-on, deep-dive workshop exploring multi-agent orchestrations, MCP protocols, and low-latency agentic loops.',
    description: `Join us for an intensive in-depth workshop on modern agentic AI systems. We will build, evaluate, and deploy autonomous agents capable of complex tool invocation, background task dispatch, and self-healing error correction.\n\nWhether you are a seasoned software engineer, an indie maker, a researcher, or an ambitious student, you will leave with functional architectures running in your local sandbox.\n\nPrerequisites: Familiarity with TypeScript or Python. Laptops required. Coffee, snacks, and high-speed Wi-Fi provided!`,
    category: 'AI & Systems',
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    format: 'IN_PERSON',
    status: 'PUBLISHED',
    venueName: 'Basecamp Central Hub, Floor 4',
    venueAddress: '108 Indiranagar Main Rd, 100ft Road, Bengaluru, Karnataka 560038',
    startsAt: '2026-11-21T14:00:00+05:30',
    endsAt: '2026-11-21T18:30:00+05:30',
    timezone: 'Asia/Kolkata',
    registrationOpensAt: '2026-11-01T00:00:00+05:30',
    registrationClosesAt: '2026-11-20T23:59:00+05:30',
    capacity: 65,
    confirmedCount: 58,
    waitlistCount: 4,
    waitlistEnabled: true,
    audienceDescription: 'Open to software developers, ML researchers, technical founders, and advanced students. Anyone with code literacy is welcome.',
    speakers: [
      {
        name: 'Dr. Devika Rao',
        role: 'Staff AI Research Scientist',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        bio: 'Devika leads autonomous systems research with over 15 papers in agent communication protocols.'
      },
      {
        name: 'Karan Mehra',
        role: 'Co-founder & CTO @ SynthFlow',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        bio: 'Karan scales AI inference pipelines handling over 40M daily tool executions.'
      }
    ],
    schedule: [
      { time: '14:00 - 14:30', title: 'Arrival, Specialty Pour-overs & Setup' },
      { time: '14:30 - 15:45', title: 'Part 1: Protocol Design & MCP Standards in Practice', speaker: 'Dr. Devika Rao' },
      { time: '15:45 - 16:15', title: 'Break: Community Networking & Brainstorming' },
      { time: '16:15 - 17:45', title: 'Part 2: Hands-on Building: Autonomous Code Agents', speaker: 'Karan Mehra' },
      { time: '17:45 - 18:30', title: 'Demos, Lightning Q&A & Mixer' }
    ],
    faqs: [
      { question: 'Do I need to be a student or affiliated with an institution?', answer: 'No! Basecamp is open to everyone: working professionals, founders, hobbyists, career pivoters, and students.' },
      { question: 'What hardware/software do I need to bring?', answer: 'Bring a laptop with Node.js 20+ and Python 3.11+ installed. Docker is recommended.' },
      { question: 'Is there a fee to attend?', answer: 'No. Basecamp community workshops are free and community-supported.' }
    ],
    featured: true,
    createdById: 'usr-admin-1',
    publishedAt: '2026-11-01T10:00:00Z',
    createdAt: '2026-10-25T11:00:00Z',
    updatedAt: '2026-11-02T14:30:00Z'
  },
  {
    id: 'evt-102',
    title: 'High-Throughput Systems in Rust: From Zero to Microsecond Latencies',
    slug: 'high-throughput-systems-in-rust',
    summary: 'Master memory management, asynchronous runtime tuning with Tokio, and lock-free data structures.',
    description: `Explore the power of memory safety without garbage collection overhead. In this session, we dissect real-world high-frequency messaging pipelines, zero-copy deserialization with Cap'n Proto / rkyv, and hardware cache efficiency.\n\nExpect live code profiling, assembly walkthroughs, and practical concurrency patterns that apply whether you write database engines or web services.`,
    category: 'Rust & Systems',
    coverImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    format: 'HYBRID',
    status: 'PUBLISHED',
    venueName: 'Basecamp Tech Arena & Global Stream',
    venueAddress: '74 Koramangala 4th Block, Bengaluru / Discord Live Stage',
    startsAt: '2026-11-28T16:00:00+05:30',
    endsAt: '2026-11-28T19:00:00+05:30',
    timezone: 'Asia/Kolkata',
    registrationOpensAt: '2026-11-05T00:00:00+05:30',
    registrationClosesAt: '2026-11-27T23:59:00+05:30',
    capacity: 100,
    confirmedCount: 76,
    waitlistCount: 0,
    waitlistEnabled: true,
    audienceDescription: 'Backend engineers, infrastructure architects, systems tinkerers, and developers curious about Rust.',
    speakers: [
      {
        name: 'Tanya Sengupta',
        role: 'Core Contributor @ AsyncRust',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        bio: 'Tanya specializes in zero-copy network engines and low-level kernel interfaces.'
      }
    ],
    schedule: [
      { time: '16:00 - 16:20', title: 'Stream Check & Physical Welcome' },
      { time: '16:20 - 17:30', title: 'Deep Dive: Memory Layout, SIMD & Cache locality' },
      { time: '17:30 - 18:30', title: 'Building a 1M QPS UDP Packet Collector' },
      { time: '18:30 - 19:00', title: 'Panel Q&A & Community Discussion' }
    ],
    faqs: [
      { question: 'Will the recording and slides be shared?', answer: 'Yes! Registered attendees receive links to repo samples and full video recording within 24 hours.' }
    ],
    featured: true,
    createdById: 'usr-admin-1',
    publishedAt: '2026-11-05T12:00:00Z',
    createdAt: '2026-10-28T09:00:00Z',
    updatedAt: '2026-11-05T12:00:00Z'
  },
  {
    id: 'evt-103',
    title: 'Basecamp Founders & Creators Summit: Building Resilient Ventures',
    slug: 'founders-and-creators-summit',
    summary: 'Unvarnished stories, unit economics, distribution flywheels, and customer discovery from early-stage builders.',
    description: `Basecamp isn't just about code—it's about building things that matter. Join 120+ founders, solo operators, creative directors, and bootstrappers for an evening of candid fireside discussions, teardowns of real go-to-market strategies, and direct networking without vanity pitching.`,
    category: 'Founders & Startups',
    coverImageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80',
    format: 'IN_PERSON',
    status: 'PUBLISHED',
    venueName: 'The Glasshouse Rooftop',
    venueAddress: 'Lavelle Road, Shanthala Nagar, Bengaluru, Karnataka 560001',
    startsAt: '2026-12-05T17:30:00+05:30',
    endsAt: '2026-12-05T21:30:00+05:30',
    timezone: 'Asia/Kolkata',
    registrationOpensAt: '2026-11-10T00:00:00+05:30',
    registrationClosesAt: '2026-12-04T18:00:00+05:30',
    capacity: 120,
    confirmedCount: 94,
    waitlistCount: 12,
    waitlistEnabled: true,
    audienceDescription: 'Founders, side-project makers, product designers, operators, and early-stage team members.',
    speakers: [
      {
        name: 'Arjun Nambiar',
        role: 'General Partner @ Basecamp Ventures & Founder @ AlpineOps',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        bio: 'Built AlpineOps from zero to $12M ARR without traditional institutional seed.'
      },
      {
        name: 'Maya Krishnan',
        role: 'Design Director & Brand Strategist',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Advises early stage products on storytelling, visual distinction, and positioning.'
      }
    ],
    schedule: [
      { time: '17:30 - 18:15', title: 'Welcome Drinks & Curated Matchmaking' },
      { time: '18:15 - 19:15', title: 'Fireside: The 0 to 1 Slog Nobody Posts on LinkedIn', speaker: 'Arjun Nambiar' },
      { time: '19:15 - 20:00', title: 'Design Teardown: Why Your Landing Page Fails to Convert', speaker: 'Maya Krishnan' },
      { time: '20:00 - 21:30', title: 'Open Rooftop Dinner & Connections' }
    ],
    faqs: [
      { question: 'Is this only for tech startups?', answer: 'Not at all. We celebrate craft businesses, indie products, agencies, creators, and hardware tinkerers.' }
    ],
    featured: true,
    createdById: 'usr-admin-1',
    publishedAt: '2026-11-06T10:00:00Z',
    createdAt: '2026-10-30T14:00:00Z',
    updatedAt: '2026-11-06T10:00:00Z'
  },
  {
    id: 'evt-104',
    title: 'The Great Sunrise Trail & Wilderness Mixer: Nandi Hills Expedition',
    slug: 'sunrise-trail-and-wilderness-mixer',
    summary: 'Disconnect from screens, hike together at dawn, catch the sunrise above the clouds, and discuss ideas over breakfast.',
    description: `Basecamp draws deep inspiration from mountains and outdoor discovery. This is our monthly community trek! We meet before dawn, hike scenic trails together, watch the sunrise, and enjoy a traditional South Indian breakfast at the basecamp trailhead.\n\nGreat conversations happen on trails. All fitness levels welcome. Carpooling coordinated in our community forum.`,
    category: 'Community & Outdoors',
    coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
    format: 'IN_PERSON',
    status: 'PUBLISHED',
    venueName: 'Nandi Hills Basecamp Trailhead',
    venueAddress: 'Nandi Hills Trail Parking, Chikkaballapur District, Karnataka',
    startsAt: '2026-12-12T05:00:00+05:30',
    endsAt: '2026-12-12T10:30:00+05:30',
    timezone: 'Asia/Kolkata',
    registrationOpensAt: '2026-11-12T00:00:00+05:30',
    registrationClosesAt: '2026-12-10T18:00:00+05:30',
    capacity: 40,
    confirmedCount: 38,
    waitlistCount: 8,
    waitlistEnabled: true,
    audienceDescription: 'Everyone welcome! Moderate hike of approximately 4.5 km. Bring comfortable walking shoes and water.',
    speakers: [],
    schedule: [
      { time: '05:00 - 05:15', title: 'Meetup at Base Trailhead & Warm-up Stretches' },
      { time: '05:15 - 06:15', title: 'Trail Ascent (Paced groups for all fitness levels)' },
      { time: '06:15 - 07:15', title: 'Sunrise Viewing, Meditation & Mountain Coffee' },
      { time: '07:15 - 08:30', title: 'Descent through Pine Valley' },
      { time: '08:30 - 10:00', title: 'Community Breakfast & Story Sharing' }
    ],
    faqs: [
      { question: 'What should I bring?', answer: 'Water bottle (min 1.5L), comfortable shoes, a light jacket (mornings are chilly), and a backpack.' }
    ],
    featured: false,
    createdById: 'usr-admin-1',
    publishedAt: '2026-11-08T09:00:00Z',
    createdAt: '2026-11-01T15:00:00Z',
    updatedAt: '2026-11-08T09:00:00Z'
  },
  {
    id: 'evt-105',
    title: 'Full-Stack Modern Web Architecture: Next.js 15, React 19 & Edge Compute',
    slug: 'full-stack-modern-web-nextjs-15',
    summary: 'Deep dive into React Server Components, Server Actions, Edge caching, and streaming UI with minimal client bundle size.',
    description: `A technical deep-dive into creating blazing-fast web applications. We examine practical pitfalls of server components, effective state strategies, edge database drivers, and multi-region deployment architectures.`,
    category: 'Web & Architecture',
    coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    format: 'ONLINE',
    status: 'PUBLISHED',
    onlineJoinUrl: 'https://meet.basecamp.community/tech-deep-dive',
    startsAt: '2026-12-16T19:00:00+05:30',
    endsAt: '2026-12-16T21:30:00+05:30',
    timezone: 'Asia/Kolkata',
    registrationOpensAt: '2026-11-01T00:00:00+05:30',
    registrationClosesAt: '2026-12-16T18:00:00+05:30',
    capacity: 250,
    confirmedCount: 182,
    waitlistCount: 0,
    waitlistEnabled: false,
    audienceDescription: 'Web developers, frontend engineers, fullstack specialists, and engineering managers.',
    speakers: [
      {
        name: 'Rohan Deshmukh',
        role: 'Principal Engineer @ Veloce Labs',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        bio: 'Full-stack architect and maintainer of modern open-source UI libraries.'
      }
    ],
    schedule: [
      { time: '19:00 - 19:15', title: 'Welcome & Stream Overview' },
      { time: '19:15 - 20:15', title: 'RSC Mental Model & Streaming SSR in Production' },
      { time: '20:15 - 21:00', title: 'Optimistic Mutations & Edge Cache Invalidation' },
      { time: '21:00 - 21:30', title: 'Live Architecture Critique & Q&A' }
    ],
    faqs: [],
    featured: false,
    createdById: 'usr-admin-1',
    publishedAt: '2026-11-02T10:00:00Z',
    createdAt: '2026-10-29T10:00:00Z',
    updatedAt: '2026-11-02T10:00:00Z'
  },
  {
    id: 'evt-106',
    title: 'Open Source Saturday: Collaborative Build Day & Mentorship',
    slug: 'open-source-saturday-build-day',
    summary: 'Bring your laptop, join an existing open-source project or start a new repository with peers and experienced maintainers.',
    description: `An unhurried Saturday devoted to collaborative hacking, peer code reviews, documentation refinement, and shipping meaningful open-source software. Organizers will be present to help beginners make their first PR and help senior engineers explore ambitious prototypes.`,
    category: 'Open Source',
    coverImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    format: 'IN_PERSON',
    status: 'PUBLISHED',
    venueName: 'Basecamp Open Studio',
    venueAddress: 'Indiranagar 12th Main, Bengaluru, Karnataka',
    startsAt: '2026-12-19T10:30:00+05:30',
    endsAt: '2026-12-19T17:00:00+05:30',
    timezone: 'Asia/Kolkata',
    registrationOpensAt: '2026-11-15T00:00:00+05:30',
    registrationClosesAt: '2026-12-18T23:59:00+05:30',
    capacity: 50,
    confirmedCount: 32,
    waitlistCount: 0,
    waitlistEnabled: true,
    audienceDescription: 'All experience levels welcome. Open to hobbyists, students, senior architects, and curious minds.',
    speakers: [],
    schedule: [
      { time: '10:30 - 11:00', title: 'Standup: What Are You Building Today?' },
      { time: '11:00 - 13:30', title: 'Hack Session 1 & Pairing' },
      { time: '13:30 - 14:30', title: 'Community Lunch (Pizza & Salad)' },
      { time: '14:30 - 16:30', title: 'Hack Session 2 & Maintainer Office Hours' },
      { time: '16:30 - 17:00', title: 'Show & Tell (5-min Lightning Demos)' }
    ],
    faqs: [],
    featured: false,
    createdById: 'usr-admin-1',
    publishedAt: '2026-11-09T08:00:00Z',
    createdAt: '2026-11-04T12:00:00Z',
    updatedAt: '2026-11-09T08:00:00Z'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-001',
    eventId: 'evt-101',
    profileId: 'usr-001',
    userName: 'Aarav Sharma',
    userEmail: 'aarav@basecamp.community',
    status: 'CONFIRMED',
    registeredAt: '2026-11-03T11:20:00Z',
    ticketCode: 'BC-AI-88329',
  },
  {
    id: 'reg-002',
    eventId: 'evt-103',
    profileId: 'usr-001',
    userName: 'Aarav Sharma',
    userEmail: 'aarav@basecamp.community',
    status: 'CONFIRMED',
    registeredAt: '2026-11-07T14:45:00Z',
    ticketCode: 'BC-FND-49102',
  },
  {
    id: 'reg-003',
    eventId: 'evt-101',
    profileId: 'usr-002',
    userName: 'Priya Sundaram',
    userEmail: 'priya.s@techcorp.io',
    status: 'CONFIRMED',
    registeredAt: '2026-11-02T09:12:00Z',
    checkedInAt: '2026-11-21T14:05:00+05:30',
    checkedInBy: 'usr-admin-1',
    ticketCode: 'BC-AI-90211',
  },
  {
    id: 'reg-004',
    eventId: 'evt-101',
    profileId: 'usr-003',
    userName: 'Vikram Joshi',
    userEmail: 'v.joshi@startup.co',
    status: 'CONFIRMED',
    registeredAt: '2026-11-02T16:40:00Z',
    ticketCode: 'BC-AI-55104',
  },
  {
    id: 'reg-005',
    eventId: 'evt-101',
    profileId: 'usr-004',
    userName: 'Ananya Pillai',
    userEmail: 'ananya@designlead.com',
    status: 'WAITLISTED',
    registeredAt: '2026-11-08T18:22:00Z',
    ticketCode: 'BC-AI-WL-01',
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-001',
    name: 'Siddharth Roy',
    email: 'sid.roy@frontierlabs.dev',
    subject: 'Proposing a Workshop on WebAssembly Compilers',
    message: 'Hey Basecamp team! I would love to conduct an in-person, 3-hour weekend masterclass on writing miniature compiler backends to WebAssembly. I lead Wasm runtime tooling at Frontier. Let me know if you have open speaking slots in December!',
    status: 'OPEN',
    createdAt: '2026-11-08T14:15:00Z'
  },
  {
    id: 'msg-002',
    name: 'Rachel Wong',
    email: 'rachel@creativedesign.sg',
    subject: 'Visiting Bangalore - Want to Host a Design Jam',
    message: 'Hello! I am a product design director visiting Bangalore from Singapore for two weeks in early December. Is it possible to host a cross-discipline design and systems jam at Basecamp?',
    status: 'IN_PROGRESS',
    createdAt: '2026-11-07T09:30:00Z'
  },
  {
    id: 'msg-003',
    name: 'Harish Babu',
    email: 'harish@indiehardware.in',
    subject: 'Question on Attendance for Non-Students',
    message: 'Hi organizers, I just wanted to double check if the events are open for independent consultants and 40+ professionals? Glad to see the website mentions everyone is welcome!',
    status: 'RESOLVED',
    createdAt: '2026-11-06T18:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    actorId: 'usr-admin-1',
    actorName: 'Elena Vance (Lead Admin)',
    action: 'EVENT_PUBLISHED',
    resource: 'Event',
    resourceId: 'evt-106',
    metadata: { title: 'Open Source Saturday: Collaborative Build Day' },
    createdAt: '2026-11-09T08:00:00Z'
  },
  {
    id: 'aud-002',
    actorId: 'usr-admin-1',
    actorName: 'Elena Vance (Lead Admin)',
    action: 'CAPACITY_UPDATED',
    resource: 'Event',
    resourceId: 'evt-101',
    metadata: { oldCapacity: 50, newCapacity: 65 },
    createdAt: '2026-11-06T11:45:00Z'
  },
  {
    id: 'aud-003',
    actorId: 'usr-admin-1',
    actorName: 'Elena Vance (Lead Admin)',
    action: 'ATTENDEE_CHECK_IN',
    resource: 'Registration',
    resourceId: 'reg-003',
    metadata: { attendee: 'Priya Sundaram', event: 'evt-101' },
    createdAt: '2026-11-05T14:05:00Z'
  }
];
