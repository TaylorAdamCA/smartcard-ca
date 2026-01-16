import { useState } from 'react';
import { AlertTriangle, ChevronDown, Check } from 'lucide-react';
import { CATEGORIES } from './merchantCategories';
import './CategoryTuner.css';

export function CategoryTuner({ ambiguousTransactions, onConfirm, onCancel }) {
    const grouped = groupByMerchant(ambiguousTransactions);

    const [corrections, setCorrections] = useState(() => {
        const initial = {};
        Object.entries(grouped).forEach(([merchant, data]) => {
            initial[merchant] = data.suggestedCategory;
        });
        return initial;
    });

    const [openDropdown, setOpenDropdown] = useState(null);

    const handleCategoryChange = (merchant, category) => {
        setCorrections(prev => ({ ...prev, [merchant]: category }));
        setOpenDropdown(null);
    };

    const handleConfirm = () => {
        onConfirm(corrections);
    };

    return (
        <div className="tuner-container">
            <div className="tuner-header">
                <div className="tuner-icon">
                    <AlertTriangle size={24} />
                </div>
                <h2>Quick Verification Needed</h2>
                <p>
                    We found some merchants that could be categorized differently.
                    Please verify these top {Object.keys(grouped).length} merchants.
                </p>
            </div>

            <div className="merchants-list">
                {Object.entries(grouped).map(([merchant, data]) => (
                    <div key={merchant} className="merchant-row">
                        <div className="merchant-info">
                            <div className="merchant-badge">?</div>
                            <div>
                                <span className="merchant-name">{merchant}</span>
                                <span className="merchant-meta">
                                    {data.count} transaction{data.count > 1 ? 's' : ''} • ${data.total.toFixed(0)}
                                </span>
                            </div>
                        </div>

                        <div className="category-dropdown-container">
                            <button
                                className="category-dropdown-btn"
                                onClick={() => setOpenDropdown(openDropdown === merchant ? null : merchant)}
                            >
                                <span>Currently: {formatCategoryName(corrections[merchant])}</span>
                                <ChevronDown size={16} className={openDropdown === merchant ? 'open' : ''} />
                            </button>

                            {openDropdown === merchant && (
                                <div className="category-dropdown-menu">
                                    {data.possibleCategories.map(cat => (
                                        <button
                                            key={cat}
                                            className={`dropdown-option ${corrections[merchant] === cat ? 'selected' : ''}`}
                                            onClick={() => handleCategoryChange(merchant, cat)}
                                        >
                                            {formatCategoryName(cat)}
                                            {corrections[merchant] === cat && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn-primary" onClick={handleConfirm}>
                <Check size={18} />
                Confirm & See Results
            </button>
        </div>
    );
}

function groupByMerchant(transactions) {
    const grouped = {};

    transactions.forEach(tx => {
        const key = tx.description.toUpperCase().trim();
        if (!grouped[key]) {
            grouped[key] = {
                count: 0,
                total: 0,
                possibleCategories: tx.possibleCategories || [CATEGORIES.GROCERIES, CATEGORIES.SHOPPING],
                suggestedCategory: tx.category || CATEGORIES.GROCERIES,
            };
        }
        grouped[key].count++;
        grouped[key].total += Math.abs(tx.amount);
    });

    return grouped;
}

function formatCategoryName(category) {
    const names = {
        [CATEGORIES.GROCERIES]: 'Groceries',
        [CATEGORIES.GAS]: 'Gas & Fuel',
        [CATEGORIES.DINING]: 'Dining',
        [CATEGORIES.SHOPPING]: 'Shopping',
        [CATEGORIES.TRAVEL]: 'Travel',
        [CATEGORIES.TRANSIT]: 'Transit',
        [CATEGORIES.RECURRING]: 'Bills',
        [CATEGORIES.ENTERTAINMENT]: 'Entertainment',
        [CATEGORIES.DELIVERY]: 'Delivery',
        [CATEGORIES.OTHER]: 'Other',
    };
    return names[category] || category;
}
