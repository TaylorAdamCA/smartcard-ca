import { Shield, Wifi, Lock, ChevronRight } from 'lucide-react';
import './LandingHero.css';

export function LandingHero({ onGetStarted }) {
    return (
        <section className="landing-hero">
            <div className="hero-content">
                {/* Logo Badge */}
                <div className="hero-logo-badge">
                    <div className="logo-icon-small">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                    </div>
                    <span>SmartCard CA</span>
                </div>

                {/* Main Headline */}
                <h1 className="hero-headline">
                    Stop Guessing.<br />
                    <span className="gradient-text">Start Earning.</span>
                </h1>

                {/* Subheadline */}
                <p className="hero-subheadline">
                    Upload your bank statements and discover exactly which credit card pays
                    you the most — based on your actual spending, not estimates.
                </p>

                {/* CTA Button */}
                <button className="hero-cta" onClick={onGetStarted}>
                    Analyze My Spending
                    <ChevronRight size={20} />
                </button>

                {/* Trust Badges */}
                <div className="trust-badges">
                    <div className="trust-badge">
                        <Lock size={14} />
                        <span>100% Private</span>
                    </div>
                    <div className="trust-badge">
                        <Wifi size={14} />
                        <span>Works Offline</span>
                    </div>
                    <div className="trust-badge">
                        <Shield size={14} />
                        <span>Data Never Leaves Your Browser</span>
                    </div>
                </div>
            </div>

            {/* Background Credit Card Images */}
            <div className="hero-cards-bg">
                <div className="card-image card-left"></div>
                <div className="card-image card-right"></div>
            </div>
        </section>
    );
}
