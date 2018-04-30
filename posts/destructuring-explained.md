---
title: "Destructuring, Explained"
date: "January 31st, 2018"
---

Destructuring, also called structural binding, is a method of binding symbols to a set of values,
widely used in the lisp family of languages, and in a few other popular languages.
Destructuring is most commonly associated with lists, although it works on arrays, objects, and hash tables as well.
Essentially, you give a pattern or a template with variables, and a set of values to match against that pattern,
and your language binds those variables to the corresponding values.

There are two kinds of destructuring, assignment destructuring,
where you give a template where you would normally give a single variable to bind,
and function destructuring, where the list of arguments to a function is destructured.

Python and JS have assignment destructuring, using `=`, the normal assignment operator:

```py
(a, (b, (c, d))) = (1, (2, (3, 4)))
# a = 1, b = 2, c = 3, d = 4
```

```js
var a, b, rest;
[a, b, ...rest] = [1, 2, 3, 4, 5];
// a = 1, b = 2, rest = [3, 4, 5]
```

In this case, the pattern, or template, is on the left, and the set of values being bound on the right.

The JS shows an example of a common pattern in destructuring, the `...` operator, which binds to anything remaining in the list.
After all, destructuring would be pretty useless if we had to give names to every element of the list each time.
The same template would be written as `a b &rest rest` in Common Lisp and `a b & rest` in Clojure.

[Ruby](http://tony.pitluga.com/2011/08/08/destructuring-with-ruby.html) has an oddly named operator called 'splat'(`*`), which either 'slurps' or 'splits',
depending on which side of the assignment it happens to be on. (This explains why conversations between ruby people seem insane)

Here's the splat operator slurping up the remaining list arguments:

```rb
a, b = ["apple", "banana"]
# a = "apple", b = "banana"

a, b, *rest = ["apple", "banana", "cherry", "durian", "elderberry"]
# a = "apple", b = "banana", rest = ["cherry", "durian", "elderberry"]
```

```rb
# this function takes any number of lists or elements,
# and appends them all together
def append(*lists)
  lists.flatten(1)
end

append([2, 3, 4], [5, 6, 7], [8, 9, 10])
# => [2, 3, 4, 5, 6, 7, 8, 9, 10]

append("foo", ["bar", "baz"], "qux")
# => ["foo", "bar", "baz", "qux"]
```

Note that the function signature of append has only the 'lists' argument, which simply binds the list of provided arguments to 'lists'.
There can be any number of provided arguments, including zero.

By now, you're probably bored with binding symbols to lists of fruit and numbers, so let's talk about keyword arguments.
The first thing you need to know about keyword aguments is that keyword aguments are fantastic.
I could write a whole blog post just about keyword arguments.

Keywords are lightweight strings, which means that they're not used for holding text, but only for specifying things, like keys in a hash table.
In both Ruby and Lisp, keywords are preceded with a colon, and ended with a space, like this:

```cl
:keyword
:also-a-keyword
```

Keyword arguments, also called named arguments, are a specific use of keywords in argument lists to specify values.

```cl
(draw-circle :x 300 :y 200 :radius 350)
```

They make functions much easier to read, at the expense of brevity.
Keyword arguments are almost always optional, and can be given in any order.
They can also be used to 'collapse' similarly named functions into a single function.
You may have seen some crypto API which looks similar to this:

```py
# '[0] * 128' is shorthand for a vector with 128 zero'd elements
cryptor = makeCryptor("AES", 128, "CBC", "secret key", [0] * 128)
cryptor.encrypt("attack at dawn")
```

This is actually a pretty decent API, some are a lot worse. (*cough* CommonCrypto *cough* Bouncy Castle *cough*)
You'll also see it with objects for the various ciphers and sizes, which provides a similar API.
The main problem is that the user of our little crypto library has to decide on an appropriate cipher, mode, block size, and IV each time they want to encrypt or decrypt something.
For those of us that have a firm grasp of cryptography, this is fine, but for programmers who just want to encrypt some data without having to understand the relative strengths and weaknesses of block cipher modes, this is less than ideal.
Every argument we don't provide a sane default for is another chance for your API user to shoot themselves in the foot.

Let's assume we're trying to make a top-level interface for a crypto library that other programmers will actually want to use.
With keyword arguments, we can make something like this:

```cl
(encrypt "attack at dawn" "secret key")
(encrypt "attack at dawn" "secret key" :cipher DES :block-size 256)
(encrypt "attack at dawn" "secret key" :cipher AES :block-size 128 :mode ECB)
```

As you can see, this is significantly nicer than the fixed-argument version.
More verbose when you need to specify arguments, but that makes it easier to read, as well.
The important thing to note is that most of these arguments are optional. If we leave out the cipher argument, it will go to a sane default, like AES.
This allows the programmer to use as much, or as little, of the features of the function as they want, which reduces cognitive load,
as well as providing a smooth learning curve; newer users can ignore the complexities such as the mode of operation until they understand what the options do.

If this seems familiar, it's because this is the same pattern unix commands use.
