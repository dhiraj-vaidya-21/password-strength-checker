/**
 * ============================================================
 *  STACK DATA STRUCTURE IMPLEMENTATION
 *  DSA Concept: Stack (LIFO - Last In, First Out)
 * ============================================================
 *
 *  Stack is used in this project to:
 *  1. Process password characters one by one (push each char).
 *  2. Detect consecutive/sequential runs of same character type.
 *  3. Analyze pattern depth (how deeply nested a pattern goes).
 *
 *  Time Complexity:
 *    push()    → O(1)
 *    pop()     → O(1)
 *    peek()    → O(1)
 *    isEmpty() → O(1)
 *
 *  Space Complexity: O(n) where n = number of elements pushed.
 */

class Stack {
    constructor() {
        // Internal storage array
        this.items = [];
        this.size = 0;
    }

    /**
     * push(item) - Add an element to the top of the stack
     * Time Complexity: O(1)
     */
    push(item) {
        this.items.push(item);
        this.size++;
    }

    /**
     * pop() - Remove and return the top element
     * Time Complexity: O(1)
     * Returns null if stack is empty
     */
    pop() {
        if (this.isEmpty()) return null;
        this.size--;
        return this.items.pop();
    }

    /**
     * peek() - Return top element without removing it
     * Time Complexity: O(1)
     * Returns null if stack is empty
     */
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }

    /**
     * isEmpty() - Check if stack has no elements
     * Time Complexity: O(1)
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * getSize() - Return number of elements in stack
     * Time Complexity: O(1)
     */
    getSize() {
        return this.size;
    }

    /**
     * clear() - Remove all elements from the stack
     * Time Complexity: O(1)
     */
    clear() {
        this.items = [];
        this.size = 0;
    }

    /**
     * toArray() - Return a copy of the stack as array (bottom → top)
     * Time Complexity: O(n)
     */
    toArray() {
        return [...this.items];
    }
}

/**
 * ============================================================
 *  CHARACTER PATTERN ANALYZER using Stack
 * ============================================================
 *  Analyzes the password by pushing characters onto a Stack
 *  and detecting:
 *    - Repeating character runs (e.g., "aaa", "111")
 *    - Consecutive same-type runs (all digits, all letters, etc.)
 *
 *  Returns an object with:
 *    - maxRepeatRun   : longest run of the same character
 *    - sameTypeRuns   : count of consecutive same-type sequences
 *    - stackTrace     : array showing stack state at each step
 *    - problems       : array of detected pattern problems
 */
function analyzeWithStack(password) {
    const stack = new Stack();
    const stackTrace = [];
    const problems = [];

    let maxRepeatRun = 0;
    let currentRun = 0;
    let prevChar = null;

    // --- Track same-type consecutive runs ---
    // Types: 'upper', 'lower', 'digit', 'special'
    let sameTypeRunCount = 0;
    let currentTypeRun = 0;
    let prevType = null;

    // Helper: classify a character
    function getCharType(ch) {
        if (/[A-Z]/.test(ch)) return 'upper';
        if (/[a-z]/.test(ch)) return 'lower';
        if (/[0-9]/.test(ch)) return 'digit';
        return 'special';
    }

    for (let i = 0; i < password.length; i++) {
        const ch = password[i];
        const charType = getCharType(ch);

        // --- Stack Operation: push current character ---
        stack.push(ch);

        // --- Detect repeat run ---
        if (ch === prevChar) {
            currentRun++;
        } else {
            if (currentRun > maxRepeatRun) maxRepeatRun = currentRun;
            currentRun = 1;
        }

        // --- Detect same-type run ---
        if (charType === prevType) {
            currentTypeRun++;
        } else {
            if (currentTypeRun >= 4) sameTypeRunCount++;
            currentTypeRun = 1;
        }

        prevChar = ch;
        prevType = charType;

        // Record stack trace (snapshot of top 5 items)
        const snapshot = stack.toArray().slice(-5);
        stackTrace.push({
            step: i + 1,
            char: ch,
            type: charType,
            stackTop: stack.peek(),
            stackSize: stack.getSize(),
            snapshot: [...snapshot]
        });
    }

    // Final update
    if (currentRun > maxRepeatRun) maxRepeatRun = currentRun;
    if (currentTypeRun >= 4) sameTypeRunCount++;

    // --- Identify problems ---
    if (maxRepeatRun >= 3) {
        problems.push(`Repeated character detected (run of ${maxRepeatRun})`);
    }
    if (sameTypeRunCount > 0) {
        problems.push(`Long same-type character runs detected (${sameTypeRunCount} run(s) of 4+)`);
    }

    return {
        maxRepeatRun,
        sameTypeRunCount,
        stackTrace,
        problems,
        finalStackSize: stack.getSize()
    };
}
