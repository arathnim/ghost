---
title: "Syntax And Semantics in Lisp Readers"
date: "January 31st, 2018"
---

Lisp is touted for its ability to change syntax, even to the extent of compiling other languages, like forth, with only a few lines of code.
From this, you might assume lisp has advanced parsing methods that allow it to accomplish this feat.
In truth, lisp readers use a far simpler way of parsing, functions dispatched on characters.

When `read` is called on a stream, it takes a character from the stream, and compares it against the readtable, which is a map
of characters to the functions called to handle them. `;` is mapped to a function that reads (and discards) comments,
`(` corresponds to a function that reads a list of elements, `"` to one that reads strings.

When called, these functions take control of the flow of reading, usually recursively calling `read` to handle sub-values.
The function `(` is mapped to, read-list, calls `read` as many times as necessary to read all of its elements, collecting them into a list, stopping only on a `)`.

With parsing as primitive as this, it seems odd that we can translate languages and extend syntax as easily as we do.
The trick is that tasks normally done in the parser are done on the list level, after everything is read.
For example, in infix extensions to lisp using the curly bracket style:

```
{2 + 5}
(if {x - y == 0} ...)
{sqrt x * sin x}
```

In order to parse this, we tell the reader recognize left curly braces, read everything inside normally,
producing a list of symbols, and then apply a seperate function that translates all these infix terms into code the compiler already understands.
This is possible because lisp reads '+', '-', and '==' as symbols, the same as 'sqrt' and 'sin'.
That is, the foreign syntax `"{2 + 5}"` is read as `(infix (2 + 5))`, which then becomes `(+ 2 5)`, normal lisp code, which makes the compiler happy.

```
(infix (2 + 5))          => (+ 2 5)
(infix (x - y == 0))     => (equal (- x y) 0)
(infix (sqrt x * sin x)) => (* (sqrt x) (sin x))
```

Instead of infix translation and parsing being the same step, we let the reader turn the string into a format that's much easier to work with,
a list of symbols, and *then* do the infix translation as a discrete step.
In *Let over Lambda's* forth implementation, the same technique is used, RPN is written inline with s-exprs, because it is just a list of s-exprs,
albeit with a little more processing before evaluation than standard lisp code.

```
(go-forth
	)

```

Used in this manner, lisp becomes a sort of AST for other languages.
The primary advantage of this approach is that

However, all's not joy in consville, because there's a lot of language constructs which are difficult to express like this.
It's focused only on obtaining values, so scanning isn't really possible, which is why text editors have their own l

Also, the fact you have to pass around the stream manually tends to make extensions brittle.

It's hard to know where to draw the line between parsing logic and list processing.
In general, more complex algorithms are the domain of the latter, and parsing is for structure, not content.
Parsing should be used only up to things that are completely decidable in parsing, not like infix.
Still, it needs to be flexible enough to allow for syntax extension, like a simple range syntax: `[1..50]`

#### the parser combinator model

Parser combinators are far more powerful, and can easily express relavitivly complex grammers, like (simple example)
negative numbers and (harder example) cl-annot.

```
(defparser integer
  (if (result-status (try "-"))
      (seq (int <- many digit) (parse-integer int))
      (seq "-" (int <- many digit) (- (parse-integer int)))))
```

#### runtime extension
