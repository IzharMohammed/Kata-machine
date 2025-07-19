/**
 * @question The Two Crystal Balls Problem
 * * You are given two identical crystal balls and a building with 'n' floors.
 * You want to find the exact floor from which a crystal ball will break when dropped.
 * This is represented by a boolean array `breaks`, where `true` means the ball
 * breaks and `false` means it doesn't. Your goal is to find the index of the
 * first `true` value in the array.
 * * You want to devise a strategy that minimizes the number of drops (array accesses)
 * in the worst-case scenario.
 * * @approach
 * The optimal strategy is to not check every floor one-by-one (which would be O(n)).
 * Instead, we can do better by breaking the problem into two parts:
 * * 1.  **Big Jumps (with the first ball):** We jump ahead by a fixed amount, `sqrt(n)`,
 * checking floors at intervals. We keep jumping until our first ball breaks.
 * This allows us to quickly find a "range" where the breaking point must be.
 * * 2.  **Linear Scan (with the second ball):** Once the first ball breaks at floor `j`,
 * we know the actual breaking point is somewhere between the previous safe jump
 * point and `j`. We go back to the last known safe floor and walk up one floor
 * at a time with our second ball until it breaks. This pinpoints the exact floor.
 * * This combination of jumping and linear scanning gives us a time complexity of O(sqrt(n)).
 * * @time_complexity O(sqrt(n))
 * In the worst case, we perform `sqrt(n)` jumps and then up to `sqrt(n)` linear steps.
 * The total number of operations is roughly `sqrt(n) + sqrt(n) = 2 * sqrt(n)`.
 * In Big O notation, constants are dropped, so the complexity is O(sqrt(n)).
 * * @space_complexity O(1)
 * The algorithm uses a fixed number of variables (`jumpAmt`, `j`) to store our position.
 * The amount of memory used does not increase with the size of the input array `breaks`.
 * Therefore, the space complexity is constant.
 * * @param {boolean[]} breaks - An array of booleans representing the floors of a building.
 * `false` means the ball doesn't break, `true` means it does.
 * @returns {number} The index of the first floor where the ball breaks, or -1 if it never breaks.
 */

export default function two_crystal_balls(breaks: boolean[]): number {
    // Calculate the optimal jump distance, which is the square root of the total number of floors.
    const jumpAmt = Math.floor(Math.sqrt(breaks.length));

    // First pass: Jump through the array with the first crystal ball.
    let j = jumpAmt;
    for (; j < breaks.length; j += jumpAmt) {
        // If the ball breaks, we've found the range.
        if (breaks[j]) {
            break;
        }
    }

    // Go back to the last known safe jump point.
    j -= jumpAmt;

    // Second pass: Walk forward one step at a time with the second crystal ball.
    // The search is now limited to a smaller section of at most `jumpAmt` size.
    for (; j < breaks.length; j++) {
        // If the ball breaks, we have found the exact floor.
        if (breaks[j]) {
            return j;
        }
    }

    // If the loop completes without finding a break, it means the ball never breaks.
    return -1;
}