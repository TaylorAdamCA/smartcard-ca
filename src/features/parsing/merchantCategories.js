/**
 * Merchant Category Mapping Database
 * Maps common Canadian merchant names to spending categories.
 * This is the "secret sauce" - can be expanded over time.
 */
export const CATEGORIES = {
  GROCERIES: 'groceries',
  GAS: 'gas',
  DINING: 'dining',
  TRANSIT: 'transit',
  RECURRING: 'recurring',
  TRAVEL: 'travel',
  ENTERTAINMENT: 'entertainment',
  SHOPPING: 'shopping',
  OTHER: 'other',
};

// Keywords mapped to categories
// Ordered by specificity - more specific first
export const MERCHANT_KEYWORDS = [
  // Groceries
  { pattern: /loblaws?/i, category: CATEGORIES.GROCERIES },
  { pattern: /no\s?frills/i, category: CATEGORIES.GROCERIES },
  { pattern: /superstore/i, category: CATEGORIES.GROCERIES },
  { pattern: /sobeys/i, category: CATEGORIES.GROCERIES },
  { pattern: /safeway/i, category: CATEGORIES.GROCERIES },
  { pattern: /metro\s?(plus)?/i, category: CATEGORIES.GROCERIES },
  { pattern: /freshco/i, category: CATEGORIES.GROCERIES },
  { pattern: /food\s?basics/i, category: CATEGORIES.GROCERIES },
  { pattern: /farm\s?boy/i, category: CATEGORIES.GROCERIES },
  { pattern: /whole\s?foods/i, category: CATEGORIES.GROCERIES },
  { pattern: /t&t\s?supermarket/i, category: CATEGORIES.GROCERIES },
  
  // Gas
  { pattern: /petro[\s-]?canada/i, category: CATEGORIES.GAS },
  { pattern: /shell/i, category: CATEGORIES.GAS },
  { pattern: /esso/i, category: CATEGORIES.GAS },
  { pattern: /pioneer/i, category: CATEGORIES.GAS },
  { pattern: /husky/i, category: CATEGORIES.GAS },
  { pattern: /costco\s?gas/i, category: CATEGORIES.GAS },
  { pattern: /ultramar/i, category: CATEGORIES.GAS },
  { pattern: /canadian\s?tire\s?gas/i, category: CATEGORIES.GAS },
  
  // Dining
  { pattern: /uber\s?eats/i, category: CATEGORIES.DINING },
  { pattern: /doordash/i, category: CATEGORIES.DINING },
  { pattern: /skip\s?the\s?dishes/i, category: CATEGORIES.DINING },
  { pattern: /mcdonald(')?s/i, category: CATEGORIES.DINING },
  { pattern: /starbucks/i, category: CATEGORIES.DINING },
  { pattern: /tim\s?horton/i, category: CATEGORIES.DINING },
  { pattern: /a&w/i, category: CATEGORIES.DINING },
  { pattern: /swiss\s?chalet/i, category: CATEGORIES.DINING },
  { pattern: /boston\s?pizza/i, category: CATEGORIES.DINING },
  { pattern: /the\s?keg/i, category: CATEGORIES.DINING },
  { pattern: /restaurant/i, category: CATEGORIES.DINING },
  { pattern: /cafe|café/i, category: CATEGORIES.DINING },
  
  // Transit
  { pattern: /uber(?!\s?eats)/i, category: CATEGORIES.TRANSIT },
  { pattern: /lyft/i, category: CATEGORIES.TRANSIT },
  { pattern: /presto/i, category: CATEGORIES.TRANSIT },
  { pattern: /ttc/i, category: CATEGORIES.TRANSIT },
  { pattern: /stm/i, category: CATEGORIES.TRANSIT },
  { pattern: /translink/i, category: CATEGORIES.TRANSIT },
  { pattern: /go\s?transit/i, category: CATEGORIES.TRANSIT },
  
  // Recurring / Subscriptions
  { pattern: /netflix/i, category: CATEGORIES.RECURRING },
  { pattern: /spotify/i, category: CATEGORIES.RECURRING },
  { pattern: /apple\.com/i, category: CATEGORIES.RECURRING },
  { pattern: /google\s?\*|google\s?play/i, category: CATEGORIES.RECURRING },
  { pattern: /amazon\s?prime/i, category: CATEGORIES.RECURRING },
  { pattern: /disney\+|disneyplus/i, category: CATEGORIES.RECURRING },
  { pattern: /rogers/i, category: CATEGORIES.RECURRING },
  { pattern: /bell\s?(canada|mobility)?/i, category: CATEGORIES.RECURRING },
  { pattern: /telus/i, category: CATEGORIES.RECURRING },
  { pattern: /fido/i, category: CATEGORIES.RECURRING },
  { pattern: /koodo/i, category: CATEGORIES.RECURRING },
  { pattern: /freedom\s?mobile/i, category: CATEGORIES.RECURRING },
  
  // Travel
  { pattern: /air\s?canada/i, category: CATEGORIES.TRAVEL },
  { pattern: /westjet/i, category: CATEGORIES.TRAVEL },
  { pattern: /expedia/i, category: CATEGORIES.TRAVEL },
  { pattern: /booking\.com/i, category: CATEGORIES.TRAVEL },
  { pattern: /airbnb/i, category: CATEGORIES.TRAVEL },
  { pattern: /hotel/i, category: CATEGORIES.TRAVEL },
  { pattern: /marriott/i, category: CATEGORIES.TRAVEL },
  { pattern: /hilton/i, category: CATEGORIES.TRAVEL },
  
  // Entertainment
  { pattern: /cineplex/i, category: CATEGORIES.ENTERTAINMENT },
  { pattern: /landmark\s?cinema/i, category: CATEGORIES.ENTERTAINMENT },
  { pattern: /ticketmaster/i, category: CATEGORIES.ENTERTAINMENT },
  
  // Shopping (General) - intentionally broad, checked last
  { pattern: /amazon\.ca|amzn/i, category: CATEGORIES.SHOPPING },
  { pattern: /best\s?buy/i, category: CATEGORIES.SHOPPING },
  { pattern: /canadian\s?tire/i, category: CATEGORIES.SHOPPING },
  { pattern: /home\s?depot/i, category: CATEGORIES.SHOPPING },
  { pattern: /ikea/i, category: CATEGORIES.SHOPPING },
  { pattern: /shoppers\s?drug/i, category: CATEGORIES.SHOPPING },
  
  // Ambiguous - these need user verification (Walmart/Costco problem)
  // { pattern: /walmart/i, category: null, ambiguous: true },
  // { pattern: /costco/i, category: null, ambiguous: true },
];

// List of ambiguous merchants that need user verification
export const AMBIGUOUS_MERCHANTS = [
  { pattern: /walmart/i, possibleCategories: [CATEGORIES.GROCERIES, CATEGORIES.SHOPPING] },
  { pattern: /costco/i, possibleCategories: [CATEGORIES.GROCERIES, CATEGORIES.SHOPPING, CATEGORIES.GAS] },
  { pattern: /real\s?canadian\s?superstore/i, possibleCategories: [CATEGORIES.GROCERIES, CATEGORIES.SHOPPING] },
];

/**
 * Categorize a single merchant name.
 * Returns { category, isAmbiguous, possibleCategories }
 */
export function categorizeMerchant(merchantName) {
  if (!merchantName) return { category: CATEGORIES.OTHER, isAmbiguous: false };

  // Check ambiguous first
  for (const m of AMBIGUOUS_MERCHANTS) {
    if (m.pattern.test(merchantName)) {
      return {
        category: m.possibleCategories[0], // Default guess
        isAmbiguous: true,
        possibleCategories: m.possibleCategories,
      };
    }
  }

  // Check definite matches
  for (const m of MERCHANT_KEYWORDS) {
    if (m.pattern.test(merchantName)) {
      return { category: m.category, isAmbiguous: false };
    }
  }

  return { category: CATEGORIES.OTHER, isAmbiguous: false };
}
