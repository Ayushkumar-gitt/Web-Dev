# DFA: Even 0s and Odd 1s

## Problem Statement
Design a Deterministic Finite Automata (DFA) over alphabet Σ = {0, 1} that accepts all strings with:
- **Even** number of 0s (including 0)
- **Odd** number of 1s

## DFA Specification

### States
| State | Description | Type |
|-------|-------------|------|
| **q0** | Even 0s, Even 1s | Initial |
| **q1** | Even 0s, Odd 1s | **Accepting** ✓ |
| **q2** | Odd 0s, Even 1s | Non-accepting |
| **q3** | Odd 0s, Odd 1s | Non-accepting |

### Transition Function (δ)
```
δ(q0, 0) = q2    δ(q0, 1) = q1
δ(q1, 0) = q3    δ(q1, 1) = q0
δ(q2, 0) = q0    δ(q2, 1) = q3
δ(q3, 0) = q1    δ(q3, 1) = q2
```

### Formal Definition
- **Q** = {q0, q1, q2, q3}  (States)
- **Σ** = {0, 1}  (Alphabet)
- **q0** = q0  (Initial state)
- **F** = {q1}  (Accepting states)
- **δ** = Transition function (as above)

## Design Logic
The DFA tracks the parity (even/odd) of both 0s and 1s simultaneously:
- Reading a '0' toggles the parity of 0s count
- Reading a '1' toggles the parity of 1s count
- We move between 4 states representing all combinations of (0s parity, 1s parity)

## Test Cases

### Accepting Strings (Even 0s AND Odd 1s)

| String | 0s Count | 1s Count | Path | Result |
|--------|----------|----------|------|--------|
| **1** | 0 (even) ✓ | 1 (odd) ✓ | q0 → **q1** ✓ | ACCEPT |
| **001** | 2 (even) ✓ | 1 (odd) ✓ | q0 → q2 → q0 → **q1** ✓ | ACCEPT |
| **010** | 2 (even) ✓ | 1 (odd) ✓ | q0 → q2 → q1 → **q3** ✗ | REJECT |
| **100** | 2 (even) ✓ | 1 (odd) ✓ | q0 → q1 → q3 → **q1** ✓ | ACCEPT |
| **00111** | 2 (even) ✓ | 3 (odd) ✓ | q0 → q2 → q0 → q1 → q0 → **q1** ✓ | ACCEPT |
| **101** | 2 (even) ✓ | 2 (even) ✗ | - | REJECT |
| **0000001** | 6 (even) ✓ | 1 (odd) ✓ | q0 → q2 → q0 → q2 → q0 → q2 → q0 → **q1** ✓ | ACCEPT |

### Rejecting Strings (Not (Even 0s AND Odd 1s))

| String | 0s Count | 1s Count | Reason | Result |
|--------|----------|----------|--------|--------|
| **0** | 1 (odd) ✗ | 0 (even) ✗ | Odd 0s | REJECT |
| **11** | 0 (even) ✓ | 2 (even) ✗ | Even 1s | REJECT |
| **01** | 1 (odd) ✗ | 1 (odd) ✓ | Odd 0s | REJECT |
| **10** | 1 (odd) ✗ | 1 (odd) ✓ | Odd 0s | REJECT |
| **0011** | 2 (even) ✓ | 2 (even) ✗ | Even 1s | REJECT |
| **110** | 1 (odd) ✗ | 2 (even) ✗ | Odd 0s, Even 1s | REJECT |
| **111** | 0 (even) ✓ | 3 (odd) ✓ | Should accept... | ACCEPT |

## Trace Examples

### Example 1: String "001" → ACCEPT
```
Start: q0 (even 0s, even 1s)
Read '0': q0 → q2 (odd 0s, even 1s)
Read '0': q2 → q0 (even 0s, even 1s)
Read '1': q0 → q1 (even 0s, odd 1s) ✓ ACCEPTING STATE
```

### Example 2: String "101" → REJECT
```
Start: q0 (even 0s, even 1s)
Read '1': q0 → q1 (even 0s, odd 1s)
Read '0': q1 → q3 (odd 0s, odd 1s)
Read '1': q3 → q2 (odd 0s, even 1s) ✗ NOT ACCEPTING
```

### Example 3: String "00111" → ACCEPT
```
Start: q0 (even 0s, even 1s)
Read '0': q0 → q2 (odd 0s, even 1s)
Read '0': q2 → q0 (even 0s, even 1s)
Read '1': q0 → q1 (even 0s, odd 1s)
Read '1': q1 → q0 (even 0s, even 1s)
Read '1': q0 → q1 (even 0s, odd 1s) ✓ ACCEPTING STATE
```

## Implementation Notes

1. **State Representation**: Each state encodes the parity of both 0s and 1s
2. **Deterministic**: For each state and input, there's exactly one next state
3. **Minimal DFA**: This is a minimal DFA with 4 states (2² combinations of two binary parities)
4. **Transition Pattern**: Every transition toggles exactly one parity bit

## Visual Diagram
See `DFA_diagram.svg` for the complete state diagram with all transitions marked.
