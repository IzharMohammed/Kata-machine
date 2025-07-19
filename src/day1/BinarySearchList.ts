/**
 * Performs binary search on a sorted array to find if a value exists
 * @param haystack - The sorted array to search in (must be sorted in ascending order)
 * @param needle - The value to search for
 * @returns boolean - true if found, false otherwise
 */
export default function bs_list(haystack: number[], needle: number): boolean {
    // Initialize the search boundaries
    let low = 0;                        // Lower bound of current search range
    let high = haystack.length - 1;     // Upper bound of current search range

    // Continue searching while there's a valid range to search
    while (low <= high) {
        // Calculate the middle index safely to prevent overflow
        const middle = Math.floor(low + (high - low) / 2);
        const v = haystack[middle];     // Value at the middle index

        if (v === needle) {
            // Found the needle!
            return true;
        } else if (v > needle) {
            // The needle is in the left half - adjust high boundary
            high = middle - 1;
        } else {
            // The needle is in the right half - adjust low boundary
            low = middle + 1;
        }
    }

    // Needle not found in the haystack
    return false;
}

/*
The binary search algorithm efficiently finds whether a value exists in a sorted array by repeatedly dividing the search interval in half. Let's break down the implementation and explain why we use low + (high - low) / 2 instead of (low + high) / 2.

Why low + (high - low) / 2 is better
Both expressions mathematically give the same result, but low + (high - low) / 2 is preferred because:

Avoids potential integer overflow: When dealing with very large arrays, low + high might exceed the maximum integer value, causing overflow. The subtraction version prevents this.

Example of overflow scenario:

If low = 1,000,000,000 and high = 2,000,000,000

(low + high) / 2 would first calculate 3,000,000,000 which might overflow

low + (high - low) / 2 calculates 1,000,000,000 + (1,000,000,000)/2 = 1,500,000,000 safely

*/