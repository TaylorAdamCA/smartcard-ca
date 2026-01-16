import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import './CardSelector.css';

export function CardSelector({ cards, selectedCard, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedCardData = cards.find(c => c.id === selectedCard);

    return (
        <div className="card-selector">
            <label className="selector-label">What's your current credit card?</label>

            <div className="selector-dropdown" onClick={() => setIsOpen(!isOpen)}>
                <span className={selectedCard ? 'selected' : 'placeholder'}>
                    {selectedCardData ? selectedCardData.name : 'Select your card...'}
                </span>
                <ChevronDown size={20} className={`chevron ${isOpen ? 'open' : ''}`} />
            </div>

            {isOpen && (
                <div className="selector-options">
                    <div
                        className={`selector-option ${!selectedCard ? 'active' : ''}`}
                        onClick={() => { onSelect(null); setIsOpen(false); }}
                    >
                        <span className="option-name">I don't have a card / Skip</span>
                    </div>
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className={`selector-option ${selectedCard === card.id ? 'active' : ''}`}
                            onClick={() => { onSelect(card.id); setIsOpen(false); }}
                        >
                            <div className="option-badge">{getIssuerAbbrev(card.issuer)}</div>
                            <div className="option-details">
                                <span className="option-name">{card.name}</span>
                                <span className="option-meta">
                                    {card.issuer} • ${card.annualFee}/year
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
