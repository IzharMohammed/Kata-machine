export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length - 1;

    while (low <= high) {
        const middle = Math.floor(low + (high - low) / 2);
        const v = haystack[middle];

        if (v === needle) {
            return true
        } else if (v > needle) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }

    return false;
}