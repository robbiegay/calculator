# Calculator

A calculator that performs basic math functions!

## Getting Started

The calculator can perform basic math functions using +, -, x, /. You can input values with 
either the UI or your computer keyboard. Both * and x can be used for multiply. Both = and Enter can 
be used as "equals." Both c and Backspace can be used to clear the calculator.

The Clear command clears ALL calculator data, not just the most recent values.

### Prerequisites

None — Should run on any modern browser.

### Installing

Also N/A — runs online.

## Running tests

Testing the various combinations of keyboard inputs was the hardest aspect of this project. I tested the following 
combination of keys:

Key:
* [] --> number
* \+ --> represents any operand
* = --> equals key

Testing Cases:
* [] + [] = --> Basic math function
* [] + [] + []... = --> Should allow a string of inputs and operands
* [] + [] =, [] + [] = --> Should reset after an equal sign directly followed by a number
* [] + [] =, + [] = --> An equal sign followed by an operand should add, multiply, etc a new number to the previous sum
* [] + = = =... --> Should keep adding the first number to the running sum
* [] + [] = = =... --> Should continue to add to the running sum

Things that shouldn't be allowed:
* Leading zeros (ex. 00003)
* Multiple decimal points (ex. 4.423.34)
* Pressing an operand BEFORE a number (ex. * 34 - 12 --> * will be ignored)
* Pressing multiple operands in a row (ex. 4 + - / 2 --> will ignore + - and calculate 4 / 2)
* Pressing an unlimited amount of numbers --> I capped input at 10 digits

Certain situation resulted in NaN:
* 0 / 0 --> This now returns "Undefined". From my research, this is the correct mathematical result of 0 / 0
* . + . --> Trying to perform a calculation on a decimal point will return "Invalid Use of Decimal"
* num / 0 --> Returns Infinity

Both 0 / 0 and . + . resets the calculator's internal memory.

A case that I did not solve for:
* I did not build any functionality for inputting negative numbers. (ex. - 5 will NOT be viewed as -5, the calculator will 
view this as 5 (see above rule regarding leading operands)) Function results CAN, however, enter the realm of negative values (ex. 5 - 10 = -5)
* Floating point errors (ex. .1 + .2 = 0.30000000000000004) 

@TaylorAkin suggested a fix involving returning only to the second decimal place. This would likely fix this issue 
but I was worried that it would then create problems for anyone who wanted to legitimately calculate to a high decimals precision.

## Built With

* [Bootstrap](https://getbootstrap.com) - The CSS framework used

## Contributing

If you've found a bug in my code, please feel free to send me an Issue!

## Versioning

Not currently using any versioning system.

## Authors

* **Robbie Gay** - [Robbie's Blog](https://robbiegay.github.io)