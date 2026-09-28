/**
 * ============================================================
 *  SEARCHING ALGORITHMS
 *  DSA Concept: Linear Search & Binary Search
 * ============================================================
 *
 *  Used in this project to:
 *  1. Linear Search  → Find weak patterns inside the password string.
 *  2. Binary Search  → Look up sorted common-password list efficiently.
 *
 *  Time Complexity:
 *    Linear Search  → O(n) — scans each element once.
 *    Binary Search  → O(log n) — halves the search space each step.
 *
 *  Space Complexity:
 *    Both → O(1) extra space (in-place searching, no extra structures).
 */

// ============================================================
//  LINEAR SEARCH
//  Searches for a pattern inside a given string.
//  Returns index of first occurrence, or -1 if not found.
//  Time Complexity: O(n * m) where n = text length, m = pattern length
// ============================================================

/**
 * linearSearchPattern(text, pattern)
 * Manually searches for `pattern` inside `text` without using
 * built-in indexOf or includes.
 *
 * @param {string} text    - The string to search within (password)
 * @param {string} pattern - The pattern to find
 * @returns {object} { found: boolean, index: number, steps: number }
 */
function linearSearchPattern(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    let steps = 0;

    // Edge case: pattern longer than text
    if (m > n) return { found: false, index: -1, steps: 0 };

    for (let i = 0; i <= n - m; i++) {
        steps++;
        let match = true;

        // Compare pattern character by character
        for (let j = 0; j < m; j++) {
            steps++;
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }

        if (match) {
            return { found: true, index: i, steps };
        }
    }

    return { found: false, index: -1, steps };
}

/**
 * searchWeakPatterns(password, patternList)
 * Uses Linear Search to find all weak patterns in the password.
 * Returns array of found patterns with their positions.
 *
 * Time Complexity: O(n * m * p)
 *   n = password length, m = avg pattern length, p = number of patterns
 */
function searchWeakPatterns(password, patternList) {
    const lowerPassword = password.toLowerCase();
    const foundPatterns = [];

    // Linear Search through each pattern in the list
    for (let p = 0; p < patternList.length; p++) {
        const pattern = patternList[p].toLowerCase();
        const result = linearSearchPattern(lowerPassword, pattern);

        if (result.found) {
            foundPatterns.push({
                pattern: patternList[p],
                index: result.index,
                steps: result.steps
            });
        }
    }

    return foundPatterns;
}

// ============================================================
//  BINARY SEARCH
//  Searches a SORTED array for an exact match.
//  Used for common password lookup (sorted list).
//  Time Complexity: O(log n)
// ============================================================

/**
 * binarySearch(sortedArray, target)
 * Standard binary search on a sorted array of strings.
 *
 * @param {string[]} sortedArray - Sorted array to search
 * @param {string}   target      - Value to find
 * @returns {object} { found: boolean, index: number, steps: number, comparisons: [] }
 */
function binarySearch(sortedArray, target) {
    let low = 0;
    let high = sortedArray.length - 1;
    let steps = 0;
    const comparisons = [];

    while (low <= high) {
        steps++;
        const mid = Math.floor((low + high) / 2);
        const midVal = sortedArray[mid];

        comparisons.push({ step: steps, low, mid, high, midVal, target });

        if (midVal === target) {
            return { found: true, index: mid, steps, comparisons };
        } else if (midVal < target) {
            low = mid + 1;  // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }

    return { found: false, index: -1, steps, comparisons };
}

/**
 * searchCommonPassword(password, sortedCommonPasswords)
 * Uses Binary Search to check if password is in the sorted
 * common-password list.
 *
 * @returns {object} { isCommon: boolean, steps: number, comparisons: [] }
 */
function searchCommonPassword(password, sortedCommonPasswords) {
    const lowerPassword = password.toLowerCase();
    const result = binarySearch(sortedCommonPasswords, lowerPassword);

    return {
        isCommon: result.found,
        steps: result.steps,
        comparisons: result.comparisons
    };
}

// ============================================================
//  SEQUENTIAL PATTERN DETECTION
//  Uses Linear Search logic to find keyboard/sequence patterns.
// ============================================================

// Common sequential patterns to detect
const SEQUENTIAL_PATTERNS = [
    'abcdef', 'bcdefg', 'cdefgh', 'defghi', 'efghij',
    'fghijk', 'ghijkl', 'hijklm', 'ijklmn', 'jklmno',
    'klmnop', 'lmnopq', 'mnopqr', 'nopqrs', 'opqrst',
    'pqrstu', 'qrstuv', 'rstuvw', 'stuvwx', 'tuvwxy', 'uvwxyz',
    '012345', '123456', '234567', '345678', '456789',
    'qwerty', 'wertyu', 'ertyui', 'rtyuio', 'tyuiop',
    'asdfgh', 'sdfghj', 'dfghjk', 'fghjkl',
    'zxcvbn', 'xcvbnm',
    'qazwsx', 'wsxedc'
];

/**
 * detectSequentialPatterns(password)
 * Uses linear search to find sequential keyboard/alphabet/number
 * patterns in the password.
 *
 * @param {string} password
 * @returns {object} { found: string[], totalSteps: number }
 */
function detectSequentialPatterns(password) {
    const lowerPassword = password.toLowerCase();
    const foundSeqs = [];
    let totalSteps = 0;

    for (let p = 0; p < SEQUENTIAL_PATTERNS.length; p++) {
        const pattern = SEQUENTIAL_PATTERNS[p];
        const result = linearSearchPattern(lowerPassword, pattern);
        totalSteps += result.steps;

        if (result.found) {
            foundSeqs.push(pattern);
        }
    }

    return { found: foundSeqs, totalSteps };
}
