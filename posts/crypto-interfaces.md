---
title: "The State of Security: Cryptographic Interfaces"
date: "November 5th, 2017"
---

The first rule of computer security is that all security mechanisms are broken and awful,
and cryptography libraries are no exception to this rule.
The specific way and degree to which they are awful and broken varies between libraries,
but the overarching theme is simple: they're hard to use correctly.
Misconfiguring the crypto library can break it in such a way your data can be accessed by an attacker;
and unlike exploits, fixing the problem can be impossible, as you might not have the key to reencrypt the data with.

A common problem with crypto libraries is that there are a near-infinite number of ways for the
developer using the library to shoot themselves in the foot, and a very limited number of ways
the library can be correctly configured.
This is usually caused by the library consisting of a collection of tiny blocks
like 'newCipher', 'generateNonce', and 'xorKeyStream';
which the developer is expected to piece together in secure ways.
Essentially, the library developers provide a toolbox of functions for building a
secure encryption algorithm, opposed to a coherent interface.

In a particularly granular crypto library,
a developer would be required to select which algorithm, block mode, and block size to use,
as well as manually creating and storing a random initialization vector.
Failure to do any part of that correctly could result in the program throwing an error,
or it could result in the program working but the crypto being completely broken.
If you choose the wrong cipher algorithm, or you choose the wrong block mode,
or the wrong block size, or reuse the key as the initialization vector,
or mess up the random data generation, the crypto breaks and your user's
information now belongs to some Chinese teenagers.

And that's just the simplest kind of encryption operation;
there's nonce/IV storage requirements, key derivation algorithms, padding algorithms, nonce reuse,
and the difference between authenticate-and-encrypt and authenticate-then-encrypt,
all issues which are pushed onto devlopers of unknown cryptographic qualification.

The first thing this situation calls into question is: why are the libraries designed so poorly?

Part of the answer is that they weren't really designed at all.
When the developers first approached the problem, they broke it down into objects, functions, and interfaces,
and then made the parts of this system avaliable to the user.
That is, the user-facing parts are a natural outgrowth of the internal library structure.
In a broader sense, the reason these libraries are so hard to use is that the interface the developers see
is the same as the one the users see, which results in the users struggling to understand on the same level as the developers.
This choice of infastructure isn't entirely without advantages:
it's the easiest way of doing things, and it allows users to quickly transition into developers.

The other part of the answer is that the developers can't abstract certain things away because users
might need the library developer's level of control.
There are a number of tasks where, 99% of the time, you just want the default behavior.
The library could do these tasks for you, but then there's the 1% of the users who now can't use the library at all.
Or, worse, it later turns our that this choice they made for the user turns out to be insecure, and now there's no way to fix it.
So instead, the developers give you all the pieces and let you do it yourself.

Fortunately, these problems are not insurmountable, they just require better tools.

How I usually start is by identifying the highest-level abstractions that people might use, and working my way down to the implementation.
Modeling how people think about the domain you're writing code for is critical to creating better interfaces:
code which matches how the developer thinks about the subject will be the easiest to work with.

#### the vault abstraction

The highest-level abstraction for symmetric-key cryptography is quite simple: it's a vault.
You put in data, lock it with the key, and then you need the key to get it out again.

#### the choice abstraction

The second level provides more detail with regard to the operation of the cipher, we have values
like 'algorithm', 'block mode', and 'block size', all of which affect how secure the encryption is.
At this level, it isn't necessary to understand how the algorithms actually operate, just that AES is more secure than DES,
and bigger block sizes are more secure; that is, it's understood how each choice effects the overall security of the encryption.
Also abstracted away are the authentication and nonce storage concerns, both of which can be added to the ciphertext automatically.
This is the level of abstraction used by most developers; they might not be able to implement AES from scratch,
but they can understand how recently-discovered attacks affect which algorithms they should use.

#### the code abstraction

The final level is the implementation level, consisting of functions, objects, and interfaces.
Algorithm isn't just a choice for the user to make,
as in the previous level, it's a slot that takes objects with the encrypt and decrypt methods, which fully describes a particular
algorithm.

They next step is identifying the goals we want to use to guide our design.

#### ease of use

The first is that we want to make it so that developers without crypto knowledge can use the library to get what they need.
The difficulty with this goal is that they're using the first level of abstraction, cryptography as a vault,
which is a pretty bare-bones model.
If forced to make critical choices like CTR vs. CBC, they're probably going to choose at random.
So, it follows they need an interface which mirrors this level of abstraction.

#### choice of algorithms

The second goal is that developers need to be able to choose which algorithms to use.
Cryptography libraries are not used in isolation, and this library will need to be able to connect to other crypto libraries;
and if the user can't specify which algorithm they used in the other library, there's no way to communicate.
Also, the landscape of crypto is not set, new attacks against specific algorithms and combinations of algorithms are discovered all the time,
which means our developers are going to need to be able to switch to secure settings on their own.

#### hacking and modifications

The third is that the developers aren't just using the figurative front door, they're going to want to implement
obscure and exotic crypto algorithms, and hack on the software itself, which means that the internals have to be laid out in a format
that allows the developers to understand how they work.

With all this information, we have a much easier time choosing and evaluating interfaces for our developers to use.
I have no doubt there is a huge amount of abstractions which could be used to satisfy these goals,
but one that serves quite well is the named argument pattern.
It's most useful in complex domains, and provides a smooth transition from default behavior to a high degree of customization,
as well as making the code much easier to read, at the expense of brevity.
You may also know it as the primary abstraction used in unix shells.

The simplest invocations of a library built with this abstraction might look like this:

```
encrypt (data, password)
decrypt (data, password)
```

Which corresponds to our simplest abstraction, the vault.
There's a lot going on behind the scenes to make such a simple abstraction possible,
such as authentication, to prevent the user from trying to decrypt garbage,
and automatic storage of the nonce.
The tradeoff for this simplicity is having to choose a lot of options for the user,
like the algorithm and block mode.
The named argument pattern allows us to set and override these defaults,
by having the user name the arguments they want to override:

```
encrypt (data, password, algorithm: aes, block-size: 256)
encrypt (data, password, key-derivation: argon2, padding: pkcs7)
```

This allows the user to choose which components they want to override, which satisfies our second goal.
Satisfying the third is more difficult, as it's very dependent on language,
we need to have a path that allows the user to transition from using the interface to
working with the software behind it.
One way to do that is by moving from understanding the arguments as choices to understanding them as code:
when you provide 'aes' to the algorithm slot, you're actually passing an object which describes the algorithm;
and the user can create new objects to pass to it.

As I said before, this isn't the only abstraction that works, nor even the only way to improve the interface.
There's a couple of other areas in which crypto libraries are typically lacking.

#### warnings and errors

Warnings and errors are a large part of how the compiler communicates with us,
the better they are, the more the programmer knows about the problem, and the faster they can fix it.
Crypto libraries typically catch simple errors, like the input being the wrong size,
but more complex error cases, like the key being reused as the nonce, are rarely, if ever, detected.
The compiler could also provide warnings on a number of potentially insecure encryption settings,
such as using weak hashing algorithms, having too small a keysize, and using known vulnerable algorithms.

#### documentation

Crypto libraries often support multiple algorithms, several outdated and broken, for backward compatability purposes.
This is a good idea, except the documentation has these side-by-side, without any indication that some are
much more vulnerable than others, which makes it much more likely the user will accidentally pick a vulnerable one.
Some libraries documentation will even have insecure example code.

insert conclusion here
