/**
 * ============================================================
 *  SCRIPT.JS — Main UI Controller
 *  Connects the Password Analyzer DSA engine to the HTML UI.
 *  Handles: input events, UI updates, visualizations.
 * ============================================================
 *
 *  SECURITY NOTE:
 *  - The password is NEVER stored, logged, or transmitted.
 *  - All processing happens in the browser (client-side only).
 *  - No console.log of password value anywhere.
 * ============================================================
 */

// ============================================================
//  DOM ELEMENT REFERENCES
// ============================================================

const passwordInput    = document.getElementById('passwordInput');
const toggleBtn        = document.getElementById('toggleBtn');
const strengthBar      = document.getElementById('strengthBar');
const strengthLabel    = document.getElementById('strengthLabel');
const scoreDisplay     = document.getElementById('scoreDisplay');
const requirementsList = document.getElementById('requirementsList');
const suggestionsList  = document.getElementById('suggestionsList');
const charCountEl      = document.getElementById('charCount');

// DSA Visualization elements
const vizCharFlow      = document.getElementById('vizCharFlow');
const vizStack         = document.getElementById('vizStack');
const vizFrequency     = document.getElementById('vizFrequency');
const vizSearch        = document.getElementById('vizSearch');
const vizSort          = document.getElementById('vizSort');
const vizComplexity    = document.getElementById('vizComplexity');

// ============================================================
//  SHOW / HIDE PASSWORD TOGGLE
// ============================================================

toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.innerHTML = isPassword
        ? '<span class="eye-icon">🙈</span> Hide'
        : '<span class="eye-icon">👁️</span> Show';
});

// ============================================================
//  MAIN INPUT LISTENER — fires on every keystroke
// ============================================================

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value; // Used ONLY for analysis
    charCountEl.textContent = `${password.length} characters`;

    if (password.length === 0) {
        resetUI();
        return;
    }

    // Run full DSA analysis
    const result = analyzePassword(password);

    // Update all UI sections
    updateStrengthMeter(result);
    updateRequirements(result.evaluatedRules);
    updateSuggestions(result.suggestions);
    updateDSAVisualizations(result, password);
});

// ============================================================
//  UI UPDATE: STRENGTH METER
// ============================================================

function updateStrengthMeter(result) {
    const { strength, score } = result;

    // Animate the strength bar
    strengthBar.style.width = `${strength.percent}%`;
    strengthBar.style.backgroundColor = strength.color;
    strengthBar.style.boxShadow = `0 0 12px ${strength.color}80`;

    // Update label
    strengthLabel.textContent = strength.label;
    strengthLabel.style.color = strength.color;

    // Remove old strength class and add new one
    strengthLabel.className = 'strength-label';
    strengthLabel.classList.add(`strength-${strength.index}`);

    // Score display
    scoreDisplay.textContent = `${score}/10`;
    scoreDisplay.style.color = strength.color;
}

// ============================================================
//  UI UPDATE: REQUIREMENTS CHECKLIST
// ============================================================

function updateRequirements(rules) {
    requirementsList.innerHTML = '';

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.className = `req-item ${rule.passed ? 'passed' : 'failed'}`;
        li.innerHTML = `
            <span class="req-icon">${rule.passed ? '✓' : '✗'}</span>
            <span class="req-text">${rule.description}</span>
            <span class="req-score">${rule.passed ? '+' + rule.score : '0'}/${rule.maxScore}</span>
        `;
        requirementsList.appendChild(li);
    });
}

// ============================================================
//  UI UPDATE: SUGGESTIONS
// ============================================================

function updateSuggestions(suggestions) {
    suggestionsList.innerHTML = '';

    suggestions.forEach((s, idx) => {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.innerHTML = `
            <span class="suggestion-num">${idx + 1}</span>
            <span class="suggestion-text">${s.text}</span>
            <span class="suggestion-priority priority-${s.priority >= 8 ? 'high' : s.priority >= 5 ? 'mid' : 'low'}">
                ${s.priority >= 8 ? 'High' : s.priority >= 5 ? 'Medium' : 'Low'} priority
            </span>
        `;
        suggestionsList.appendChild(li);
    });

    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<li class="suggestion-item all-good">🎉 All checks passed! Your password is excellent.</li>';
    }
}

// ============================================================
//  DSA VISUALIZATIONS
// ============================================================

function updateDSAVisualizations(result, password) {
    renderCharFlow(password, result.charAnalysis);
    renderStackViz(result.stackAnalysis);
    renderFrequencyMap(result.charAnalysis.frequencyMap);
    renderSearchViz(result);
    renderSortViz(result);
    renderComplexityViz(result);
}

// ------- 1. Character Traversal Visualization -------

function renderCharFlow(password, charAnalysis) {
    // Only show first 20 characters to keep UI clean
    const display = password.slice(0, 20);
    const hasMore = password.length > 20;

    let html = '<div class="char-flow-container">';
    html += '<div class="char-boxes">';

    for (let i = 0; i < display.length; i++) {
        const ch = display[i];
        const type = charAnalysis.charDetails[i]?.type || 'unknown';
        html += `<div class="char-box char-${type}" title="${type}">
                    <span class="char-val">${ch === ' ' ? '·' : ch}</span>
                    <span class="char-type">${type.charAt(0).toUpperCase()}</span>
                 </div>`;
    }

    if (hasMore) {
        html += `<div class="char-box char-more">+${password.length - 20}</div>`;
    }

    html += '</div>';

    // Character type summary
    html += `<div class="char-summary">
        <span class="cs-item upper">↑ ${charAnalysis.uppercaseCount} Upper</span>
        <span class="cs-item lower">↓ ${charAnalysis.lowercaseCount} Lower</span>
        <span class="cs-item digit">🔢 ${charAnalysis.digitCount} Digits</span>
        <span class="cs-item special">★ ${charAnalysis.specialCount} Special</span>
        <span class="cs-item unique">🔑 ${charAnalysis.uniqueChars} Unique</span>
    </div>`;

    html += '</div>';
    vizCharFlow.innerHTML = html;
}

// ------- 2. Stack Visualization -------

function renderStackViz(stackAnalysis) {
    const { stackTrace, maxRepeatRun, finalStackSize } = stackAnalysis;

    // Show last 8 steps of stack trace
    const recentTrace = stackTrace.slice(-8);

    let html = '<div class="stack-viz-container">';

    // Stack diagram (last 6 characters pushed = top of stack)
    html += '<div class="stack-diagram">';
    html += '<div class="stack-label">STACK (LIFO)</div>';
    html += '<div class="stack-top-label">← TOP</div>';
    html += '<div class="stack-cells">';

    const stackItems = recentTrace.slice(-6).map(t => t.char).reverse();
    stackItems.forEach((ch, idx) => {
        const isTop = idx === 0;
        html += `<div class="stack-cell ${isTop ? 'stack-top' : ''}">
                    <span>${ch === ' ' ? '·' : ch}</span>
                 </div>`;
    });

    if (stackItems.length === 0) {
        html += '<div class="stack-cell stack-empty">Empty</div>';
    }

    html += '</div>';
    html += `<div class="stack-info">Size: ${finalStackSize} | Operations: push(), pop(), peek(), isEmpty()</div>`;
    html += '</div>';

    // Stack trace table
    html += '<div class="stack-trace">';
    html += '<div class="trace-header"><span>Step</span><span>Char</span><span>Type</span><span>Stack Top</span></div>';

    recentTrace.forEach(t => {
        html += `<div class="trace-row">
                    <span>${t.step}</span>
                    <span class="char-${t.type}">${t.char === ' ' ? '·' : t.char}</span>
                    <span>${t.type}</span>
                    <span>${t.stackTop === ' ' ? '·' : t.stackTop}</span>
                 </div>`;
    });

    html += '</div>';

    // Pattern findings
    if (maxRepeatRun > 1) {
        html += `<div class="stack-finding">⚠ Stack detected max repeat run: ${maxRepeatRun} identical chars in a row</div>`;
    } else {
        html += `<div class="stack-finding good">✓ No significant repeat runs detected by Stack analysis</div>`;
    }

    html += '</div>';
    vizStack.innerHTML = html;
}

// ------- 3. Frequency Map Visualization -------

function renderFrequencyMap(freqMap) {
    const entries = Object.entries(freqMap).sort((a, b) => b[1] - a[1]).slice(0, 12);
    const maxFreq = entries.length > 0 ? entries[0][1] : 1;

    let html = '<div class="freq-viz-container">';
    html += '<div class="freq-title">Character Frequency Map (Hash-based)</div>';
    html += '<div class="freq-bars">';

    entries.forEach(([ch, count]) => {
        const pct = Math.round((count / maxFreq) * 100);
        const displayCh = ch === ' ' ? '·' : ch;
        html += `<div class="freq-bar-item">
                    <span class="freq-char">${displayCh}</span>
                    <div class="freq-bar-wrap">
                        <div class="freq-bar-fill" style="width:${pct}%"></div>
                    </div>
                    <span class="freq-count">${count}</span>
                 </div>`;
    });

    if (entries.length === 0) {
        html += '<p class="viz-empty">No characters yet</p>';
    }

    html += '</div></div>';
    vizFrequency.innerHTML = html;
}

// ------- 4. Search Visualization -------

function renderSearchViz(result) {
    const { binarySearch: bs, weakPatternsFound, seqResult, setLookup } = result;

    let html = '<div class="search-viz-container">';

    // SET LOOKUP (O(1))
    html += `<div class="search-section">
        <div class="search-algo-title">🔎 Hash Set Lookup — O(1) Average</div>
        <div class="search-result ${setLookup.isCommon ? 'found' : 'not-found'}">
            ${setLookup.isCommon
                ? '🔴 FOUND in common passwords Set! Change this immediately.'
                : '🟢 NOT found in common passwords Set — good!'}
        </div>
    </div>`;

    // BINARY SEARCH (O(log n))
    html += `<div class="search-section">
        <div class="search-algo-title">🔍 Binary Search on Sorted Array — O(log n)</div>
        <div class="binary-search-steps">`;

    if (bs.comparisons.length > 0) {
        const showSteps = bs.comparisons.slice(0, 5); // max 5 steps
        showSteps.forEach(c => {
            html += `<div class="bs-step">
                        Step ${c.step}: Check index ${c.mid} → "${c.midVal}" 
                        ${c.midVal === c.target ? '✓ MATCH!' : (c.midVal < c.target ? '→ go right' : '← go left')}
                     </div>`;
        });
        if (bs.comparisons.length > 5) {
            html += `<div class="bs-step">... (${bs.comparisons.length - 5} more steps)</div>`;
        }
    } else {
        html += '<div class="bs-step">Binary search complete — 0 steps (empty input)</div>';
    }

    html += `</div>
        <div class="search-result ${bs.isCommon ? 'found' : 'not-found'}">
            ${bs.isCommon ? `🔴 Found in sorted list! Steps taken: ${bs.steps}` : `🟢 Not in common list. Steps taken: ${bs.steps}`}
        </div>
    </div>`;

    // LINEAR SEARCH — Sequential patterns
    html += `<div class="search-section">
        <div class="search-algo-title">📋 Linear Search — Weak Pattern Detection O(n·m·p)</div>`;

    if (seqResult.found.length > 0) {
        html += `<div class="search-result found">⚠ Sequential patterns found: 
                    ${seqResult.found.map(p => `<code>"${p}"</code>`).join(', ')}
                 </div>`;
    } else {
        html += `<div class="search-result not-found">✓ No sequential patterns found (scanned ${seqResult.totalSteps} comparisons)</div>`;
    }

    if (weakPatternsFound.length > 0) {
        html += `<div class="search-result found">⚠ Weak sub-patterns found: 
                    ${weakPatternsFound.slice(0,3).map(p => `<code>"${p.pattern}"</code>`).join(', ')}
                 </div>`;
    } else {
        html += `<div class="search-result not-found">✓ No weak sub-patterns detected</div>`;
    }

    html += '</div></div>';
    vizSearch.innerHTML = html;
}

// ------- 5. Sorting Visualization -------

function renderSortViz(result) {
    const { sortedRules, sortMeta } = result;

    let html = '<div class="sort-viz-container">';
    html += `<div class="sort-header">
        <span class="sort-algo">Bubble Sort — Rules by Score (Descending)</span>
        <span class="sort-meta">Passes: ${sortMeta.passes} | Swaps: ${sortMeta.swaps}</span>
    </div>`;

    html += '<div class="sort-bars">';
    const topRules = sortedRules.slice(0, 8); // show top 8
    const maxScore = Math.max(...sortedRules.map(r => r.maxScore), 1);

    topRules.forEach((rule, idx) => {
        const pct = Math.round((rule.score / rule.maxScore) * 100) || 0;
        html += `<div class="sort-bar-item">
                    <span class="sort-rank">#${idx + 1}</span>
                    <span class="sort-name">${rule.name}</span>
                    <div class="sort-bar-wrap">
                        <div class="sort-bar-fill ${rule.passed ? 'passed' : 'failed'}" 
                             style="width:${pct}%">
                        </div>
                    </div>
                    <span class="sort-score">${rule.score}/${rule.maxScore}</span>
                 </div>`;
    });

    html += '</div>';

    // Selection Sort — Suggestions
    html += `<div class="sort-header" style="margin-top:12px;">
        <span class="sort-algo">Selection Sort — Suggestions by Priority</span>
    </div>`;

    html += '<div class="sort-suggestions">';
    result.suggestions.slice(0, 4).forEach((s, idx) => {
        const prio = s.priority;
        html += `<div class="ss-item priority-bar-${prio >= 8 ? 'high' : prio >= 5 ? 'mid' : 'low'}">
                    <span class="ss-rank">#${idx + 1}</span>
                    <span class="ss-text">${s.text.slice(0, 60)}${s.text.length > 60 ? '...' : ''}</span>
                    <span class="ss-prio">P:${prio}</span>
                 </div>`;
    });
    html += '</div></div>';

    vizSort.innerHTML = html;
}

// ------- 6. Complexity Summary -------

function renderComplexityViz(result) {
    const passLen = result.charAnalysis.length;
    const html = `
    <div class="complexity-grid">
        <div class="complexity-card">
            <div class="comp-title">String Traversal</div>
            <div class="comp-time">⏱ O(n)</div>
            <div class="comp-space">📦 O(k)</div>
            <div class="comp-note">n=${passLen} chars, k=unique chars</div>
        </div>
        <div class="complexity-card">
            <div class="comp-title">Stack Operations</div>
            <div class="comp-time">⏱ O(1) each</div>
            <div class="comp-space">📦 O(n)</div>
            <div class="comp-note">push/pop/peek/isEmpty</div>
        </div>
        <div class="complexity-card">
            <div class="comp-title">Set Lookup</div>
            <div class="comp-time">⏱ O(1) avg</div>
            <div class="comp-space">📦 O(m)</div>
            <div class="comp-note">m=common passwords count</div>
        </div>
        <div class="complexity-card">
            <div class="comp-title">Binary Search</div>
            <div class="comp-time">⏱ O(log m)</div>
            <div class="comp-space">📦 O(1)</div>
            <div class="comp-note">Steps: ${result.binarySearch.steps}</div>
        </div>
        <div class="complexity-card">
            <div class="comp-title">Linear Search</div>
            <div class="comp-time">⏱ O(n·m·p)</div>
            <div class="comp-space">📦 O(1)</div>
            <div class="comp-note">p=patterns, Steps: ${result.seqResult.totalSteps}</div>
        </div>
        <div class="complexity-card">
            <div class="comp-title">Bubble Sort</div>
            <div class="comp-time">⏱ O(r²)</div>
            <div class="comp-space">📦 O(1)</div>
            <div class="comp-note">r=rules, Passes: ${result.sortMeta.passes}</div>
        </div>
    </div>`;

    vizComplexity.innerHTML = html;
}

// ============================================================
//  RESET UI (empty password)
// ============================================================

function resetUI() {
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = '#334155';
    strengthLabel.textContent = 'Enter a password';
    strengthLabel.style.color = '#94a3b8';
    scoreDisplay.textContent = '0/10';
    scoreDisplay.style.color = '#94a3b8';
    requirementsList.innerHTML = '<li class="req-item neutral">Enter a password to see requirements</li>';
    suggestionsList.innerHTML = '<li class="suggestion-item neutral">Suggestions will appear here</li>';
    vizCharFlow.innerHTML = '<p class="viz-empty">Waiting for input...</p>';
    vizStack.innerHTML = '<p class="viz-empty">Stack visualization will appear here</p>';
    vizFrequency.innerHTML = '<p class="viz-empty">Frequency map will appear here</p>';
    vizSearch.innerHTML = '<p class="viz-empty">Search results will appear here</p>';
    vizSort.innerHTML = '<p class="viz-empty">Sorting visualization will appear here</p>';
    vizComplexity.innerHTML = '<p class="viz-empty">Complexity analysis will appear here</p>';
    charCountEl.textContent = '0 characters';
}

// ============================================================
//  INITIAL STATE
// ============================================================

resetUI();
