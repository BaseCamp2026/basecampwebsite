import React from 'react';
import Link from 'next/link';
import BasecampLogo from './BasecampLogo';
import { Compass, Mail, MapPin, Heart, ArrowUpRight } from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-bc-border/80 bg-bc-black text-bc-white relative overflow-hidden">
      
      {/* Top red glow accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-bc-red to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <BasecampLogo size="sm" withGlow animated />
            </Link>

            <p className="text-sm text-bc-muted leading-relaxed max-w-sm">
              Basecamp is an open community that brings people together to learn, connect, collaborate, and build. 
              <span className="text-bc-white font-medium"> Not limited to students</span> — welcoming founders, engineers, creators, and tinkerers of all paths.
            </p>

            <div className="flex items-center gap-3 pt-2 text-bc-muted">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-bc-surface border border-bc-border hover:border-bc-red/50 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-bc-surface border border-bc-border hover:border-bc-red/50 hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-bc-surface border border-bc-border hover:border-bc-red/50 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <Link 
                href="/contact" 
                className="p-2 rounded-lg bg-bc-surface border border-bc-border hover:border-bc-red/50 hover:text-white transition-colors"
                aria-label="Email Organizers"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-bc-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-bc-muted">
              <li>
                <Link href="/events" className="hover:text-bc-white transition-colors flex items-center gap-1">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/events?format=IN_PERSON" className="hover:text-bc-white transition-colors">
                  In-Person Workshops
                </Link>
              </li>
              <li>
                <Link href="/events?format=ONLINE" className="hover:text-bc-white transition-colors">
                  Online Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-bc-white transition-colors">
                  Community Guilds
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bc-white transition-colors">
                  Community Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Participate */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-bc-white mb-4">
              Participate
            </h4>
            <ul className="space-y-2.5 text-sm text-bc-muted">
              <li>
                <Link href="/community" className="hover:text-bc-white transition-colors">
                  Join the Community
                </Link>
              </li>
              <li>
                <Link href="/account/registrations" className="hover:text-bc-white transition-colors">
                  My Registrations & Passes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-bc-white transition-colors">
                  Host or Speak at Basecamp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-bc-white transition-colors">
                  Partner / Sponsor Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Headquarters & Timezone */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-bc-white mb-4">
              Presence
            </h4>
            <div className="space-y-3 text-xs text-bc-muted leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bc-red shrink-0 mt-0.5" />
                <span>Basecamp Hub: Bengaluru, Karnataka (Global chapters emerging)</span>
              </div>
              <div className="flex items-start gap-2">
                <Compass className="w-4 h-4 text-bc-muted shrink-0 mt-0.5" />
                <span>Official Timezone: <strong className="text-bc-white font-mono">Asia/Kolkata (IST)</strong></span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-bc-surface border border-bc-border text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Hub Open & Active
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-bc-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bc-muted">
          <div>
            © {new Date().getFullYear()} Basecamp Community Platform. Built with open principles.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">Code of Conduct</Link>
            <Link href="/about" className="hover:text-white transition-colors">Privacy & Data</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
