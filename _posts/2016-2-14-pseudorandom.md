---
layout: post
published: true
title: Stochastic Influence on Pseudorandomness
subtitle: The Comparison Between Psuedorandom and Random
tags:
  - fundamentals
  - algorithms
  - machine learning
  - applied computer science
date: 2016-2-13
---

Random occurrence is implicated in real life, however is extremely difficult to implicate in machines. Computers follow a specific algorithm to generate randomness and therefore is dependant on the environment. We have not discovered how random occurrence works in natural events, which means these algorithms work by using specific factors in the system. These factors are such things as time; binary; weather, and operating system program bytes . The Mersenne Twister is an algorithm used to generate random numbers in Python, it does this by looking at the milliseconds in time and generating a number based on that. This has therefore coined the name "Pseudo-Random Number Generator" (PRNG) instead of "Random Number Generator" because it is not completely "random" since they rely on these factors and therefore are semantics - true randomness is independent.

## Biology

"Randomness" in Biology is yet to be fully explained. We do know that these events are random but don't know how they work. My EPQ is an implication of evolution and natural selection in code format. This is not accurate to real life as the random occurring events like mutation and a crossover point are completely random in Biology and are not dependent on time.

## Python

Python has a handy in-built module named "random" which supplies a pseudo-random number generator which follows the Mersenne Twister algorithm. As previously stated, this depends on time; however I am using another function named "SystemRandom" which actually uses random binary numbers that is being used by the operating system and the processor. This is definitely more accurate than time because it's harder to map and trace back the "random" numbers that occur.
Time is a crackable PRNG because it's easy to record the amount of time something takes. However operating system bytes are uncrackable since they are machine dependent and therefore isn't easy to obtain information about one computer from another computer. This is more reliable and is more true to real life, even though it's still a PRNG.

```python
import time
def dice(minimum, maximum):
    return minimum + time.time() * 10000000 % (maximum - minimum + 2)
```
This simple dice program (above) relies on time and therefore is practically a replica of Python's random module. This is no way to accurately map the result of SystemRandom function and is therefore considered better use when trying to implicate a random occurring event from real life.

```python
from random import randint, SystemRandom
SystemRandom().randint(1, 6)              # Uses bytes in the operating system
```

The above is more accurate than

```python
from random import randint
randint(1, 6)                                          # Uses time
```
