/**
 * Canadian Credit Card Database
 * Data sourced from Ratehub.ca and creditcardGenius.ca (January 2026)
 * 
 * Point values are in CAD cents per point for calculation purposes.
 * Multipliers represent points/% earned per dollar spent.
 */

export const CARD_DATABASE = [
    // ============== PREMIUM REWARDS ==============
    {
        id: 'amex-cobalt',
        name: 'American Express Cobalt Card',
        issuer: 'American Express',
        network: 'Amex',
        annualFee: 192, // $15.99/month
        welcomeBonus: {
            points: 15000,
            value: 150, // $150 value
            minSpend: 750,
            minSpendMonths: 12,
            description: 'Earn 1,250 points/month when you spend $750/month (up to 15,000 pts/year)'
        },
        // Multipliers: points per $1 spent
        multipliers: {
            groceries: 5,
            dining: 5,
            delivery: 5,
            streaming: 3,
            transit: 2,
            gas: 2,
        },
        baseMultiplier: 1,
        pointValue: 0.01, // 1 cent per point (conservative)
        rewardType: 'points',
        rewardProgram: 'Membership Rewards',
        features: ['5x on groceries & dining', 'Transfer to Aeroplan 1:1', 'No FX fee workaround'],
        minIncome: null,
        minCreditScore: 725,
    },
    {
        id: 'scotiabank-passport',
        name: 'Scotiabank Passport Visa Infinite',
        issuer: 'Scotiabank',
        network: 'Visa',
        annualFee: 150,
        welcomeBonus: {
            points: 60000,
            value: 600,
            minSpend: 1000,
            minSpendMonths: 3,
            description: 'Earn up to 60,000 Scene+ points'
        },
        multipliers: {
            groceries: 3, // at Sobeys, IGA, Safeway
            dining: 2,
            transit: 2,
            travel: 2,
        },
        baseMultiplier: 1,
        pointValue: 0.01,
        rewardType: 'points',
        rewardProgram: 'Scene+',
        features: ['No foreign transaction fee', '6 airport lounge visits/year', 'Comprehensive travel insurance'],
        minIncome: 60000,
        minCreditScore: 725,
    },
    {
        id: 'td-aeroplan-infinite',
        name: 'TD Aeroplan Visa Infinite',
        issuer: 'TD',
        network: 'Visa',
        annualFee: 139, // First year waived
        welcomeBonus: {
            points: 40000,
            value: 800, // ~2 cents/point for flights
            minSpend: 7500,
            minSpendMonths: 6,
            description: 'Up to 40,000 Aeroplan points with spend requirements'
        },
        multipliers: {
            travel: 1.5,
        },
        baseMultiplier: 1,
        pointValue: 0.02, // Aeroplan points worth ~2 cents for flights
        rewardType: 'points',
        rewardProgram: 'Aeroplan',
        features: ['First checked bag free', 'NEXUS fee rebate', 'Aeroplan status credits'],
        minIncome: 60000,
        minCreditScore: 660,
        firstYearFeeWaived: true,
    },

    // ============== CASH BACK ==============
    {
        id: 'cibc-dividend-infinite',
        name: 'CIBC Dividend Visa Infinite',
        issuer: 'CIBC',
        network: 'Visa',
        annualFee: 120, // First year rebate available
        welcomeBonus: {
            points: 0,
            value: 250, // Up to $250 in cash back
            minSpend: 2500,
            minSpendMonths: 4,
            description: '10% cash back on first $2,500 (up to $250)'
        },
        multipliers: {
            groceries: 4,
            gas: 4,
            dining: 2,
            transit: 2,
            recurring: 2,
        },
        baseMultiplier: 1,
        pointValue: 0.01, // Direct cash back
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['4% on groceries & gas', 'Journie gas savings', 'Skip partnership'],
        minIncome: 60000,
        minCreditScore: 725,
    },
    {
        id: 'scotia-momentum-infinite',
        name: 'Scotiabank Momentum Visa Infinite',
        issuer: 'Scotiabank',
        network: 'Visa',
        annualFee: 120, // First year waived
        welcomeBonus: {
            points: 0,
            value: 200, // 10% on first $2,000
            minSpend: 2000,
            minSpendMonths: 3,
            description: '10% cash back on first $2,000 in purchases'
        },
        multipliers: {
            groceries: 4,
            recurring: 4, // bills and subscriptions
            streaming: 4,
            gas: 2,
            transit: 2,
        },
        baseMultiplier: 1,
        pointValue: 0.01,
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['4% on groceries & bills', 'Mobile device insurance', 'First year free'],
        minIncome: 60000,
        minCreditScore: 725,
        firstYearFeeWaived: true,
    },
    {
        id: 'td-cashback-infinite',
        name: 'TD Cash Back Visa Infinite',
        issuer: 'TD',
        network: 'Visa',
        annualFee: 139, // First year waived
        welcomeBonus: {
            points: 0,
            value: 350, // 10% on bonus categories up to $3,500
            minSpend: 3500,
            minSpendMonths: 3,
            description: '10% cash back on grocery, gas, transit, bills (up to $3,500 spend)'
        },
        multipliers: {
            groceries: 3,
            gas: 3,
            transit: 3,
            recurring: 3,
            streaming: 3,
        },
        baseMultiplier: 1,
        pointValue: 0.01,
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['3% on 5 categories', 'TD Auto Club membership', 'Mobile device insurance'],
        minIncome: 60000,
        minCreditScore: 660,
        firstYearFeeWaived: true,
    },

    // ============== NO ANNUAL FEE ==============
    {
        id: 'tangerine-moneyback',
        name: 'Tangerine Money-Back Credit Card',
        issuer: 'Tangerine',
        network: 'Mastercard',
        annualFee: 0,
        welcomeBonus: {
            points: 0,
            value: 100,
            minSpend: 1000,
            minSpendMonths: 2,
            description: 'Extra 10% cash back (up to $100) on first $1,000'
        },
        // User chooses 2-3 categories for 2% back
        multipliers: {
            groceries: 2,    // if selected
            gas: 2,          // if selected
            dining: 2,       // if selected
            recurring: 2,    // if selected
            transit: 2,      // if selected
        },
        baseMultiplier: 0.5, // 0.5% on everything else
        pointValue: 0.01,
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['Choose your own 2% categories', 'No annual fee', 'Monthly cash back payouts'],
        minIncome: 12000,
        minCreditScore: 660,
        customCategories: true,
    },
    {
        id: 'simplii-cashback',
        name: 'Simplii Financial Cash Back Visa',
        issuer: 'Simplii',
        network: 'Visa',
        annualFee: 0,
        welcomeBonus: {
            points: 0,
            value: 400,
            minSpend: 5000,
            minSpendMonths: 4,
            description: 'Up to 15% cash back on first $5,000'
        },
        multipliers: {
            dining: 4,
            groceries: 1.5,
            gas: 1.5,
            recurring: 1.5,
            transit: 1.5,
        },
        baseMultiplier: 0.5,
        pointValue: 0.01,
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['4% on dining', '1.5% on daily spending', 'No annual fee'],
        minIncome: 15000,
        minCreditScore: 660,
    },
    {
        id: 'amex-simplycash',
        name: 'SimplyCash Card from American Express',
        issuer: 'American Express',
        network: 'Amex',
        annualFee: 0,
        welcomeBonus: {
            points: 0,
            value: 100,
            minSpend: 2000,
            minSpendMonths: 3,
            description: '5% cash back on first $2,000 (up to $100)'
        },
        multipliers: {
            groceries: 2,
            gas: 2,
        },
        baseMultiplier: 1.25,
        pointValue: 0.01,
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['2% on gas & groceries', '1.25% on everything else', 'Amex perks'],
        minIncome: null,
        minCreditScore: 725,
    },
    {
        id: 'pc-world-elite',
        name: 'PC World Elite Mastercard',
        issuer: 'PC Financial',
        network: 'Mastercard',
        annualFee: 0,
        welcomeBonus: {
            points: 20000,
            value: 20, // PC Optimum points
            minSpend: 0,
            minSpendMonths: 1,
            description: 'Bonus PC Optimum points to get started'
        },
        // Points per $1 (45 pts = $0.045)
        multipliers: {
            groceries: 3, // 30 pts at Loblaw = 3%
            shopping: 4.5, // 45 pts at Shoppers = 4.5%
        },
        baseMultiplier: 1, // 10 pts everywhere = 1%
        pointValue: 0.01,
        rewardType: 'points',
        rewardProgram: 'PC Optimum',
        features: ['4.5% at Shoppers Drug Mart', '3% at Loblaw stores', 'Stack with PC Optimum card'],
        minIncome: 80000,
        minCreditScore: 560,
    },
    {
        id: 'rogers-world-elite',
        name: 'Rogers World Elite Mastercard',
        issuer: 'Rogers',
        network: 'Mastercard',
        annualFee: 0,
        welcomeBonus: {
            points: 0,
            value: 25,
            minSpend: 500,
            minSpendMonths: 3,
            description: '$25 bonus after first $500'
        },
        multipliers: {
            // No category bonuses - flat rate
        },
        baseMultiplier: 1.5, // 1.5% on everything
        foreignMultiplier: 4, // 4% on foreign currency
        pointValue: 0.01,
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['1.5% flat cash back', '4% on foreign transactions', 'No FX fee'],
        minIncome: 80000,
        minCreditScore: 725,
    },

    // ============== STORE CARDS ==============
    {
        id: 'triangle-world-elite',
        name: 'Triangle World Elite Mastercard',
        issuer: 'Canadian Tire',
        network: 'Mastercard',
        annualFee: 0,
        welcomeBonus: {
            points: 0,
            value: 50,
            minSpend: 0,
            minSpendMonths: 1,
            description: '$50 in bonus CT Money'
        },
        multipliers: {
            gas: 5, // at Canadian Tire gas
            shopping: 4, // at Canadian Tire, SportChek, etc.
        },
        baseMultiplier: 1, // 1% everywhere else
        pointValue: 0.01,
        rewardType: 'points',
        rewardProgram: 'Triangle Rewards',
        features: ['4% at CT family stores', '5% at CT Gas+', 'Roadside assistance'],
        minIncome: 80000,
        minCreditScore: 660,
    },
    {
        id: 'costco-mastercard',
        name: 'Costco Mastercard',
        issuer: 'Capital One',
        network: 'Mastercard',
        annualFee: 0, // Requires Costco membership
        welcomeBonus: {
            points: 0,
            value: 0,
            minSpend: 0,
            minSpendMonths: 0,
            description: 'No welcome bonus'
        },
        multipliers: {
            gas: 3, // anywhere
            dining: 3,
            travel: 2,
            shopping: 1, // Costco purchases
        },
        baseMultiplier: 0.5,
        pointValue: 0.01,
        rewardType: 'cashback',
        rewardProgram: 'Cash Back',
        features: ['3% on gas & dining', '2% on travel', 'Annual rebate at Costco'],
        minIncome: null,
        minCreditScore: 660,
        requiresMembership: 'Costco',
    },

    // ============== TRAVEL PREMIUM ==============
    {
        id: 'amex-platinum',
        name: 'American Express Platinum Card',
        issuer: 'American Express',
        network: 'Amex',
        annualFee: 799,
        welcomeBonus: {
            points: 100000,
            value: 2000, // ~2 cents/point for travel
            minSpend: 10000,
            minSpendMonths: 3,
            description: '100,000 MR points after $10,000 spend'
        },
        multipliers: {
            travel: 3,
            dining: 2,
        },
        baseMultiplier: 1,
        pointValue: 0.02, // Premium redemption value
        rewardType: 'points',
        rewardProgram: 'Membership Rewards',
        features: ['Unlimited lounge access', '$200 travel credit', 'Hotel elite status'],
        minIncome: 80000,
        minCreditScore: 750,
    },
    {
        id: 'bmo-eclipse-infinite',
        name: 'BMO Eclipse Visa Infinite',
        issuer: 'BMO',
        network: 'Visa',
        annualFee: 120,
        welcomeBonus: {
            points: 60000,
            value: 400,
            minSpend: 3000,
            minSpendMonths: 3,
            description: '60,000 BMO Rewards points'
        },
        multipliers: {
            groceries: 5, // first $500/month
            dining: 5,
            transit: 5,
            gas: 5,
        },
        baseMultiplier: 1,
        pointValue: 0.007, // BMO points ~0.7 cents
        rewardType: 'points',
        rewardProgram: 'BMO Rewards',
        features: ['5x on top categories', 'LoungeKey access', 'Insurance package'],
        minIncome: 60000,
        minCreditScore: 725,
    },
];

// Utility function to get card by ID
export function getCardById(id) {
    return CARD_DATABASE.find(card => card.id === id);
}

// Utility function to get cards by issuer
export function getCardsByIssuer(issuer) {
    return CARD_DATABASE.filter(card => card.issuer === issuer);
}

// Utility function to get no-fee cards
export function getNoFeeCards() {
    return CARD_DATABASE.filter(card => card.annualFee === 0);
}

export function getAllCards() {
    return CARD_DATABASE;
}
