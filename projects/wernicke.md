---
title: "Wernicke"
summary: "Flexible parsing framework for Common Lisp"
---

Wernicke is a framework made to ease development of parsing languages, such as regular expressions and Instaparse,
by providing a highly optimized s-expression format to represent common parsing constructs.
This core language is fully extensible, the internal functions used to define parsers are exposed.
Wernicke also provides several advanced features, like error handling, custom error formatting, parsing from streams,
incremental reparsing, and scanning.

It takes advantage of CL's flexible type system to give parse results in a natural format, that can be easily
manipulated with normal code, and uses CL's macros to create clean, powerful interfaces to the parsing library.
See the examples page for more neat things Wernicke can do, or the tutorials page to get started making a simple
regex-like parsing language in Wernicke.

#### Installation

```
(ql:quickload 'wernicke)
```
