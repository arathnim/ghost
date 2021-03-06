---
title: "Transforms"
subtitle: "Common Lisp"
---

A number of transforms to lisp syntax, mostly infix.
I'm just calling them transforms for now, syntax extensions might be a more accurate term.
This process occurs before macroexpansion, so everything looks as it was before by the time it arrives at the macro.
Yes, this clobbers certain variables, until I get lexical variable analysis up and running.
Currently only works on sbcl, might port to other implementations if the need arises.

#### usage
`enable-transforms [transforms] transform-name(s)`

##### right-arrow-lambda

```cl
(mapcar (x y -> (+ x y)) '(1 2 3) '(4 5 6)) => (5 7 9)
```

##### left-arrow-bind

```cl
(and (bar <- (really-long-cond foo))
     (qux <- (other-really-long-cond baz))
     (+ foo bar))

(defun foo (bar baz)
   (qux <- (apply baz bar))
   (list qux bar))

(if (> 6 (value <- (gethash key table)))
   (print value)
   (error "whoops"))
```

##### hole-lambda

Turns forms with "<>" into lambda statements.
Does not yet use lexical or type information, so only works on a single level.

```cl
normal usage:

(map (+ 10 <>) '(1 2 3)) => (11 12 13)

(reduce #'max list :key (gethash <> table))

positional lambda:

(filter (foo <2> <1>) list)
```

##### haskell-type-decleration

Also usable with a variable in the left side, and a single type.

```cl
(fibo :: integer -> integer)
(defun fibo (n)
   (if (n < 2)
       n
       (fibo (n - 2) + fibo (n - 1))))

```

#### Installation

Transforms requires quicklisp to run. It's been tested on sbcl, but should work on other CL implementations.
to install quicklisp, go to [quicklisp's website](https://www.quicklisp.org/beta/) and follow the instructions there.

To use transforms, clone the repo into `~/quicklisp/local-projects`, and run `(ql:quickload 'tranforms)` inside your lisp interpreter.
