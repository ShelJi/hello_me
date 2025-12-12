# Leetcode

## Table of content

- [Hints](#hints)
- [Hash Table](#hash-table)
- [Functions](#functions)
  - [Counter](#counter)
- [Algorithm](#algorithm)
  - [Divide and conquer](#divide--conquer-algorithm)
  - [Bucket Sort](#bucket-sort)

### Hints

- 1-indexed array starts from 1 not 0.

## Hash Table

- set → implemented using a hash table
- dict → implemented using a hash table
- so both are called hash map in python

## Functions

### Counter

#### Counter in Python (from collections)

Python provides a built-in data structure called Counter inside the collections module.
It helps count the frequency of elements in O(n) time and is extremely useful in DSA problems.

#### 1. Pattern Recognized

Hashmap / Frequency Map Pattern

Counter is just a built-in optimized hashmap (dictionary) used to count occurrences of elements.

##### This pattern appears in

- Counting characters
- Counting array elements
- Checking anagrams
- Frequency-based greedy problems
- Sliding window problems
- Top-K frequent problems

#### 2. Thinking Approach

##### When you need

- Frequency of items
- Find duplicates
- Compare counts across two lists/strings
- Retrieve the most common elements

```py
# Instead of manually doing:
freq = {}
for x in arr:
    freq[x] = freq.get(x, 0) + 1
```

```py
# Use counter
from collections import Counter
freq = Counter(arr)
```

#### Example

```py
from collections import Counter

arr = [1, 2, 2, 3, 3, 3]

c = Counter(arr)
print(c)
# Output: Counter({3: 3, 2: 2, 1: 1})
```

##### Count characters in a string

```py
s = "banana"
count = Counter(s)
print(count)
# Output: Counter({'a': 3, 'n': 2, 'b': 1})
```

##### Most common elements

```py
c = Counter([1,2,2,3,3,3])
print(c.most_common(1))  # [(3,3)]
```

##### Convert to dictionary

```py
dict(Counter("banana"))
```

##### Subtract counters

```py
c1 = Counter("aaabb")
c2 = Counter("ab")
c1.subtract(c2)
print(c1)
# Counter({'a': 2, 'b': 1})
```

## Algorithm

### Divide & Conquer Algorithm

Divide & Conquer always follows three steps:

- Divide → Split the problem into smaller subproblems (usually equal halves).
- Conquer → Solve the subproblems recursively.
- Combine → Merge or assemble results from subproblems.

Common examples following this pattern:

- Merge Sort
- Quick Sort
- Binary Search
- Fast Exponentiation (Power function)
- Karatsuba Multiplication
- Strassen Matrix Multiplication

### Bucket sort

- few buckets are created based on ranges (Ex,B1: 0-20, B2: 21-40, B3: 41-60,...)
- [12, 5, 29, 4] => placed each numbers in each bucket of its range
- each bucket is sorted individualy
- then merged together.
