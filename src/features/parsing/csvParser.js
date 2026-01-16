import Papa from 'papaparse';
import { categorizeMerchant, CATEGORIES } from './merchantCategories';

/**
 * Parse a CSV file and extract transactions.
 * Attempts to identify Date, Description/Merchant, and Amount columns.
 */
export function parseCSV(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.warn('CSV parsing errors:', results.errors);
                }

                const transactions = normalizeTransactions(results.data, results.meta.fields);
                resolve(transactions);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}

/**
 * Normalize raw CSV data into a standard transaction format.
 * This is flexible to handle various bank CSV formats.
 */
function normalizeTransactions(data, fields) {
    // Common column name patterns
    const datePatterns = /date|posted|transaction\s?date/i;
    const descPatterns = /description|merchant|payee|name|memo/i;
    const amountPatterns = /amount|debit|credit|value/i;

    // Find matching columns
    const dateCol = fields.find(f => datePatterns.test(f));
    const descCol = fields.find(f => descPatterns.test(f));
    const amountCol = fields.find(f => amountPatterns.test(f));

    if (!dateCol || !descCol || !amountCol) {
        console.warn('Could not identify all required columns. Found:', { dateCol, descCol, amountCol });
    }

    const transactions = data.map((row, index) => {
        const rawDescription = row[descCol] || '';
        const rawAmount = row[amountCol] || '0';

        // Clean and parse amount (handle commas, dollar signs, negatives)
        let amount = parseFloat(rawAmount.replace(/[$,]/g, ''));
        // If amount is positive in a debit column, treat as spend (make negative for display if needed, or just use absolute)
        // For now, we'll use absolute value as "spend"
        amount = Math.abs(amount);

        const categoryInfo = categorizeMerchant(rawDescription);

        return {
            id: `tx-${index}`,
            date: row[dateCol] || '',
            description: rawDescription,
            amount: amount,
            category: categoryInfo.category,
            isAmbiguous: categoryInfo.isAmbiguous,
            possibleCategories: categoryInfo.possibleCategories || [],
        };
    }).filter(tx => tx.amount > 0); // Filter out zero-amount entries

    return transactions;
}

/**
 * Aggregate transactions into a Spend Profile.
 */
export function buildSpendProfile(transactions) {
    const profile = {};

    // Initialize all categories
    Object.values(CATEGORIES).forEach(cat => {
        profile[cat] = { total: 0, transactions: [] };
    });

    transactions.forEach(tx => {
        const cat = tx.category || CATEGORIES.OTHER;
        if (!profile[cat]) {
            profile[cat] = { total: 0, transactions: [] };
        }
        profile[cat].total += tx.amount;
        profile[cat].transactions.push(tx);
    });

    // Calculate grand total and percentages
    const grandTotal = Object.values(profile).reduce((sum, cat) => sum + cat.total, 0);

    Object.keys(profile).forEach(cat => {
        profile[cat].percentage = grandTotal > 0 ? (profile[cat].total / grandTotal) * 100 : 0;
    });

    return { categories: profile, grandTotal };
}

/**
 * Get a list of ambiguous transactions that need user verification.
 */
export function getAmbiguousTransactions(transactions) {
    return transactions.filter(tx => tx.isAmbiguous);
}
