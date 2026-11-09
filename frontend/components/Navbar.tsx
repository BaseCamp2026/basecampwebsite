'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBasecamp } from '@/lib/store';
import ConnectModal from './ConnectModal';
import BasecampLogo from './BasecampLogo';
import { 
  Calendar, 
  Users, 
  Info, 
  Mail, 
  ShieldAlert, 
  User, 
  Menu, 
  X, 
  Ticket, 
  CheckCircle2, 
  Compass,
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, currentRole, setCurrentRole } = useBasecamp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' },
    { name: 'Community', href: '/community' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-bc-border/80 bg-bc-black/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group">
            <BasecampLogo size="sm" withGlow animated />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-bc-white bg-bc-surface border border-bc-border'
                      : 'text-bc-muted hover:text-bc-white hover:bg-bc-surface/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Connect CTA + Role Switcher + Passes */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Connect CTA Button (Replaces password login screen with frictionless connect form) */}
            <button
              onClick={() => setConnectModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-bc-surface hover:bg-bc-card-hover border border-bc-border hover:border-bc-red/60 text-white transition-all shadow-sm"
              title="Connect with your details to RSVP"
            >
              <Sparkles className="w-3.5 h-3.5 text-bc-red" />
              <span>Connect</span>
            </button>

            {/* Demo Role Switcher Dropdown (Mounted safe) */}
            {mounted && (
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-bc-surface border border-bc-border hover:border-bc-red/50 text-bc-white transition-colors"
                  title="Switch user perspective"
                >
                  <span className="text-bc-muted">Role:</span>
                  <span className={`font-semibold ${
                    currentRole === 'ADMIN' ? 'text-bc-red' : currentRole === 'MEMBER' ? 'text-blue-400' : 'text-bc-muted'
                  }`}>
                    {currentRole}
                  </span>
                  <ChevronDown className="w-3 h-3 text-bc-muted" />
                </button>

                {roleDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 rounded-xl bg-bc-surface border border-bc-border shadow-2xl p-2 z-50"
                    onMouseLeave={() => setRoleDropdownOpen(false)}
                  >
                    <div className="text-[11px] font-mono text-bc-muted px-2 py-1 uppercase tracking-wider">
                      Test Perspective
                    </div>
                    <button
                      onClick={() => { setCurrentRole('VISITOR'); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-2 text-xs rounded-lg hover:bg-bc-card-hover text-bc-white flex items-center justify-between"
                    >
                      <span>Public Visitor</span>
                      {currentRole === 'VISITOR' && <CheckCircle2 className="w-3.5 h-3.5 text-bc-red" />}
                    </button>
                    <button
                      onClick={() => { setCurrentRole('MEMBER'); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-2 text-xs rounded-lg hover:bg-bc-card-hover text-bc-white flex items-center justify-between"
                    >
                      <span>Community Member</span>
                      {currentRole === 'MEMBER' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                    <button
                      onClick={() => { setCurrentRole('ADMIN'); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-2 text-xs rounded-lg hover:bg-bc-card-hover text-bc-white flex items-center justify-between"
                    >
                      <span className="text-bc-red font-semibold">Organizer / Admin</span>
                      {currentRole === 'ADMIN' && <CheckCircle2 className="w-3.5 h-3.5 text-bc-red" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Passes Link */}
            {mounted && currentUser && (
              <Link
                href="/account/registrations"
                className="p-2 rounded-lg bg-bc-surface hover:bg-bc-card-hover border border-bc-border text-bc-muted hover:text-bc-white transition-colors"
                title="My Passes & Tickets"
              >
                <Ticket className="w-4 h-4 text-bc-red" />
              </Link>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setConnectModalOpen(true)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-bc-red text-white"
            >
              Connect
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-bc-surface border border-bc-border text-bc-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-bc-border bg-bc-surface p-4 space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-bc-white hover:bg-bc-card-hover"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-bc-border flex flex-col gap-2">
              <Link
                href="/account/registrations"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 rounded-lg bg-bc-card-hover text-bc-white text-xs font-medium"
              >
                My Registrations & Tickets
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Connect Modal */}
      <ConnectModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </>
  );
}
