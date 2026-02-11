"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

export function PresentationNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="presentation-nav">
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions desktop">
          <Link href="/login" className="btn-secondary">
            Sign In
          </Link>
          <Link href="/demo" className="btn-primary">
            Request Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="/features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>

          <div className="mobile-menu-actions">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-btn-secondary"
            >
              Sign In
            </Link>
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-btn-primary"
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
