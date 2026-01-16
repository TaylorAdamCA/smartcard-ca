import { RotateCcw, ExternalLink, Check } from 'lucide-react';
import { SpendingSummary } from './SpendingSummary';
import { CARD_DATABASE } from '../data/cardDatabase';
import './ResultsView.css';

export function ResultsView({
    spendProfile,
    recommendations,
    currentCard,
    showYear1,
    onToggleValueMode,
    onStartOver
}) {
    const currentCardData = currentCard ? CARD_DATABASE.find(c => c.id === currentCard) : null;
    const currentCardRec = currentCard ? recommendations.find(r => r.cardId === currentCard) : null;

    return (
        <div className="results-view animate-fade-in">
            <div className="results-header">
                <div>
                    <h2>Your Card Recommendations</h2>
                    <p className="results-sub">
                        Based on your ${spendProfile.grandTotal.toLocaleString('en-CA', { maximumFractionDigits: 0 })} in analyzed spending
                    </p>
                </div>
                <button className="toggle-btn" onClick={onToggleValueMode}>
                    <RotateCcw size={14} />
                    Showing {showYear1 ? 'Year 1' : '5-Year'} Value
                </button>
            </div>

            {/* Spending Breakdown */}
            <SpendingSummary spendProfile={spendProfile} />

            {/* Top Cards Section */}
            <section className="top-cards-section">
                <h3>Top Cards For You</h3>

                <div className="card-recommendations">
                    {recommendations.slice(0, 5).map((rec, index) => {
                        const card = CARD_DATABASE.find(c => c.id === rec.cardId);
                        if (!card) return null;

                        const isCurrentCard = rec.cardId === currentCard;
                        const vsCurrent = currentCardRec && !isCurrentCard
                            ? rec.netValue - currentCardRec.netValue
                            : null;

                        let badge = null;
                        if (index === 0) badge = { label: 'Best Match', color: 'emerald' };
                        else if (index === 1) badge = { label: 'Runner Up', color: 'slate' };
                        else if (index === 2) badge = { label: 'Strong Option', color: 'slate' };
                        if (isCurrentCard) badge = { label: 'Your Current Card', color: 'muted' };

                        return (
                            <div key={rec.cardId} className={`recommendation-card ${isCurrentCard ? 'current' : ''}`}>
                                {badge && (
                                    <div className={`card-badge badge-${badge.color}`}>
                                        {badge.label}
                                    </div>
                                )}

                                <div className="card-main">
                                    <div className="card-left">
                                        <div className="issuer-badge">
                                            {getIssuerAbbrev(card.issuer)}
                                        </div>
                                        <div className="card-info">
                                            <h4>{card.name}</h4>
                                            <span className="card-meta">
                                                {card.issuer} • ${card.annualFee}/year
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-value">
                                        <span className="value-label">{showYear1 ? 'Year 1' : '5-Year'} Value</span>
                                        <span className="value-amount">
                                            ${rec.netValue.toLocaleString('en-CA', { maximumFractionDigits: 0 })}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-features">
                                    {getCardFeatures(card).map((feature, i) => (
                                        <span key={i} className="feature-tag">
                                            <Check size={12} />
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="card-footer">
                                    {vsCurrent !== null && vsCurrent > 0 && (
                                        <span className="vs-current positive">
                                            +${vsCurrent.toLocaleString('en-CA', { maximumFractionDigits: 0 })} vs current
                                        </span>
                                    )}
                                    <a
                                        href="#"
                                        className="learn-more-btn"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Learn More <ExternalLink size={14} />
                                    </a>
                                </div>

                                {/* Where You'd Earn More - for top card */}
                                {index === 0 && (
                                    <div className="earnings-breakdown">
                                        <h5>Where You'd Earn More</h5>
                                        <div className="earnings-grid">
                                            {getTopCategories(spendProfile, card).map(({ category, rate, extra }) => (
                                                <div key={category} className="earning-item">
                                                    <span className="earning-category">{category}</span>
                                                    <span className="earning-rate">{rate}% back</span>
                                                    <span className="earning-extra">+${extra}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            <button className="btn-secondary" onClick={onStartOver}>
                <RotateCcw size={16} />
                Start Over
            </button>
        </div>
    );
}

function getIssuerAbbrev(issuer) {
    const abbrevs = {
        'American Express': 'AM',
        'TD': 'TD',
        'Scotiabank': 'SC',
        'BMO': 'BM',
        'CIBC': 'CI',
        'RBC': 'RB',
        'Rogers': 'RG',
        'Simplii': 'SI',
    };
    return abbrevs[issuer] || issuer.substring(0, 2).toUpperCase();
}

function getCardFeatures(card) {
    const features = [];

    if (card.annualFee === 0) features.push('No annual fee');
    if (card.annualFee > 0 && card.annualFee <= 120) features.push(`$${card.annualFee}/year`);

    // Find best multiplier
    const multipliers = card.multipliers || {};
    const best = Object.entries(multipliers).sort((a, b) => b[1] - a[1])[0];
    if (best) features.push(`${best[1]}x on ${best[0]}`);

    if (card.welcomeBonus) features.push('Strong welcome offer');

    return features.slice(0, 3);
}

function getTopCategories(spendProfile, card) {
    const result = [];
    const multipliers = card.multipliers || {};

    Object.entries(spendProfile.categories)
        .filter(([_, data]) => data.total > 0)
        .sort((a, b) => b[1].total - a[1].total)
        .slice(0, 4)
        .forEach(([category, data]) => {
            const rate = multipliers[category] || card.baseMultiplier || 1;
            const extra = Math.round(data.total * (rate - 1) * (card.pointValue || 0.01));
            if (extra > 0) {
                result.push({
                    category: formatCat(category),
                    rate: (rate * (card.pointValue || 0.01) * 100).toFixed(1),
                    extra,
                });
            }
        });

    return result;
}

function formatCat(cat) {
    const names = {
        groceries: 'Groceries',
        travel: 'Travel',
        shopping: 'Shopping',
        gas: 'Gas',
        transit: 'Transit',
        recurring: 'Bills',
        dining: 'Dining',
        delivery: 'Delivery',
    };
    return names[cat] || cat;
}
