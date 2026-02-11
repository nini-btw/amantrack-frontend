import Link from "next/link";
import Logo from "@/components/Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export function PresentationFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="presentation-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Logo />
            <p className="footer-description">
              Professional HSE safety equipment tracking and compliance
              management for modern organizations.
            </p>
            <div className="footer-contact">
              <a
                href="mailto:contact@amantrack.com"
                className="footer-contact-item"
              >
                <Mail size={16} />
                <span>contact@amantrack.com</span>
              </a>
              <a href="tel:+1234567890" className="footer-contact-item">
                <Phone size={16} />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>Oran, Algeria</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-links">
            <h4>Product</h4>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/demo">Request Demo</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/blog">Blog</Link>
          </div>

          {/* Support Links */}
          <div className="footer-links">
            <h4>Support</h4>
            <Link href="/docs">Documentation</Link>
            <Link href="/help">Help Center</Link>
            <Link href="/login">Sign In</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} AmanTrack. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
