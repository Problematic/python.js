# python.js

python object APIs, implemented as faithfully as possible in javascript

This library adds methods -- lots of them -- to native object prototypes.
If that sort of thing upsets you, python.js may not be for you.


## Implemented so far

* string


## Caveat emptor

There are a few notable exceptions:

* several methods are not implemented (yet?):
    * string.decode
    * string.encode
    * string.expandtabs
    * string.translate
* string.split and string.replace are prefixed with '_' to preserve native js methods
* string.splitlines ignores the `keepends` argument for now
