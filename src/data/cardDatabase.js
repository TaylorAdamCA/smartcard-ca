/**
 * Canadian Credit Card Database
 * Contains reward structures, annual fees, and point valuations.
 * 
 * This is MVP data - in production this would be fetched from a backend
 * and updated regularly.
 */

export const CARD_DATABASE = [
    {
        id: 'amex-cobalt',
        name: 'American Express Cobalt',
        issuer: 'American Express',
        network: 'Amex',
        annualFee: 156, // $12.99/month
        welcomeBonus: {
            points: 50000,
            minSpend: 3000,
            months: 12,
        },
        rewardType: 'points', // 'points' | 'cashback'
        pointValue: 0.02, // 2 cents per point (conservative)
        multipliers: {
            groceries: 5,
            dining: 5,
            gas: 2,
            transit: 2,
            travel: 2,
            streaming: 3, // We'll map recurring to this or base
        },
        baseMultiplier: 1,
        category: 'premium',
        bestFor: ['groceries', 'dining'],
        notes: 'Best for food lovers. 5x on eats & drinks.',
    },
    {
        id: 'td-cashback-visa-infinite',
        name: 'TD Cash Back Visa Infinite',
        issuer: 'TD',
        network: 'Visa',
        annualFee: 139,
        welcomeBonus: {
            cashback: 100,
            minSpend: 500,
            months: 3,
        },
        rewardType: 'cashback',
        pointValue: 1, // Direct $
        multipliers: {
            groceries: 0.03, // 3%
            gas: 0.03,
            recurring: 0.03,
        },
        baseMultiplier: 0.01,
        category: 'cashback',
        bestFor: ['groceries', 'gas', 'recurring'],
        notes: '3% on groceries, gas, and recurring bills.',
    },
    {
        id: 'rogers-world-elite',
        name: 'Rogers World Elite Mastercard',
        issuer: 'Rogers',
        network: 'Mastercard',
        annualFee: 0, // No annual fee
        welcomeBonus: {
            cashback: 50,
            minSpend: 1000,
            months: 3,
        },
        rewardType: 'cashback',
        pointValue: 1,
        multipliers: {
            // Flat rate
        },
        baseMultiplier: 0.015, // 1.5% everywhere
        foreignTxMultiplier: 0.03, // Extra 3% on foreign (net positive after FX fee)
        category: 'no-fee',
        bestFor: ['shopping', 'other'],
        notes: 'Best no-fee card. 1.5% flat on everything.',
    },
    {
        id: 'scotiabank-gold-amex',
        name: 'Scotiabank Gold American Express',
        issuer: 'Scotiabank',
        network: 'Amex',
        annualFee: 150,
        welcomeBonus: {
            points: 40000,
            minSpend: 3000,
            months: 3,
        },
        rewardType: 'points',
        pointValue: 0.01, // Scene+ points
        multipliers: {
            groceries: 5,
            dining: 5,
            entertainment: 3,
            gas: 2,
            transit: 2,
        },
        baseMultiplier: 1,
        category: 'premium',
        bestFor: ['groceries', 'dining', 'entertainment'],
        notes: '5x on groceries and dining.',
    },
    {
        id: 'cibc-dividend-visa-infinite',
        name: 'CIBC Dividend Visa Infinite',
        issuer: 'CIBC',
        network: 'Visa',
        annualFee: 120,
        welcomeBonus: {
            cashback: 200,
            minSpend: 2500,
            months: 4,
        },
        rewardType: 'cashback',
        pointValue: 1,
        multipliers: {
            groceries: 0.04, // 4%
            gas: 0.04,
            transit: 0.04,
        },
        baseMultiplier: 0.01,
        category: 'cashback',
        categorySpendCap: {
            amount: 2000, // Cap per category per month
        },
        bestFor: ['groceries', 'gas', 'transit'],
        notes: '4% on groceries, gas, transit (up to $2k/month per category).',
    },
    {
        id: 'bmo-cashback-world-elite',
        name: 'BMO CashBack World Elite Mastercard',
        issuer: 'BMO',
        network: 'Mastercard',
        annualFee: 120,
        welcomeBonus: {
            cashback: 300,
            minSpend: 3000,
            months: 3,
        },
        rewardType: 'cashback',
        pointValue: 1,
        multipliers: {
            groceries: 0.05, // 5%
            transit: 0.04,
            entertainment: 0.04,
        },
        baseMultiplier: 0.01,
        categorySpendCap: {
            amount: 500, // Monthly cap on bonus categories
        },
        category: 'cashback',
        bestFor: ['groceries'],
        notes: '5% groceries (capped at $500/month).',
    },
    {
        id: 'tangerine-money-back',
        name: 'Tangerine Money-Back Credit Card',
        issuer: 'Tangerine',
        network: 'Mastercard',
        annualFee: 0,
        welcomeBonus: null,
        rewardType: 'cashback',
        pointValue: 1,
        multipliers: {
            // User picks 2-3 categories at 2%
            // For simulation, assume groceries + gas + recurring
            groceries: 0.02,
            gas: 0.02,
            recurring: 0.02,
        },
        baseMultiplier: 0.005, // 0.5%
        category: 'no-fee',
        bestFor: ['groceries', 'gas', 'recurring'],
        notes: 'Choose 2-3 categories for 2% back. No annual fee.',
    },
];

/**
 * Get all cards
 */
export function getAllCards() {
    return CARD_DATABASE;
}

/**
 * Get a card by ID
 */
export function getCardById(id) {
    return CARD_DATABASE.find(card => card.id === id);
}
