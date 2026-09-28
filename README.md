# 🔐 Password Strength Checker using Data Structures & Algorithms

> **A complete college-level DSA project** demonstrating real-world application of Data Structures and Algorithms in browser-based password security analysis.

---

## 📌 Project Title

**Password Strength Checker using Data Structures and Algorithms**

---

## 📖 Introduction

Passwords are the primary defense mechanism for protecting digital accounts and sensitive data. A weak password can be cracked in seconds using brute-force or dictionary attacks, while a strong password can take years to crack. This project implements a **Password Strength Checker** that uses fundamental **Data Structures and Algorithms (DSA)** to analyze passwords and determine their strength.

The project is designed as a college-level DSA academic project that clearly demonstrates how theoretical concepts — Stack, Arrays, Sets, Searching, and Sorting — can be applied to solve a real-world security problem.

---

## 🎯 Problem Statement

Most users choose weak passwords because they do not receive immediate, detailed feedback about what makes a password strong or weak. Existing password checkers often use simple rule checks without demonstrating the algorithmic concepts behind them.

**This project addresses:**
- The need for intelligent password analysis
- The visual demonstration of DSA concepts applied to password checking
- Providing clear, actionable feedback to improve password strength
- Educating users about what constitutes a strong password

---

## 🏆 Objectives

1. Implement a password strength analyzer using multiple DSA concepts
2. Demonstrate **String traversal**, **Stack**, **Arrays**, **Hash Set**, **Linear Search**, **Binary Search**, **Bubble Sort**, and **Selection Sort**
3. Build a modern, interactive web-based interface
4. Provide real-time feedback and improvement suggestions
5. Visualize each DSA algorithm's operation step-by-step
6. Document time and space complexity for each algorithm
7. Ensure passwords are never stored, logged, or transmitted
8. Make the project easy to demonstrate during a college viva

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔤 **String Traversal** | Character-by-character analysis of the password |
| 📦 **Array-based Rules** | Password requirements defined and stored in arrays |
| 🗄️ **Hash Set Lookup** | O(1) common password detection using JavaScript Set |
| 📚 **Stack Processing** | LIFO-based repeat and pattern analysis |
| 🔍 **Linear Search** | Sequential pattern detection inside passwords |
| 🔎 **Binary Search** | Fast lookup on sorted common-password list |
| 🔄 **Bubble Sort** | Rules sorted by score contribution |
| 🔃 **Selection Sort** | Suggestions sorted by priority |
| 📊 **Live Visualizations** | Real-time display of each DSA operation |
| ⏱️ **Complexity Analysis** | Time and Space complexity shown live |
| 💡 **Smart Suggestions** | Prioritized improvement tips |
| 🛡️ **Privacy-First** | Password never stored or transmitted |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic page structure |
| **CSS3** | Glassmorphism design, animations, responsive layout |
| **JavaScript (ES6+)** | All DSA logic, UI control |
| **Google Fonts** | Inter & JetBrains Mono typography |
| **No frameworks** | Pure Vanilla JS — no React, Vue, Angular |
| **No backend** | 100% client-side processing |
| **No database** | No data persistence of any kind |

---

## 🧠 DSA Concepts Used

### 1. Strings
- Password is treated as a **character string**
- Traversed **character-by-character** using a `for` loop
- Each character classified as: uppercase, lowercase, digit, special, space
- A **frequency map** (hash map) built to count occurrences
- **Time Complexity:** O(n) where n = password length
- **Space Complexity:** O(k) where k = number of unique characters

### 2. Arrays
- `PASSWORD_RULES` — Array of rule objects with name, description, maxScore
- `COMMON_PASSWORDS_SORTED` — Sorted array for Binary Search
- `WEAK_PATTERNS` — Array of patterns for Linear Search
- `SEQUENTIAL_PATTERNS` — Array of keyboard sequences
- Evaluation results stored as arrays, then sorted
- **Access Complexity:** O(1) | **Search Complexity:** O(n)

### 3. Hash Set (Hashing)
- JavaScript `Set` used as a **hash table**
- Provides **O(1) average** common-password lookup
- Internally uses hashing to store unique values
- Demonstrates the difference between O(n) linear lookup vs O(1) hash lookup
- **Time Complexity:** O(1) average | **Space Complexity:** O(m) where m = list size

### 4. Stack (LIFO — Last In First Out)
- Custom `Stack` class implemented from scratch
- `push(item)` — Add character to top: O(1)
- `pop()` — Remove from top: O(1)
- `peek()` — View top without removing: O(1)
- `isEmpty()` — Check if empty: O(1)
- **Use case:** Detect maximum repeat-character runs (e.g., "aaa", "111")
- Each character pushed onto stack; peek() compared with current char to detect runs
- **Time Complexity:** O(1) per operation | **Space Complexity:** O(n)

### 5. Linear Search
- Manually implemented (no built-in methods)
- Searches for weak sub-patterns inside the password string
- Scans each character sequentially until pattern found or end reached
- Used for: sequential patterns (abc, 123, qwerty) and common sub-strings
- **Time Complexity:** O(n × m × p) — n=password length, m=pattern length, p=patterns
- **Space Complexity:** O(1) extra space

### 6. Binary Search
- Manually implemented on a **sorted** common-password array
- Halves the search space at each step — much faster than linear search
- Requires sorted input (array pre-sorted alphabetically)
- Shows step-by-step comparison process in visualization
- **Time Complexity:** O(log n) | **Space Complexity:** O(1)

### 7. Bubble Sort
- Manually implemented with optimization (early termination)
- Sorts password rules by their score contribution (descending)
- Each pass "bubbles" the highest-scoring unplaced rule to its correct position
- Tracks number of swaps and passes for visualization
- **Time Complexity:** O(n²) worst/average | O(n) best | **Space Complexity:** O(1)

### 8. Selection Sort
- Manually implemented without built-in sort()
- Sorts improvement suggestions by priority level (descending)
- In each iteration, finds the highest-priority suggestion and places it
- **Time Complexity:** O(n²) all cases | **Space Complexity:** O(1)

---

## 📁 Project Structure

```
password-strength-checker/
│
├── index.html              ← Main HTML page (semantic, accessible)
├── style.css               ← Complete stylesheet (dark theme, animations)
├── script.js               ← Main UI controller
│
├── js/
│   ├── stack.js            ← Stack class + analyzeWithStack()
│   ├── searching.js        ← linearSearchPattern(), binarySearch(), detectSequentialPatterns()
│   ├── sorting.js          ← bubbleSort(), selectionSort(), sortRulesByScore(), sortSuggestionsByPriority()
│   └── passwordAnalyzer.js ← Main analysis engine (orchestrates all DSA modules)
│
└── README.md               ← This file (complete documentation)
```

---

## ⚙️ Password Strength Algorithm

```
FUNCTION analyzePassword(password):

  // STEP 1: String Traversal — O(n)
  FOR each character ch in password:
    IF ch is uppercase: uppercaseCount++
    IF ch is lowercase: lowercaseCount++
    IF ch is digit:     digitCount++
    IF ch is special:   specialCount++
    frequencyMap[ch]++   // hash map update

  // STEP 2: Stack Analysis — O(n)
  FOR each character ch in password:
    stack.push(ch)              // O(1)
    IF ch == prevChar:
      currentRun++
    maxRepeatRun = MAX(maxRepeatRun, currentRun)

  // STEP 3: Hash Set Lookup — O(1) average
  isCommon ← COMMON_PASSWORDS_SET.has(password)

  // STEP 4: Binary Search — O(log n)
  isCommonBinary ← binarySearch(SORTED_PASSWORDS, password)

  // STEP 5: Linear Search — O(n × m × p)
  FOR each pattern in SEQUENTIAL_PATTERNS:
    IF linearSearch(password, pattern).found:
      foundPatterns.add(pattern)

  // STEP 6: Evaluate Rules
  FOR each rule in PASSWORD_RULES:
    rule.score ← evaluate(rule, analysisData)

  // STEP 7: Bubble Sort rules by score — O(r²)
  sortedRules ← bubbleSort(rules, 'score', descending)

  // STEP 8: Calculate total score
  totalScore ← SUM of all rule scores
  normalizedScore ← (totalScore / MAX_SCORE) × 10

  // STEP 9: Determine strength level
  strength ← getStrengthLevel(normalizedScore, isCommon)

  // STEP 10: Generate + Selection Sort suggestions — O(s²)
  suggestions ← generateSuggestions(rules, analysis)
  sortedSuggestions ← selectionSort(suggestions, 'priority', descending)

  RETURN {score, strength, sortedRules, sortedSuggestions, ...}
```

---

## 📋 Step-by-Step Working

1. **User types a password** → `input` event fires
2. **String traversal** → Each character visited O(n), types counted, frequency map built
3. **Stack processing** → Characters pushed to Stack, repeat runs detected
4. **Hash Set lookup** → Password checked against Set (O(1))
5. **Binary Search** → Password searched in sorted array (O(log n))
6. **Linear Search** → Weak patterns scanned (O(n·m·p))
7. **Rule evaluation** → Each of 12 rules scored
8. **Bubble Sort** → Rules ordered by score (highest first)
9. **Suggestion generation** → Problems converted to tips
10. **Selection Sort** → Tips ordered by priority
11. **Score calculation** → Total score normalized to /10
12. **UI update** → Strength bar, checklist, suggestions, visualizations all updated

---

## 📊 Flowchart

```
         START
           │
           ▼
    [Enter Password]
           │
           ▼
   [String Traversal - O(n)]
   Count: upper, lower, digit,
   special, space, unique chars
           │
           ▼
   [Stack Analysis - O(n)]
   Push each char, detect
   repeat runs, same-type runs
           │
           ▼
   [Hash Set Lookup - O(1)]
   Is password in common Set?
      YES ──────────────┐
       │                │
       NO               │
       │                │
       ▼                │
  [Binary Search       │
   O(log n)]           │
   Search sorted list   │
           │            │
           ▼            │
  [Linear Search        │
   O(n·m·p)]           │
   Find weak patterns   │
           │            │
           ▼            │
   [Evaluate 12 Rules]  │
   Score each rule       │
           │            │
           ▼            │
   [Bubble Sort O(r²)]  │
   Sort rules by score  │
           │            │
           ▼            ▼
   [Calculate Score] ← ─┘
   Determine Strength:
   Very Weak / Weak / Medium
   Strong / Very Strong
           │
           ▼
   [Selection Sort O(s²)]
   Sort suggestions by priority
           │
           ▼
   [Display Result]
   Strength bar, score, checklist,
   suggestions, DSA visualizations
           │
           ▼
          END
```

---

## 📐 Pseudocode

### Stack Class
```
CLASS Stack:
  items = []
  size = 0

  FUNCTION push(item):
    items.append(item)
    size++

  FUNCTION pop():
    IF isEmpty(): RETURN null
    size--
    RETURN items.removeLast()

  FUNCTION peek():
    IF isEmpty(): RETURN null
    RETURN items[size - 1]

  FUNCTION isEmpty():
    RETURN size == 0
```

### Binary Search
```
FUNCTION binarySearch(sortedArray, target):
  low = 0
  high = length(sortedArray) - 1

  WHILE low <= high:
    mid = floor((low + high) / 2)
    IF sortedArray[mid] == target:
      RETURN {found: true, index: mid}
    ELSE IF sortedArray[mid] < target:
      low = mid + 1     // search right half
    ELSE:
      high = mid - 1    // search left half

  RETURN {found: false, index: -1}
```

### Bubble Sort
```
FUNCTION bubbleSort(array, key):
  n = length(array)

  FOR i FROM 0 TO n-2:
    swapped = false
    FOR j FROM 0 TO n-i-2:
      IF array[j][key] < array[j+1][key]:  // descending
        SWAP(array[j], array[j+1])
        swapped = true
    IF NOT swapped: BREAK  // optimization

  RETURN array
```

### Selection Sort
```
FUNCTION selectionSort(array, key):
  n = length(array)

  FOR i FROM 0 TO n-2:
    maxIdx = i
    FOR j FROM i+1 TO n-1:
      IF array[j][key] > array[maxIdx][key]:
        maxIdx = j
    SWAP(array[i], array[maxIdx])

  RETURN array
```

---

## ⏱️ Time Complexity Summary

| Operation | Algorithm | Best Case | Average Case | Worst Case |
|-----------|-----------|-----------|--------------|------------|
| String Traversal | Single loop | O(n) | O(n) | O(n) |
| Stack Operations | push/pop/peek | O(1) | O(1) | O(1) |
| Hash Set Lookup | Hashing | O(1) | O(1) | O(n)* |
| Binary Search | Divide & Conquer | O(1) | O(log n) | O(log n) |
| Linear Search | Sequential scan | O(1) | O(n·m·p) | O(n·m·p) |
| Bubble Sort | Adjacent swaps | O(n) | O(n²) | O(n²) |
| Selection Sort | Min/Max finding | O(n²) | O(n²) | O(n²) |
| **Overall Analysis** | All combined | — | O(n·m·p) | O(n·m·p) |

*Hash collisions (rare)

**Where:** n = password length, m = pattern length, p = number of patterns, r = number of rules, s = number of suggestions

---

## 📦 Space Complexity Summary

| Data Structure | Space Used | Notes |
|---------------|-----------|-------|
| Stack | O(n) | Stores password characters |
| Frequency Map | O(k) | k = unique chars (max 95 printable ASCII) |
| Common Passwords Set | O(m) | m = ~65 passwords in Set |
| Sorted Array | O(m) | Same passwords in sorted order |
| Rules Array | O(r) | r = 12 rules (constant) |
| Suggestions Array | O(s) | s ≤ 10 suggestions (bounded) |
| **Total Extra Space** | **O(n + m)** | Dominated by Stack + Set |

---

## ✅ Password Analysis Rules

| # | Rule | Max Score | Notes |
|---|------|-----------|-------|
| 1 | Minimum Length (8+) | 1 | Bare minimum |
| 2 | Good Length (12+) | 1 | Recommended |
| 3 | Great Length (16+) | 1 | Very strong |
| 4 | Uppercase Letter | 1 | A-Z present |
| 5 | Lowercase Letter | 1 | a-z present |
| 6 | Digit Present | 1 | 0-9 present |
| 7 | Special Character | 2 | 1 char = 1pt, 2+ = 2pt |
| 8 | Not Common Password | 2 | Highest weight |
| 9 | No Sequential Pattern | 1 | No abc/123/qwerty |
| 10 | No Excessive Repeats | 1 | No aaa/111 |
| 11 | High Char Variety | 1 | 3+ types used |
| 12 | No Spaces | 0 | Informational |

**Total Max Score: 13 (normalized to 10)**

---

## 🎯 Strength Levels

| Level | Score | Color | Description |
|-------|-------|-------|-------------|
| Very Weak | 0–2 | 🔴 Red | Common or extremely weak |
| Weak | 3–4 | 🟠 Orange | Fails multiple checks |
| Medium | 5–6 | 🟡 Yellow | Passes most basic checks |
| Strong | 7–8 | 🟢 Green | Good password |
| Very Strong | 9–10 | 🔵 Cyan | Excellent password |

---

## 🧪 Test Cases

### Test 1: `123456`
- **Characteristics:** Only digits, sequential, very common
- **Problems:** Common password (Set hit), sequential (123, 234, 345, 456), no uppercase, no lowercase, no special char, short (6 chars)
- **Score:** 1/10
- **Strength:** Very Weak
- **Suggestion:** Change immediately — this is the #1 most common password

### Test 2: `password`
- **Characteristics:** Only lowercase, common word
- **Problems:** Common password, no uppercase, no digit, no special, short
- **Score:** 2/10
- **Strength:** Very Weak
- **Suggestion:** Change immediately

### Test 3: `Password123`
- **Characteristics:** Mixed case + digits, no special chars
- **Problems:** No special character, length borderline, common pattern
- **Score:** 5/10
- **Strength:** Medium
- **Suggestion:** Add at least one special character

### Test 4: `Password@123`
- **Characteristics:** Upper + lower + digit + special, 12 chars
- **Problems:** Minor — contains common sub-word "password"
- **Score:** 7/10
- **Strength:** Strong
- **Suggestion:** Consider making it less predictable

### Test 5: `P@ssw0rd!2026`
- **Characteristics:** All 4 types, 14 chars, good variety
- **Problems:** Contains "passw0rd" (leet-speak of common password detected in linear search)
- **Score:** 7/10
- **Strength:** Strong
- **Suggestion:** Avoid password-like base words

### Test 6: `abcdef`
- **Characteristics:** Only lowercase, sequential
- **Problems:** Sequential (abc, bcd, cde, def), no variety, short
- **Score:** 1/10
- **Strength:** Very Weak
- **Suggestion:** Completely change approach

### Test 7: `AAAAAAAA`
- **Characteristics:** Single repeated character
- **Problems:** Stack detects repeat run of 8, no lowercase/digit/special, common
- **Score:** 1/10
- **Strength:** Very Weak
- **Suggestion:** Never repeat the same character

### Test 8: `Aa1!`
- **Characteristics:** All 4 types but very short
- **Problems:** Length only 4 (fails all length checks)
- **Score:** 4/10
- **Strength:** Weak
- **Suggestion:** Extend to at least 12 characters

### Test 9: `Qwerty123`
- **Characteristics:** Keyboard pattern + digits
- **Problems:** Sequential keyboard pattern "qwerty", no special char
- **Score:** 4/10
- **Strength:** Weak
- **Suggestion:** Avoid keyboard patterns

### Test 10: `A_long_and_complex_password@2026`
- **Characteristics:** 32 chars, all types, long
- **Problems:** Contains "password" sub-string (linear search catch), otherwise very strong
- **Score:** 8/10
- **Strength:** Strong
- **Suggestion:** Replace "password" word in the middle

---

## 🔒 Security Requirements

> **Important:** This project follows strict security best practices:

- ✅ Password processed **only in the browser** (client-side JavaScript)
- ✅ Password is **never stored** in localStorage, sessionStorage, or cookies
- ✅ Password is **never transmitted** over network (no fetch, no XHR)
- ✅ Password is **never logged** to the browser console
- ✅ Password is displayed as `***HIDDEN***` in all analysis output objects
- ✅ The `autocomplete="new-password"` attribute prevents browser from saving
- ✅ No backend server, no API endpoints, no database

---

## ▶️ How to Run

### Method 1: Direct File Open
1. Download / clone the project
2. Open `index.html` in any modern browser
3. No installation, no server required

### Method 2: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Open the project folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

### Method 3: Using Python HTTP Server
```bash
cd password-strength-checker
python -m http.server 3000
# Then open http://localhost:3000
```

### Method 4: Using Node.js
```bash
npx serve .
# or
npx http-server .
```

### Browser Compatibility
Works in: Chrome 80+, Firefox 75+, Edge 80+, Safari 14+

---

## 🌟 Advantages

1. **Educational Value** — Visually demonstrates DSA concepts in action
2. **Real-World Application** — Solves an actual security problem
3. **Privacy First** — Zero data collection or transmission
4. **No Dependencies** — Pure HTML/CSS/JS, no npm, no frameworks
5. **Fast** — All operations run in O(n·m·p) at most — milliseconds
6. **Responsive** — Works on all screen sizes
7. **Accessible** — ARIA labels, semantic HTML, keyboard navigation
8. **Easy to Explain** — Simple, well-commented, modular code

---

## ⚠️ Limitations

1. **Client-side only** — Cannot check against real breach databases (like HaveIBeenPwned)
2. **Local common list** — Only 65 common passwords; real tools check millions
3. **No entropy calculation** — Formal entropy-based strength not implemented
4. **Browser dependent** — Requires JavaScript enabled
5. **No password history** — Cannot check if same password was used before
6. **Pattern library limited** — Sequential pattern list is not exhaustive
7. **Not a security tool** — This is an educational/academic project

---

## 🚀 Future Scope

1. **HaveIBeenPwned API Integration** — Check against 10+ billion breached passwords
2. **Entropy Calculation** — Mathematical password entropy (bits of randomness)
3. **Password Generator** — Generate strong random passwords
4. **Trie Data Structure** — Store common passwords in a Trie for prefix search
5. **Dijkstra's Algorithm** — Model keyboard adjacency as a graph for better qwerty detection
6. **More Sorting Algorithms** — Add Merge Sort, Quick Sort for comparison
7. **Zxcvbn Integration** — Industry-standard password strength estimator
8. **PWA (Progressive Web App)** — Installable, offline-capable app

---

## 📸 Screenshots

*(Run the project and take screenshots to add here)*

| Screen | Description |
|--------|-------------|
| Main Interface | Password input with strength meter |
| Weak Password | `123456` showing Very Weak |
| Strong Password | Complex password showing Very Strong |
| DSA Visualization | Stack, Search, Sort tabs |
| Complexity Panel | All algorithm complexities displayed |

---

## 🎓 Viva Questions & Answers

### Q1. What is a Stack data structure?
**A:** A Stack is a linear data structure that follows the **LIFO (Last In, First Out)** principle — the last element added is the first one removed. It has four main operations: push (add), pop (remove), peek (view top), and isEmpty (check empty). Think of it like a stack of plates — you always add and remove from the top.

### Q2. Why did you use a Stack in this project?
**A:** We use a Stack to process password characters one by one. Each character is pushed onto the Stack, and we use peek() to compare it with the top element to detect if the same character is repeating (e.g., "aaa" or "111"). This demonstrates a practical use of Stack beyond just undo/redo operations.

### Q3. What is LIFO?
**A:** LIFO stands for **Last In, First Out**. It means the element inserted last is the one removed first. A Stack operates on this principle. In contrast, a Queue operates on FIFO (First In, First Out).

### Q4. What is an Array?
**A:** An Array is a linear data structure that stores elements in **contiguous memory locations**, each accessible by an index. Array operations: access O(1), search O(n), insertion O(n), deletion O(n). In this project, Arrays store the list of common passwords, weak patterns, and rule definitions.

### Q5. Why did you use a Set (Hash Set)?
**A:** A Set internally uses **hashing** to store unique values, providing O(1) average time for lookup operations — much faster than linear search through an Array (O(n)). We use the Set to check if a password is a common one. This demonstrates the practical advantage of hash-based data structures.

### Q6. What is Hashing?
**A:** Hashing is the process of converting data (like a string) into a fixed-size value (hash code) using a hash function. This hash code determines where the item is stored in memory. Ideal hashing gives O(1) average lookup. JavaScript's `Set` and `Map` use hashing internally.

### Q7. What is the difference between Linear Search and Binary Search?
**A:** 
- **Linear Search:** Checks each element one by one from start to end. O(n) time. Works on unsorted data.
- **Binary Search:** Divides the search space in half at each step. O(log n) time. **Requires sorted data.**
- For 64 passwords: Linear takes up to 64 comparisons; Binary takes at most log₂(64) = 6 comparisons.

### Q8. Why must Binary Search work on sorted data?
**A:** Binary Search compares the target with the middle element and decides to go left or right. This decision is only valid if data is sorted — otherwise we cannot determine which half contains the target. That's why our `COMMON_PASSWORDS_SORTED` array is pre-sorted alphabetically.

### Q9. What is Bubble Sort and why did you choose it?
**A:** Bubble Sort repeatedly compares adjacent elements and swaps them if they're in the wrong order. Each pass "bubbles" the largest element to its correct position. We chose it because:
1. It's easy to understand and explain
2. It visually shows the sorting process clearly
3. Time complexity O(n²) is acceptable for small arrays (12 rules)

### Q10. What is the difference between Bubble Sort and Selection Sort?
**A:**
- **Bubble Sort:** Swaps adjacent elements repeatedly. Many swaps per pass.
- **Selection Sort:** Finds min/max and places it. At most one swap per pass.
- Both are O(n²) but Selection Sort does fewer swaps (O(n) swaps vs O(n²) for Bubble Sort).

### Q11. What is Time Complexity?
**A:** Time Complexity measures how the execution time of an algorithm grows as the input size increases. Expressed using Big-O notation. Common examples:
- O(1) — constant time (e.g., Stack peek)
- O(log n) — logarithmic (e.g., Binary Search)
- O(n) — linear (e.g., traversing password)
- O(n²) — quadratic (e.g., Bubble Sort)

### Q12. What is Space Complexity?
**A:** Space Complexity measures how much extra memory an algorithm uses relative to input size. Examples in this project:
- Stack: O(n) — stores all password characters
- Binary Search: O(1) — uses only a few variables
- Bubble Sort: O(1) — in-place, no extra arrays needed

### Q13. What is O(n) and why is password traversal O(n)?
**A:** O(n) means the time taken grows **linearly** with input size n. Password traversal is O(n) because we visit each character **exactly once** in a single for loop. If the password has 10 characters, we do 10 iterations; 100 characters → 100 iterations. Each iteration is O(1) work.

### Q14. What is O(1) and where is it used?
**A:** O(1) means **constant time** — the operation takes the same time regardless of input size. In this project: Stack push/pop/peek, Hash Set lookup. No matter how large the password list, Set.has() always takes about the same time.

### Q15. How does the password scoring algorithm work?
**A:** We define 12 rules, each with a maximum score (max total = 13 points). Each rule is evaluated (pass/fail) and scored. The total raw score is normalized to a 0-10 scale: `score = (rawScore / 13) × 10`. Then rules are sorted by score using Bubble Sort, and strength level is determined by the final score.

### Q16. Which DSA concepts are actually implemented (not just mentioned)?
**A:** All DSA concepts are actually implemented in code:
1. **Strings** — `for` loop traversal in `traversePassword()`
2. **Arrays** — `PASSWORD_RULES`, `COMMON_PASSWORDS_SORTED`, `WEAK_PATTERNS`
3. **Hash Set** — JavaScript `Set` with `.has()` for O(1) lookup
4. **Stack** — Custom `Stack` class in `stack.js` with push/pop/peek/isEmpty
5. **Linear Search** — `linearSearchPattern()` in `searching.js`
6. **Binary Search** — `binarySearch()` in `searching.js`
7. **Bubble Sort** — `bubbleSort()` in `sorting.js`
8. **Selection Sort** — `selectionSort()` in `sorting.js`

### Q17. Why shouldn't passwords be stored?
**A:** If passwords are stored (especially in plain text), a data breach exposes all user passwords. Even hashed passwords can be cracked with rainbow tables. Best practice: passwords should only be compared at authentication time and never persisted unnecessarily. This project never stores, logs, or transmits the password.

### Q18. What is the difference between authentication and password strength checking?
**A:**
- **Authentication** — Verifying that a user is who they claim to be (comparing entered password with stored hash)
- **Password Strength Checking** — Analyzing how hard a password would be to guess or crack, giving feedback to help users choose better passwords
- This project does strength checking only — it does not authenticate anyone.

### Q19. What are the limitations of this project?
**A:**
1. Common passwords list has only ~65 entries (real tools check millions)
2. No entropy-based strength calculation
3. Cannot detect passwords leaked in data breaches
4. Runs only in the browser — no server-side validation
5. Pattern list for sequential detection is not exhaustive

### Q20. How would you improve this project in the future?
**A:**
1. Use a **Trie** data structure to store and search millions of common passwords efficiently
2. Integrate **HaveIBeenPwned API** to check against real breach databases
3. Add **Merge Sort** or **Quick Sort** for comparison with Bubble/Selection Sort
4. Model keyboard layout as a **Graph** and use **BFS/DFS** for adjacency pattern detection
5. Add formal **entropy calculation** using information theory (bits of randomness)

### Q21. Explain the time complexity of your overall password analysis.
**A:** The overall time complexity is dominated by the Linear Search step:
- String traversal: O(n)
- Stack analysis: O(n)  
- Set lookup: O(1)
- Binary Search: O(log m)
- Linear Search: O(n × m × p) — **bottleneck**
- Bubble Sort: O(r²) — r=12 rules, effectively O(1)
- **Overall: O(n × m × p)** where n=password length, m=avg pattern length, p=number of patterns

### Q22. Why is a Set faster than an Array for common password lookup?
**A:** An Array lookup requires checking elements one by one — O(n) linear time. A Set uses a hash function to compute exactly where an element is stored, then checks just that location — O(1) average time. For our 65-password list: Array worst case = 65 comparisons; Set worst case ≈ 1-2 operations.

---

## 👨‍💻 About the Developer

This project was developed as a **college-level DSA academic project** to demonstrate the practical application of Data Structures and Algorithms in a real-world security context.

---

## 📄 License

This project is open-source for educational purposes. Feel free to use, modify, and share.

---

*"The best passwords are long, random, and unique to each account. Use a password manager."*
