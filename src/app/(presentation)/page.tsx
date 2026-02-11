export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section - Simple for testing */}
      <section className="hero-section">
        <div className="section-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Safety Equipment Tracking
              <span className="hero-title-highlight"> Made Simple</span>
            </h1>
            <p className="hero-description">
              Track assets, manage inspections, and ensure compliance across all
              your locations. Built for HSE professionals who demand
              reliability.
            </p>
            <div className="hero-actions">
              <a href="/demo" className="btn-primary-large">
                Request Demo
              </a>
              <a href="/features" className="btn-secondary-large">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Simple content section for testing */}
      <section className="content-section">
        <div className="section-container">
          <div className="section-header centered">
            <h2>Everything You Need</h2>
            <p>Comprehensive tools for modern safety management</p>
          </div>

          <div className="features-preview">
            <div className="feature-card-simple">
              <h3>Asset Management</h3>
              <p>
                Track all safety equipment with detailed specifications and
                status updates.
              </p>
            </div>
            <div className="feature-card-simple">
              <h3>Inspection Workflows</h3>
              <p>
                Digital checklists, photo documentation, and automated
                scheduling.
              </p>
            </div>
            <div className="feature-card-simple">
              <h3>Compliance Ready</h3>
              <p>
                Generate audit reports instantly with complete inspection
                history.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
