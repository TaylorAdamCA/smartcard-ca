import { ShoppingCart, Plane, ShoppingBag, Fuel, Train, Receipt, Utensils, Truck } from 'lucide-react';
import './SpendingSummary.css';

const CATEGORY_ICONS = {
    groceries: ShoppingCart,
    travel: Plane,
    shopping: ShoppingBag,
    gas: Fuel,
    transit: Train,
    recurring: Receipt,
    dining: Utensils,
    delivery: Truck,
};

const CATEGORY_COLORS = {
    groceries: '#27AE7A',
    travel: '#3B82F6',
    shopping: '#8B5CF6',
    gas: '#F59E0B',
    transit: '#EC4899',
    recurring: '#14B8A6',
    dining: '#EF4444',
    delivery: '#F97316',
    other: '#6B7280',
};

export function SpendingSummary({ spendProfile }) {
    const categories = Object.entries(spendProfile.categories)
        .filter(([_, data]) => data.total > 0)
        .sort((a, b) => b[1].total - a[1].total);

    // Calculate pie chart segments
    let cumulativePercentage = 0;
    const segments = categories.map(([category, data]) => {
        const start = cumulativePercentage;
        cumulativePercentage += data.percentage;
        return {
            category,
            percentage: data.percentage,
            start,
            color: CATEGORY_COLORS[category] || CATEGORY_COLORS.other,
        };
    });

    return (
        <div className="spending-summary card">
            <h3>Your Spending Summary</h3>

            <div className="summary-content">
                {/* Donut Chart */}
                <div className="donut-container">
                    <svg viewBox="0 0 100 100" className="donut-chart">
                        {segments.map((segment, i) => {
                            const offset = segment.start;
                            const dashArray = `${segment.percentage} ${100 - segment.percentage}`;
                            return (
                                <circle
                                    key={segment.category}
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={segment.color}
                                    strokeWidth="12"
                                    strokeDasharray={dashArray}
                                    strokeDashoffset={-offset + 25}
                                    style={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: '50% 50%',
                                    }}
                                />
                            );
                        })}
                    </svg>
                    <div className="donut-center">
                        <span className="donut-label">Total Spending</span>
                        <span className="donut-total">
                            ${spendProfile.grandTotal.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                    </div>
                </div>

                {/* Category List */}
                <div className="category-list">
                    {categories.map(([category, data]) => {
                        const Icon = CATEGORY_ICONS[category] || Receipt;
                        const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.other;

                        return (
                            <div key={category} className="category-row">
                                <div className="category-info">
                                    <div className="category-icon" style={{ background: `${color}15`, color }}>
                                        <Icon size={16} />
                                    </div>
                                    <div>
                                        <span className="category-name">{formatCategoryName(category)}</span>
                                        <span className="category-percent">{data.percentage.toFixed(1)}%</span>
                                    </div>
                                </div>
                                <span className="category-amount">
                                    ${data.total.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function formatCategoryName(category) {
    const names = {
        groceries: 'Groceries',
        travel: 'Travel & Hotels',
        shopping: 'General Shopping',
        gas: 'Gas & Fuel',
        transit: 'Transit & Transportation',
        recurring: 'Recurring Bills',
        dining: 'Dining & Restaurants',
        delivery: 'Food Delivery',
        other: 'Other',
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}
