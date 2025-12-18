/**
 * Price mapping for different price tiers
 */

const priceMap: Record<number, number> = {
  1: 50.0,
  2: 75.0,
  3: 100.0,
  4: 150.0,
};

/**
 * Get the price for a given price tier
 */
export const getPriceForTier = (tier: number): number => {
  return priceMap[tier] || 0;
};

/**
 * Get all available price tiers
 */
export const getAvailableTiers = (): number[] => {
  return Object.keys(priceMap).map(Number).sort();
};

/**
 * Get price range
 */
export const getPriceRange = (): { min: number; max: number } => {
  const tiers = getAvailableTiers();
  return {
    min: Math.min(...tiers.map((t) => getPriceForTier(t))),
    max: Math.max(...tiers.map((t) => getPriceForTier(t))),
  };
};
