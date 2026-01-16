/**
 * Recommendation Engine
 * Calculates potential value for each card based on a user's Spend Profile.
 */

import { getAllCards } from '../../data/cardDatabase';
import { CATEGORIES } from '../parsing/merchantCategories';

/**
 * Calculate the annual value for a single card given a spend profile.
 * @param {Object} card - Card object from database
 * @param {Object} spendProfile - { categories: { [category]: { total } }, grandTotal }
 * @param {Object} options - { includeWelcomeBonus: boolean, years: number }
 */
export function calculateCardValue(card, spendProfile, options = {}) {
    const { includeWelcomeBonus = true, years = 1 } = options;

    let totalRewards = 0;

    // Calculate rewards for each category
    Object.entries(spendProfile.categories).forEach(([category, data]) => {
        const spend = data.total;

        // Get multiplier for this category
        let multiplier = card.multipliers?.[category] || card.baseMultiplier || 0;

        // Handle cashback vs points
        if (card.rewardType === 'points') {
            // Points: spend * multiplier = points, then * pointValue for cash equivalent
            const points = spend * multiplier;
            totalRewards += points * (card.pointValue || 0.01);
        } else {
            // Cashback: multiplier is already a percentage (e.g., 0.03 = 3%)
            totalRewards += spend * multiplier;
        }
    });

    // Calculate welcome bonus value (first year only if applicable)
    let welcomeBonusValue = 0;
    if (includeWelcomeBonus && card.welcomeBonus && years >= 1) {
        if (card.rewardType === 'points' && card.welcomeBonus.points) {
            welcomeBonusValue = card.welcomeBonus.points * (card.pointValue || 0.01);
        } else if (card.welcomeBonus.cashback) {
            welcomeBonusValue = card.welcomeBonus.cashback;
        }
    }

    // Calculate net value over the period
    const annualRewards = totalRewards;
    const annualFee = card.annualFee || 0;

    let netValue;
    if (years === 1) {
        netValue = annualRewards + welcomeBonusValue - annualFee;
    } else {
        // Long-term: spread welcome bonus, multiply annual values
        netValue = (annualRewards * years) + welcomeBonusValue - (annualFee * years);
    }

    return {
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        network: card.network,
        annualFee,
        rewardType: card.rewardType,
        annualRewards,
        welcomeBonusValue,
        netValue,
        netValuePerYear: netValue / years,
        bestFor: card.bestFor,
        notes: card.notes,
    };
}

/**
 * Get top card recommendations based on spend profile.
 * @returns Array of card results sorted by net value
 */
export function getRecommendations(spendProfile, options = {}) {
    const { limit = 5, includeWelcomeBonus = true, years = 1 } = options;

    const allCards = getAllCards();

    const results = allCards.map(card =>
        calculateCardValue(card, spendProfile, { includeWelcomeBonus, years })
    );

    // Sort by net value descending
    results.sort((a, b) => b.netValue - a.netValue);

    return results.slice(0, limit);
}

/**
 * Calculate how much more/less a new card would earn compared to a baseline card.
 */
export function compareToCurrent(spendProfile, currentCardId, newCardId, options = {}) {
    const allCards = getAllCards();
    const currentCard = allCards.find(c => c.id === currentCardId);
    const newCard = allCards.find(c => c.id === newCardId);

    if (!currentCard || !newCard) {
        return null;
    }

    const currentValue = calculateCardValue(currentCard, spendProfile, options);
    const newValue = calculateCardValue(newCard, spendProfile, options);

    return {
        currentCard: currentValue,
        newCard: newValue,
        difference: newValue.netValue - currentValue.netValue,
        differencePerYear: (newValue.netValue - currentValue.netValue) / (options.years || 1),
    };
}
