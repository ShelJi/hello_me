# BIT OPERATORS

Python Bitwise Operators
Bitwise operators are used to compare (binary) numbers:

```txt
Operator    |  Name                          |   Description

   &        |   AND                          |   each bit to 1 if both bits are 1 (1 & 1 = 1, 1 & 0 = 0, 0 & 1 = 0, 0 & 0 = 0)
   |        |   OR                           |   each bit to 1 if one of two bits is 1 (1 | 0 = 1, 0 | 1 = 1, 1 | 1 = 1, 0 | 0 = 0)
   ^        |   XOR                          |   each bit to 1 if only one of two bits is 1 (1 ^ 0 = 1, 0 ^ 1 = 1, 1 ^ 1 = 0, 0 ^ 0 = 0)
   ~        |   NOT (COMPLEMENT OPERATOR)    |   all the bits (0s become 1s and 1s become 0s)
   <<       |   Zero fill left shift         |   Shift left by pushing zeros in from the right and let the leftmost bits fall off
   >>       |   Signed right shift           |   Shift right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off

AND (AMPERSAND)
       101  (binary for 5)
    &  001  (binary for 1)
    -------
       001  (binary for 1)
       
OR (PIPE)
       101  (binary for 5)
    |  001  (binary for 1)
    -------
       101  (binary for 5)
       
XOR (EXCLUSIVE OR)
       101  (binary for 5)
    ^  001  (binary for 1)
    -------
       100  (binary for 4)
       
NOT (COMPLEMENT OPERATOR)
        101  (binary for 5)
    ~  ----
        010  (binary for 2) # Inverts all bits

Zero fill left shift
       101  (binary for 5)
    <<  001  (binary for 1)
    -------
         1010 (binary for 10) # Shifts bits to the left, filling with zeros
Signed right shift
       101  (binary for 5)
    >>  001  (binary for 1)
    -------
         010  (binary for 2) # Shifts bits to the right, filling with the sign bit
```

## EXAMPLES

### "&" AND operator

Check a number is even or odd using bitwise operator using "&" AND operator

- Binary of odd ends with xxxx1 and even ends with xxxx0

The & operator in Python is a bitwise AND operator.
It compares each bit of two numbers and returns a new number whose bits are set to 1 only where both corresponding bits of the inputs are 1.

```txt
       101  (binary for 5)
    &  001  (binary for 1)
    -------
       001  (binary for 1)
```

```py
qn = 1
while qn:
    x=int(input("enter no: \n"))

    print(bin(x))
    print(bin(1))
    print(bin(2))

    if x & 1:
        print("odd")
    else:
        print("even")
```
