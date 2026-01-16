import { useState } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { CATEGORIES } from './merchantCategories';
import './CategoryTuner.css';

/**
 * CategoryTuner - Modal for users to verify/correct ambiguous merchant categorizations.
 * Only shows merchants that the system flagged as ambiguous (e.g., Walmart, Costco).
 */
export function CategoryTuner({ ambiguousTransactions, onConfirm, onCancel }) {
    // Group transactions by merchant name for cleaner UI
    const groupedMerchants = groupByMerchant(ambiguousTransactions);

    const [corrections, setCorrections] = useState(() => {
        // Initialize with the default guessed category
        const initial = {};
        Object.keys(groupedMerchants).forEach(merchant => {
            initial[merchant] = groupedMerchants[merchant].category;
        });
        return initial;
    });

    const handleCategoryChange = (merchant, newCategory) => {
        setCorrections(prev => ({ ...prev, [merchant]: newCategory }));
    };

    const handleConfirm = () => {
        // Return corrections map to parent
        onConfirm(corrections);
    };

    if (Object.keys(groupedMerchants).length === 0) {
        // No ambiguous merchants, auto-proceed
        onConfirm({});
        return null;
    }

    return (
        <div className="tuner-overlay">
            <div className="tuner-modal">
                <div className="tuner-header">
                    <AlertTriangle size={24} className="warning-icon" />
                    <div>
                        <h2>Verify Categories</h2>
                        <p>Some merchants could be in different categories. Please confirm:</p>
                    </div>
                </div>

                <div className="merchants-list">
                    {Object.entries(groupedMerchants).map(([merchant, data]) => (
                        <div key={merchant} className="merchant-row">
                            <div className="merchant-info">
                                <span className="merchant-name">{merchant}</span>
                                <span className="merchant-amount">
                                    ${data.total.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                    <span className="tx-count">({data.count} txn{data.count > 1 ? 's' : ''})</span>
                                </span>
                            </div>

                            <div className="category-options">
                                {data.possibleCategories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`category-btn ${corrections[merchant] === cat ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(merchant, cat)}
                                    >
                                        {formatCategoryName(cat)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="tuner-footer">
                    <button className="btn-ghost" onClick={onCancel}>
                        <X size={18} />
                        Cancel
                    </button>
                    <button className="btn-primary-sm" onClick={handleConfirm}>
                        <Check size={18} />
                        Confirm & Analyze
                    </button>
                </div>
            </div>
        </div>
    );
}

// Group transactions by normalized merchant name and sum totals
function groupByMerchant(transactions) {
    const groups = {};

    transactions.forEach(tx => {
        // Normalize merchant name (basic: uppercase, trim)
        const key = tx.description.toUpperCase().trim();

        if (!groups[key]) {
            groups[key] = {
                category: tx.category,
                possibleCategories: tx.possibleCategories,
                total: 0,
                count: 0,
            };
        }
        groups[key].total += tx.amount;
        groups[key].count += 1;
    });

    // Sort by total spend descending
    return Object.fromEntries(
        Object.entries(groups).sort((a, b) => b[1].total - a[1].total)
    );
}

function formatCategoryName(cat) {
    // "groceries" -> "Groceries"
    return cat.charAt(0).toUpperCase() + cat.slice(1);
}
