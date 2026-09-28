/**
 * ============================================================
 *  SORTING ALGORITHMS
 *  DSA Concept: Bubble Sort & Selection Sort
 * ============================================================
 *
 *  Used in this project to:
 *  1. Bubble Sort    → Sort password rule results by score (descending).
 *  2. Selection Sort → Sort suggestions by priority level.
 *
 *  Both algorithms are implemented manually — NOT using JS built-in sort().
 *
 *  Time Complexity:
 *    Bubble Sort    → O(n²) worst/average; O(n) best (already sorted)
 *    Selection Sort → O(n²) all cases
 *
 *  Space Complexity:
 *    Both → O(1) extra space (in-place sorting)
 */

// ============================================================
//  BUBBLE SORT
//  Repeatedly swaps adjacent elements if they are in wrong order.
//  Each pass "bubbles" the largest unsorted element to its position.
//
//  Time Complexity:  O(n²) average/worst | O(n) best (optimized)
//  Space Complexity: O(1) — in-place
// ============================================================

/**
 * bubbleSort(arr, key, ascending)
 * Sorts an array of objects by a numeric key using Bubble Sort.
 *
 * @param {object[]} arr       - Array of rule/score objects
 * @param {string}   key       - Property name to sort by
 * @param {boolean}  ascending - true = ascending, false = descending
 * @returns {object} { sorted: object[], swaps: number, passes: number }
 */
function bubbleSort(arr, key, ascending = false) {
    // Work on a copy to avoid mutating the original array
    const sorted = arr.map(item => ({ ...item }));
    const n = sorted.length;
    let swaps = 0;
    let passes = 0;

    for (let i = 0; i < n - 1; i++) {
        passes++;
        let swappedThisPass = false;

        for (let j = 0; j < n - i - 1; j++) {
            const a = sorted[j][key];
            const b = sorted[j + 1][key];

            // Determine if swap is needed based on sort direction
            const shouldSwap = ascending ? (a > b) : (a < b);

            if (shouldSwap) {
                // Swap adjacent elements
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
                swaps++;
                swappedThisPass = true;
            }
        }

        // Optimization: if no swap happened, array is already sorted
        if (!swappedThisPass) break;
    }

    return { sorted, swaps, passes };
}

// ============================================================
//  SELECTION SORT
//  Finds the minimum (or maximum) element and places it
//  in the correct position, one element at a time.
//
//  Time Complexity:  O(n²) all cases
//  Space Complexity: O(1) — in-place
// ============================================================

/**
 * selectionSort(arr, key, ascending)
 * Sorts an array of objects by a numeric key using Selection Sort.
 *
 * @param {object[]} arr       - Array of suggestion/priority objects
 * @param {string}   key       - Property name to sort by
 * @param {boolean}  ascending - true = ascending, false = descending
 * @returns {object} { sorted: object[], selections: number }
 */
function selectionSort(arr, key, ascending = true) {
    // Work on a copy
    const sorted = arr.map(item => ({ ...item }));
    const n = sorted.length;
    let selections = 0;

    for (let i = 0; i < n - 1; i++) {
        // Find the index of the min (or max) element in remaining unsorted part
        let targetIdx = i;

        for (let j = i + 1; j < n; j++) {
            selections++;
            const better = ascending
                ? sorted[j][key] < sorted[targetIdx][key]
                : sorted[j][key] > sorted[targetIdx][key];

            if (better) {
                targetIdx = j;
            }
        }

        // Swap the found element with first element of unsorted part
        if (targetIdx !== i) {
            const temp = sorted[i];
            sorted[i] = sorted[targetIdx];
            sorted[targetIdx] = temp;
        }
    }

    return { sorted, selections };
}

// ============================================================
//  SORT PASSWORD RULES BY SCORE (using Bubble Sort)
//  Demonstrates sorting in a meaningful context:
//  Rules that contribute more to password strength come first.
// ============================================================

/**
 * sortRulesByScore(rules)
 * Takes an array of rule evaluation objects and sorts them
 * by their score contribution using Bubble Sort (descending).
 *
 * Each rule object has: { name, passed, score, maxScore, description }
 *
 * @param {object[]} rules - Array of evaluated rule objects
 * @returns {object} { sorted, swaps, passes }
 */
function sortRulesByScore(rules) {
    return bubbleSort(rules, 'score', false); // descending: highest score first
}

// ============================================================
//  SORT SUGGESTIONS BY PRIORITY (using Selection Sort)
//  Suggestions with highest priority (most important) come first.
// ============================================================

/**
 * sortSuggestionsByPriority(suggestions)
 * Sorts suggestions using Selection Sort by priority (descending).
 *
 * Each suggestion object has: { text, priority, category }
 *
 * @param {object[]} suggestions
 * @returns {object} { sorted, selections }
 */
function sortSuggestionsByPriority(suggestions) {
    return selectionSort(suggestions, 'priority', false); // descending
}
