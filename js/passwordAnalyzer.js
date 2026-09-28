/**
 * ============================================================
 *  PASSWORD ANALYZER - Core Analysis Engine
 *  DSA Concept: Strings, Arrays, Sets, Hashing, Stack,
 *               Searching, Sorting
 * ============================================================
 *
 *  This module ties together all DSA components to analyze
 *  a password and produce a comprehensive strength report.
 *
 *  Main exported function: analyzePassword(password)
 *
 *  Overview of DSA usage:
 *  - String traversal  → Character-by-character analysis O(n)
 *  - Array             → Rule definitions, common passwords list
 *  - Set (Hashing)     → O(1) average lookup for common passwords
 *  - Stack             → Pattern depth & repeat-run analysis
 *  - Linear Search     → Weak-pattern detection in password
 *  - Binary Search     → Sorted common-password list lookup
 *  - Bubble Sort       → Sort rules by score contribution
 *  - Selection Sort    → Sort suggestions by priority
 */

// ============================================================
//  COMMON PASSWORDS - Array + Set for dual lookup demo
//  Array: used with Binary Search (must be sorted)
//  Set:   used for O(1) hash-based lookup
//
//  Time Complexity (Set lookup): O(1) average
//  Time Complexity (Binary Search): O(log n)
// ============================================================

// Sorted array (required for Binary Search)
const COMMON_PASSWORDS_SORTED = [
    '000000', '111111', '112233', '121212', '123123',
    '123321', '123456', '1234567', '12345678', '123456789',
    '1234567890', '123qwe', '1q2w3e', '1q2w3e4r',
    'aaaaaa', 'abc123', 'abcdef', 'admin', 'admin123',
    'adobe123', 'ashley', 'azerty', 'babygirl', 'baseball',
    'batman', 'charlie', 'chocolate', 'computer', 'donald',
    'dragon', 'football', 'freedom', 'hello', 'hockey',
    'iloveyou', 'iloveyou1', 'jesus', 'letmein', 'login',
    'login123', 'lovely', 'master', 'michael', 'monkey',
    'mustang', 'ninja', 'passw0rd', 'password', 'password1',
    'password123', 'password1234', 'princess', 'qazwsx',
    'qwerty', 'qwerty123', 'qwertyuiop', 'rockyou',
    'shadow', 'solo', 'starwars', 'sunshine', 'superman',
    'trustno1', 'welcome', 'whatever', 'zxcvbn', 'zxcvbnm'
].sort(); // Ensure sorted for Binary Search

// JavaScript Set for O(1) average-case lookup (Hash Table internally)
const COMMON_PASSWORDS_SET = new Set(COMMON_PASSWORDS_SORTED);

// ============================================================
//  WEAK PATTERNS ARRAY
//  Used with Linear Search to find patterns inside the password.
// ============================================================

const WEAK_PATTERNS = [
    'abc', 'bcd', 'cde', 'def', 'efg', 'fgh',
    '123', '234', '345', '456', '567', '678', '789',
    'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio',
    'asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl',
    'zxc', 'xcv', 'cvb', 'vbn', 'bnm',
    'password', 'admin', 'user', 'login', 'welcome',
    'letme', 'pass', 'secret'
];

// ============================================================
//  PASSWORD RULES - Defined as an Array
//  Each rule: { id, name, description, maxScore }
//  Rules are evaluated and scored, then SORTED by Bubble Sort.
// ============================================================

const PASSWORD_RULES = [
    { id: 'length_min',     name: 'Minimum Length (8+)',    description: 'Password must be at least 8 characters',   maxScore: 1 },
    { id: 'length_good',    name: 'Good Length (12+)',       description: 'Password is at least 12 characters long',  maxScore: 1 },
    { id: 'length_great',   name: 'Great Length (16+)',      description: 'Password is at least 16 characters long',  maxScore: 1 },
    { id: 'uppercase',      name: 'Uppercase Letter',        description: 'Contains at least one uppercase letter',    maxScore: 1 },
    { id: 'lowercase',      name: 'Lowercase Letter',        description: 'Contains at least one lowercase letter',    maxScore: 1 },
    { id: 'digit',          name: 'Contains Digit',          description: 'Contains at least one number (0-9)',        maxScore: 1 },
    { id: 'special',        name: 'Special Character',       description: 'Contains !@#$%^&* or similar characters',   maxScore: 2 },
    { id: 'no_common',      name: 'Not a Common Password',   description: 'Not found in common passwords list',        maxScore: 2 },
    { id: 'no_sequence',    name: 'No Sequential Pattern',   description: 'No abc/123/qwerty type sequences',          maxScore: 1 },
    { id: 'no_repeat',      name: 'No Excessive Repeats',    description: 'No character repeated 3+ times in a row',   maxScore: 1 },
    { id: 'char_variety',   name: 'High Character Variety',  description: 'Uses 3 or more character types',            maxScore: 1 },
    { id: 'no_space',       name: 'No Spaces',               description: 'Password does not contain spaces',          maxScore: 0 },
];

// Total maximum score (sum of all maxScore values)
const MAX_TOTAL_SCORE = PASSWORD_RULES.reduce((sum, r) => sum + r.maxScore, 0);

// ============================================================
//  MAIN ANALYSIS FUNCTION
//  Orchestrates all DSA components to evaluate the password.
//
//  Time Complexity: O(n * p) overall
//    n = password length, p = number of patterns checked
//  Space Complexity: O(n + k)
//    n = password chars on stack, k = number of rules
// ============================================================

/**
 * analyzePassword(password)
 * Full DSA-based password strength analysis.
 *
 * @param {string} password - The password to analyze
 * @returns {object} Full analysis report
 */
function analyzePassword(password) {
    if (!password || password.length === 0) {
        return getEmptyResult();
    }

    // --------------------------------------------------------
    //  STEP 1: STRING TRAVERSAL
    //  O(n) — process each character once
    // --------------------------------------------------------
    const charAnalysis = traversePassword(password);

    // --------------------------------------------------------
    //  STEP 2: STACK-BASED PATTERN ANALYSIS
    //  Push each char to stack, detect repeat runs
    // --------------------------------------------------------
    const stackAnalysis = analyzeWithStack(password);

    // --------------------------------------------------------
    //  STEP 3: HASHING / SET LOOKUP — O(1) average
    //  Check if password is in common-password Set
    // --------------------------------------------------------
    const isCommonSet = COMMON_PASSWORDS_SET.has(password.toLowerCase());

    // --------------------------------------------------------
    //  STEP 4: BINARY SEARCH on sorted common-password array
    //  O(log n) — demonstrates binary search
    // --------------------------------------------------------
    const binarySearchResult = searchCommonPassword(password, COMMON_PASSWORDS_SORTED);

    // --------------------------------------------------------
    //  STEP 5: LINEAR SEARCH — Weak pattern detection O(n*m*p)
    // --------------------------------------------------------
    const weakPatternsFound = searchWeakPatterns(password, WEAK_PATTERNS);
    const seqResult = detectSequentialPatterns(password);

    // --------------------------------------------------------
    //  STEP 6: EVALUATE RULES — Assign scores to each rule
    // --------------------------------------------------------
    const evaluatedRules = evaluateRules(
        password, charAnalysis, stackAnalysis,
        isCommonSet, seqResult, weakPatternsFound
    );

    // --------------------------------------------------------
    //  STEP 7: BUBBLE SORT — Sort rules by score (highest first)
    //  O(n²) — demonstrates sorting algorithm
    // --------------------------------------------------------
    const sortResult = sortRulesByScore(evaluatedRules);
    const sortedRules = sortResult.sorted;

    // --------------------------------------------------------
    //  STEP 8: CALCULATE TOTAL SCORE
    // --------------------------------------------------------
    const totalScore = evaluatedRules.reduce((sum, r) => sum + r.score, 0);
    const normalizedScore = Math.round((totalScore / MAX_TOTAL_SCORE) * 10);
    const clampedScore = Math.min(10, Math.max(0, normalizedScore));

    // --------------------------------------------------------
    //  STEP 9: DETERMINE STRENGTH LEVEL
    // --------------------------------------------------------
    const strength = getStrengthLevel(clampedScore, isCommonSet);

    // --------------------------------------------------------
    //  STEP 10: GENERATE SUGGESTIONS — then Selection Sort by priority
    // --------------------------------------------------------
    const rawSuggestions = generateSuggestions(
        evaluatedRules, charAnalysis, stackAnalysis, seqResult, password.length
    );
    const suggestionSortResult = sortSuggestionsByPriority(rawSuggestions);
    const sortedSuggestions = suggestionSortResult.sorted;

    return {
        password: '***HIDDEN***', // NEVER expose the actual password
        score: clampedScore,
        maxScore: 10,
        strength,
        charAnalysis,
        stackAnalysis,
        setLookup: { isCommon: isCommonSet },
        binarySearch: binarySearchResult,
        weakPatternsFound,
        seqResult,
        evaluatedRules,
        sortedRules,
        sortMeta: { swaps: sortResult.swaps, passes: sortResult.passes },
        suggestions: sortedSuggestions,
        totalRawScore: totalScore,
        maxRawScore: MAX_TOTAL_SCORE
    };
}

// ============================================================
//  STRING TRAVERSAL — O(n)
//  Counts character types, frequency, and detects spaces.
// ============================================================

/**
 * traversePassword(password)
 * Iterates through every character in the password string.
 * Builds a frequency map and categorizes characters.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(k) — k = unique characters
 */
function traversePassword(password) {
    let uppercaseCount = 0;
    let lowercaseCount = 0;
    let digitCount = 0;
    let specialCount = 0;
    let spaceCount = 0;
    const frequencyMap = {};  // character frequency map (hashing concept)
    const charDetails = [];   // per-character breakdown

    // O(n) traversal — character by character
    for (let i = 0; i < password.length; i++) {
        const ch = password[i];

        // Count character types
        if (/[A-Z]/.test(ch))       uppercaseCount++;
        else if (/[a-z]/.test(ch))  lowercaseCount++;
        else if (/[0-9]/.test(ch))  digitCount++;
        else if (ch === ' ')         spaceCount++;
        else                         specialCount++;

        // Build frequency map
        frequencyMap[ch] = (frequencyMap[ch] || 0) + 1;

        charDetails.push({
            index: i,
            char: ch,
            type: /[A-Z]/.test(ch) ? 'upper' :
                  /[a-z]/.test(ch) ? 'lower' :
                  /[0-9]/.test(ch) ? 'digit' :
                  ch === ' '        ? 'space' : 'special'
        });
    }

    const uniqueChars = Object.keys(frequencyMap).length;
    const charTypes = [
        uppercaseCount > 0 ? 1 : 0,
        lowercaseCount > 0 ? 1 : 0,
        digitCount > 0     ? 1 : 0,
        specialCount > 0   ? 1 : 0
    ].reduce((a, b) => a + b, 0);

    return {
        length: password.length,
        uppercaseCount,
        lowercaseCount,
        digitCount,
        specialCount,
        spaceCount,
        uniqueChars,
        charTypes,
        frequencyMap,
        charDetails
    };
}

// ============================================================
//  RULE EVALUATION
//  Checks each rule and assigns a score.
// ============================================================

function evaluateRules(password, charAnalysis, stackAnalysis, isCommon, seqResult, weakPatterns) {
    const { length, uppercaseCount, lowercaseCount, digitCount, specialCount, charTypes } = charAnalysis;

    const ruleMap = {};
    PASSWORD_RULES.forEach(r => {
        ruleMap[r.id] = { ...r, passed: false, score: 0 };
    });

    // Evaluate each rule
    ruleMap['length_min'].passed  = length >= 8;
    ruleMap['length_min'].score   = length >= 8 ? 1 : 0;

    ruleMap['length_good'].passed = length >= 12;
    ruleMap['length_good'].score  = length >= 12 ? 1 : 0;

    ruleMap['length_great'].passed = length >= 16;
    ruleMap['length_great'].score  = length >= 16 ? 1 : 0;

    ruleMap['uppercase'].passed   = uppercaseCount > 0;
    ruleMap['uppercase'].score    = uppercaseCount > 0 ? 1 : 0;

    ruleMap['lowercase'].passed   = lowercaseCount > 0;
    ruleMap['lowercase'].score    = lowercaseCount > 0 ? 1 : 0;

    ruleMap['digit'].passed       = digitCount > 0;
    ruleMap['digit'].score        = digitCount > 0 ? 1 : 0;

    ruleMap['special'].passed     = specialCount > 0;
    ruleMap['special'].score      = specialCount >= 2 ? 2 : (specialCount === 1 ? 1 : 0);

    ruleMap['no_common'].passed   = !isCommon;
    ruleMap['no_common'].score    = !isCommon ? 2 : 0;

    ruleMap['no_sequence'].passed = seqResult.found.length === 0;
    ruleMap['no_sequence'].score  = seqResult.found.length === 0 ? 1 : 0;

    ruleMap['no_repeat'].passed   = stackAnalysis.maxRepeatRun < 3;
    ruleMap['no_repeat'].score    = stackAnalysis.maxRepeatRun < 3 ? 1 : 0;

    ruleMap['char_variety'].passed = charTypes >= 3;
    ruleMap['char_variety'].score  = charTypes >= 3 ? 1 : 0;

    ruleMap['no_space'].passed    = charAnalysis.spaceCount === 0;
    ruleMap['no_space'].score     = 0; // Informational only

    return Object.values(ruleMap);
}

// ============================================================
//  STRENGTH LEVEL DETERMINATION
// ============================================================

function getStrengthLevel(score, isCommon) {
    // Immediately downgrade if password is in common list
    if (isCommon) {
        return { level: 'Very Weak', label: 'VERY WEAK', color: '#ef4444', percent: 5, index: 0 };
    }

    if (score <= 2)       return { level: 'Very Weak',  label: 'VERY WEAK',  color: '#ef4444', percent: 10,  index: 0 };
    if (score <= 4)       return { level: 'Weak',        label: 'WEAK',       color: '#f97316', percent: 30,  index: 1 };
    if (score <= 6)       return { level: 'Medium',      label: 'MEDIUM',     color: '#eab308', percent: 55,  index: 2 };
    if (score <= 8)       return { level: 'Strong',      label: 'STRONG',     color: '#22c55e', percent: 80,  index: 3 };
    return                       { level: 'Very Strong', label: 'VERY STRONG',color: '#06b6d4', percent: 100, index: 4 };
}

// ============================================================
//  SUGGESTION GENERATOR
//  Generates improvement suggestions as objects with priority.
//  Later sorted using Selection Sort.
// ============================================================

function generateSuggestions(rules, charAnalysis, stackAnalysis, seqResult, length) {
    const suggestions = [];

    const ruleMap = {};
    rules.forEach(r => { ruleMap[r.id] = r; });

    if (!ruleMap['length_min'].passed) {
        suggestions.push({ text: 'Use at least 8 characters — this is the bare minimum.', priority: 10, category: 'length' });
    } else if (!ruleMap['length_good'].passed) {
        suggestions.push({ text: 'Aim for 12+ characters for a significantly stronger password.', priority: 8, category: 'length' });
    } else if (!ruleMap['length_great'].passed) {
        suggestions.push({ text: 'Using 16+ characters makes brute-force attacks virtually impossible.', priority: 4, category: 'length' });
    }

    if (!ruleMap['no_common'].passed) {
        suggestions.push({ text: 'This is a commonly used password. Change it immediately!', priority: 10, category: 'common' });
    }

    if (!ruleMap['uppercase'].passed) {
        suggestions.push({ text: 'Add at least one uppercase letter (A-Z).', priority: 7, category: 'chars' });
    }

    if (!ruleMap['lowercase'].passed) {
        suggestions.push({ text: 'Add at least one lowercase letter (a-z).', priority: 7, category: 'chars' });
    }

    if (!ruleMap['digit'].passed) {
        suggestions.push({ text: 'Include at least one number (0-9).', priority: 6, category: 'chars' });
    }

    if (!ruleMap['special'].passed) {
        suggestions.push({ text: 'Add special characters like !@#$%^&* to greatly increase strength.', priority: 9, category: 'chars' });
    } else if (charAnalysis.specialCount === 1) {
        suggestions.push({ text: 'Adding a second special character boosts your score further.', priority: 3, category: 'chars' });
    }

    if (!ruleMap['no_sequence'].passed) {
        suggestions.push({ text: `Avoid sequential patterns (like "abc", "123", "qwerty") — detected: "${seqResult.found[0]}".`, priority: 8, category: 'pattern' });
    }

    if (!ruleMap['no_repeat'].passed) {
        suggestions.push({ text: `Avoid repeating the same character ${stackAnalysis.maxRepeatRun}+ times in a row.`, priority: 7, category: 'pattern' });
    }

    if (charAnalysis.spaceCount > 0) {
        suggestions.push({ text: 'Spaces in passwords can cause issues with some systems. Consider removing them.', priority: 5, category: 'chars' });
    }

    if (!ruleMap['char_variety'].passed) {
        suggestions.push({ text: `You're using ${charAnalysis.charTypes} character type(s). Try mixing uppercase, lowercase, digits, and symbols.`, priority: 6, category: 'variety' });
    }

    if (suggestions.length === 0) {
        suggestions.push({ text: 'Excellent! Your password is strong. Consider using a password manager to remember it.', priority: 1, category: 'tip' });
    }

    return suggestions;
}

// ============================================================
//  EMPTY RESULT (for empty password input)
// ============================================================

function getEmptyResult() {
    return {
        password: '',
        score: 0,
        maxScore: 10,
        strength: { level: 'Very Weak', label: 'VERY WEAK', color: '#ef4444', percent: 0, index: 0 },
        charAnalysis: {
            length: 0, uppercaseCount: 0, lowercaseCount: 0,
            digitCount: 0, specialCount: 0, spaceCount: 0,
            uniqueChars: 0, charTypes: 0, frequencyMap: {}, charDetails: []
        },
        stackAnalysis: { maxRepeatRun: 0, sameTypeRunCount: 0, stackTrace: [], problems: [], finalStackSize: 0 },
        setLookup: { isCommon: false },
        binarySearch: { isCommon: false, steps: 0, comparisons: [] },
        weakPatternsFound: [],
        seqResult: { found: [], totalSteps: 0 },
        evaluatedRules: PASSWORD_RULES.map(r => ({ ...r, passed: false, score: 0 })),
        sortedRules: PASSWORD_RULES.map(r => ({ ...r, passed: false, score: 0 })),
        sortMeta: { swaps: 0, passes: 0 },
        suggestions: [],
        totalRawScore: 0,
        maxRawScore: MAX_TOTAL_SCORE
    };
}
