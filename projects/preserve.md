---
title: "Preserve"
subtitle: "Common Lisp"
---

Preserve provides an API for creating simple persistant state for Common Lisp.
For state management, there's databases and serialization to files,
but each of these introduce overhead into your code.
Preserve introduces transparent synchronization to variables,
which can be used by developers the same way normal variables are.

To mark variables to be preserved, wrap them with the 'preserve' macro:

```
(preserve
   (defvar shopping-list '(eggs bread milk))
   (defvar save-game (make-save :new)))
```

For a clean exit, call 'preserve-end' before exiting.

```
(preserve
   (defvar counter 0))

(defun main ()
   (format t "you have run this program ~a times" (incf counter))
   (preserve-end)
   (exit))
```

Preserve requires quicklisp to run. It's been tested on sbcl, but should work on other CL implementations.
to install quicklisp, go to [quicklisp's website](https://www.quicklisp.org/beta/) and follow the instructions there.

To use preserve, clone the repo into `~/quicklisp/local-projects`, and run `(ql:quickload 'preserve)` inside your lisp interpreter.
