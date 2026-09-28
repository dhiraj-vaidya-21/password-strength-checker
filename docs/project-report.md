# Password Strength Checker — Project Report
## DSA Academic Project

---

## Cover Page

| Field | Details |
|-------|---------|
| **Project Title** | Password Strength Checker using Data Structures & Algorithms |
| **Subject** | Data Structures and Algorithms (DSA) |
| **Project Type** | Academic / College Project |
| **Technology** | HTML, CSS, JavaScript (Vanilla) |
| **Platform** | Web Browser (Client-Side Only) |

---

## 1. Introduction

In the era of digital transformation, passwords serve as the primary gateway to personal and sensitive data. With cyberattacks becoming increasingly sophisticated, the importance of using strong passwords cannot be overstated. According to the Verizon Data Breach Investigations Report, over 80% of hacking-related breaches involve compromised or weak passwords.

This project presents a **Password Strength Checker** built as a DSA academic project, showcasing how fundamental data structures and algorithms — Stack, Arrays, Hash Sets, Linear Search, Binary Search, Bubble Sort, and Selection Sort — can be meaningfully applied to analyze and evaluate password security in real-time.

---

## 2. Problem Statement

### 2.1 Background
Most internet users tend to choose simple, predictable passwords such as "123456", "password", or "qwerty". These passwords are trivially cracked by attackers using dictionary attacks or brute-force methods.

### 2.2 The Problem
There is a lack of immediate, educational feedback that:
1. Tells users **why** their password is weak
2. Shows **which specific rules** are being violated
3. Demonstrates the **algorithmic process** behind the analysis
4. Provides **prioritized suggestions** for improvement

### 2.3 Proposed Solution
A browser-based password strength analyzer that:
- Uses DSA concepts for analysis
- Provides real-time visual feedback
- Explains the algorithms used
- Never stores or transmits the password

---

## 3. System Design

### 3.1 Architecture

```
User Input (Password)
        │
        ▼
   [index.html]
   UI Layer (HTML/CSS)
        │
        ▼
   [script.js]
   UI Controller
        │
        ├──────────────────────────────────┐
        ▼                                  ▼
  [passwordAnalyzer.js]           [Visualization Engine]
  Core Analysis Engine             Renders DSA steps
        │
        ├── [stack.js]         → Stack class, analyzeWithStack()
        ├── [searching.js]     → linearSearchPattern(), binarySearch()
        └── [sorting.js]       → bubbleSort(), selectionSort()
```

### 3.2 Data Flow

```
Password String
      │
      ├─ traversePassword()       → charAnalysis object
      ├─ analyzeWithStack()       → stackAnalysis object
      ├─ COMMON_PASSWORDS_SET.has() → boolean
      ├─ binarySearch()           → {found, steps, comparisons}
      ├─ linearSearchPattern()    → {found, index, steps}
      ├─ detectSequentialPatterns() → {found[], totalSteps}
      ├─ evaluateRules()          → evaluatedRules[]
      ├─ sortRulesByScore()       → sortedRules[]
      ├─ generateSuggestions()    → suggestions[]
      └─ sortSuggestionsByPriority() → sortedSuggestions[]
```

---

## 4. Implementation Details

### 4.1 Stack Data Structure

**File:** `js/stack.js`

The Stack class is implemented using a JavaScript Array as internal storage:

```javascript
class Stack {
    constructor() {
        this.items = [];  // Internal array storage
        this.size = 0;
    }
    push(item)  { this.items.push(item); this.size++; }
    pop()       { return this.isEmpty() ? null : (this.size--, this.items.pop()); }
    peek()      { return this.isEmpty() ? null : this.items[this.size - 1]; }
    isEmpty()   { return this.size === 0; }
    getSize()   { return this.size; }
}
```

**Application:** `analyzeWithStack(password)` pushes each character, uses peek() to compare with the previous character, detecting repeat runs.

### 4.2 Searching Algorithms

**File:** `js/searching.js`

#### Linear Search
```javascript
function linearSearchPattern(text, pattern) {
    for (let i = 0; i <= n - m; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) { match = false; break; }
        }
        if (match) return { found: true, index: i };
    }
    return { found: false, index: -1 };
}
```

#### Binary Search
```javascript
function binarySearch(sortedArray, target) {
    let low = 0, high = sortedArray.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (sortedArray[mid] === target) return { found: true, index: mid };
        else if (sortedArray[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return { found: false, index: -1 };
}
```

### 4.3 Sorting Algorithms

**File:** `js/sorting.js`

Both sorting algorithms work on arrays of objects, sorting by a specified key:

#### Bubble Sort (descending by score)
- Used for: sorting password rules by their score contribution
- Highest-scoring rules appear first
- Tracks swaps and passes for visualization

#### Selection Sort (descending by priority)
- Used for: sorting improvement suggestions
- Highest-priority suggestions shown first
- Tracks how many selections were made

---

## 5. Password Scoring System

| Rule | Points | Rationale |
|------|--------|-----------|
| Length ≥ 8 | 1 | Minimum standard |
| Length ≥ 12 | 1 | Recommended for security |
| Length ≥ 16 | 1 | Excellent length |
| Uppercase | 1 | Character class diversity |
| Lowercase | 1 | Character class diversity |
| Digit | 1 | Numeric diversity |
| Special (1) | 1 | Special char diversity |
| Special (2+) | 2 | Even stronger |
| Not common | 2 | Most important check |
| No sequence | 1 | Avoid predictability |
| No repeats | 1 | Avoid repetition |
| 3+ char types | 1 | Overall variety |

**Scoring Formula:**
```
score = (totalRawScore / 13) × 10
strengthLevel = f(score, isCommon)
```

---

## 6. Testing

### 6.1 Test Results Summary

| Password | Score | Strength |
|----------|-------|---------|
| 123456 | 1/10 | Very Weak |
| password | 2/10 | Very Weak |
| Password123 | 5/10 | Medium |
| Password@123 | 7/10 | Strong |
| P@ssw0rd!2026 | 7/10 | Strong |
| abcdef | 1/10 | Very Weak |
| AAAAAAAA | 1/10 | Very Weak |
| Aa1! | 4/10 | Weak |
| Qwerty123 | 4/10 | Weak |
| A_long_and_complex_password@2026 | 8/10 | Strong |

### 6.2 Security Verification
- ✅ No `console.log(password)` anywhere in codebase
- ✅ No `localStorage.setItem()` or `sessionStorage.setItem()`
- ✅ No `fetch()`, `XMLHttpRequest`, or `WebSocket` usage
- ✅ Analysis result shows `password: '***HIDDEN***'`
- ✅ `autocomplete="new-password"` prevents browser password saving

---

## 7. Conclusion

This project successfully demonstrates the practical application of Data Structures and Algorithms in a real-world security context. The Password Strength Checker:

1. ✅ Implements **8 distinct DSA concepts** — all visibly in action
2. ✅ Analyzes passwords in real-time with dynamic feedback
3. ✅ Provides visual demonstrations of each algorithm's operation
4. ✅ Shows time and space complexity for each component
5. ✅ Ensures complete privacy — password never leaves the browser
6. ✅ Is mobile-responsive and accessible

The project demonstrates that DSA is not just a theoretical subject — it has direct, practical applications in everyday software development, including cybersecurity.

---

*End of Project Report*
