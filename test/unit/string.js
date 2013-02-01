(function (window, QUnit, undefined) {
    "use strict";

    var test = QUnit.test,
        ok = QUnit.ok,
        equal = QUnit.equal,
        strictEqual = QUnit.strictEqual,
        deepEqual = QUnit.deepEqual;

    QUnit.module('string');

    test('capitalize', function () {
        ok(String.prototype.capitalize, 'string.capitalize()');
        equal('foo'.capitalize(), 'Foo', 'Properly capitalizes first letter');
        equal('fOo'.capitalize(), 'Foo', 'Lowercases all letters except first');
        equal('foo bar'.capitalize(), 'Foo bar', 'Multiple words are not titled-cased');
        equal('Foo'.capitalize(), 'Foo', 'Does not mung already-capitalized words');
    });

    test('center', function () {
        ok(String.prototype.center, 'string.center()');
        equal('foo'.center(5), ' foo ', 'Default padding is spaces');
        equal('foo'.center(6), ' foo  ', 'Uneven padding favors the right side');
        equal('foo'.center(5, '-'), '-foo-', 'Non-default padding characters');
        equal('foo'.center(3), 'foo', 'Padding equal to string length does not add whitespace');
        equal('foo'.center(2), 'foo', 'Padding less than string length returns original string');
    });

    test('count', function () {
        ok(String.prototype.count, 'string.count()');
        equal('foo'.count('f'), 1, 'Properly counts single instance of search string');
        equal('foo'.count('o'), 2, 'Properly counts multiple instances of search string');
        equal('fooo'.count('oo'), 1, 'Count is non-repeating');
        equal('ffffff'.count('ff'), 3, 'Count is non-repeating');
        equal('foo'.count('f', 1), 0, 'Optional start argument');
        equal('foo'.count('o', 2), 1, 'Optional start argument');
        equal('foo'.count('o', 0, 2), 1, 'Optional end argument');
    });

    test('endswith', function () {
        ok(String.prototype.endswith, 'string.endswith()');
        equal('foo'.endswith('oo'), true, 'Matched endings return true');
        equal('oof'.endswith('oo'), false, 'Does not match beginning/mid-string phrases');
        equal('foof'.endswith('oo'), false, 'Does not match beginning/mid-string phrases');
        equal('foo'.endswith(['o','f']), true, 'Matches from array of suffixes');
        equal('foo'.endswith(['f','o']), true, 'Matches from array of suffixes');
        equal('foo'.endswith('f', 0, 1), true, 'Optional start argument');
        equal('foo'.endswith('oo', 2), false, 'Optional start argument');
        equal('foo'.endswith('oo', 0, 1), false, 'Optional end argument');
    });

    // test('expandtabs', function () {
    //     ok(String.prototype.expandtabs, 'string.expandtabs()');
    //     equal('\tfoo'.expandtabs(), '        foo', 'Tabs expanded to default 8 spaces');
    //     equal('\tfoo'.expandtabs(2), '  foo', 'Optional tab size argument');
    //     equal('\tfoo\tbar'.expandtabs(), '        foo     bar', 'Takes into account current column');
    // });

    test('find', function () {
        ok(String.prototype.find, 'string.find()');
        equal('foo'.find('o'), 1, 'Finds lowest index');
        equal('foo'.find('bar'), -1, '-1 when sub is not found');
        equal('fofoo'.find('oo'), 3, 'Multi-character match');
    });

    test('format', function () {
        ok(String.prototype.format, 'string.format()');
        equal('foo {0}'.format('bar'), 'foo bar', 'Positional argument replaced');
        equal('{0} {1}'.format('foo', 'bar'), 'foo bar', 'Multiple positional arguments');
        equal('{0} {0}'.format('foo'), 'foo foo', 'Repeated positional arguments');
        equal('{foo}'.format({foo: 'bar'}), 'bar', 'Keyword argument replaced');
        equal('{foo} {bar}'.format({foo: 'baz', bar: 'troz'}), 'baz troz', 'Multiple keyword arguments');
        equal('{0} {bar}'.format('foo', {bar: 'baz'}), 'foo baz', 'Mixed positional and keyword arguments');
        equal('{bar} {bar}'.format({bar: 'foo'}), 'foo foo', 'Repeated keyword arguments replaced');
    });

    test('index', 4, function () {
        ok(String.prototype.index, 'string.index()');
        equal('foo'.index('f'), 0, 'Functions as String#find when substring is found');
        try {
            'foo'.index('g');
        } catch (e) {
            ok(e instanceof window.exceptions.ValueError, 'Raises ValueError when substring is not found');
            equal(e.message, 'substring not found', 'Proper error message');
        }
    });

    test('isalnum', function () {
        ok(String.prototype.isalnum, 'string.isalnum()');
        strictEqual('foo'.isalnum(), true, 'True when string is entirely alphabet characters');
        strictEqual('foo123'.isalnum(), true, 'True when string is alphanumeric');
        strictEqual('123'.isalnum(), true, 'True when string is strictly numeric');
        strictEqual('foo123-'.isalnum(), false, 'False when string is not strictly alphanumeric');
        strictEqual(''.isalnum(), false, 'False when string is empty');
        strictEqual('&%\nfoo123'.isalnum(), false);
    });

    test('isalpha', function () {
        ok(String.prototype.isalpha, 'string.isalpha()');
        strictEqual('foo'.isalpha(), true, 'True when string is entirely alphabet characters');
        strictEqual('foo123'.isalpha(), false, 'False when string contains numbers');
        strictEqual('123'.isalpha(), false, 'False when string is entirely numbers');
        strictEqual('foo-'.isalpha(), false, 'False when string contains non-alpha characters');
        strictEqual(''.isalpha(), false, 'False when string is empty');
        strictEqual('123\nfoo'.isalpha(), false);
    });

    test('isdigit', function () {
        ok(String.prototype.isdigit, 'string.isdigit()');
        strictEqual('123'.isdigit(), true, 'True when string is all digits');
        strictEqual('foo'.isdigit(), false, 'False when string does not contain digits');
        strictEqual('foo123'.isdigit(), false, 'False when string is not entirely digits');
        strictEqual('123&'.isdigit(), false, 'False when string contains special characters');
        strictEqual(''.isdigit(), false, 'False when string is empty');
        strictEqual('foo\n123'.isdigit(), false);
    });

    test('islower', function () {
        ok(String.prototype.islower, 'string.islower()');
        ok('foo'.islower(), 'True for lowercase string');
        equal('Foo'.islower(), false, 'False is string is not entirely lowercase');
        equal('123'.islower(), false, 'False when there are no cased characters');
        equal('foo\nbar'.islower(), true, 'Matches across newlines');
        equal('123\nbar'.islower(), true, 'Matches when cased characters are all after newline');
    });

    test('isspace', function () {
        ok(String.prototype.isspace, 'string.isspace()');
        ok(' '.isspace(), 'True for spaces');
        ok('\t'.isspace(), 'True for tabs');
        ok('\n'.isspace(), 'True for newlines');
        ok('\v'.isspace(), 'True for vertical whitespace');
        ok('\r'.isspace(), 'True for carriage return');
        ok('\f'.isspace(), 'True for form feed');
        ok('  '.isspace(), 'True for multiple whitespace characters');
        ok(' \t\n\v\r\f'.isspace(), 'True for combined whitespace types');
        equal('foo'.isspace(), false, 'False for letters');
        equal('123'.isspace(), false, 'False for numbers');
        equal(''.isspace(), false, 'False for empty string');
    });

    test('istitle', function () {
        ok(String.prototype.istitle, 'string.istitle()');
        equal('Foo Bar Baz'.istitle(), true, 'True on titlecased string');
        equal('foo bar baz'.istitle(), false, 'False on lowercase string');
        equal('Foo Bar\'s Baz'.istitle(), false, 'Characters following single quotes should be uppercased');
        equal('Foo Bar\'S Baz'.istitle(), true, 'Characters following single quotes should be uppercased');
        equal('FoO BaR'.istitle(), false, 'Mixed cased does not match');
    });

    test('isupper', function () {
        ok(String.prototype.isupper, 'string.isupper()');
        equal('FOO BAR'.isupper(), true, 'True on all uppercased letters');
        equal('FOO 123'.isupper(), true, 'True when all cased characters are uppercase');
        equal('123'.isupper(), false, 'False when there are no cased characters');
        equal('FOo'.isupper(), false, 'False when not all cased characters are upper');
        equal('FOO\nBAR'.isupper(), true, 'Matches across newlines');
        equal('123\nBAR'.isupper(), true, 'Matches when cased characters are all after newline');
    });

    test('join', function () {
        ok(String.prototype.join, 'string.join()');
        equal(' '.join(['foo','bar']), 'foo bar', 'String is used as separator character');
        equal('_'.join(['bar','baz']), 'bar_baz', 'String is used as separator character');
    });

    test('ljust', function () {
        ok(String.prototype.ljust, 'string.ljust()');
        equal('foo'.ljust(5), 'foo  ', 'Pads on the right with space by default');
        equal('foo bar'.ljust(4), 'foo bar', 'Strings longer than width are returned untouched');
        equal('foo'.ljust(5,'*'), 'foo**', 'Optional fillchar may be provided');
    });

    test('lower', function () {
        ok(String.prototype.lower, 'string.lower()');
        ok(String.prototype.lower === String.prototype.toLowerCase, 'Is implementation of string.toLowerCase');
    });

    test('lstrip', function () {
        ok(String.prototype.lstrip, 'string.lstrip()');
        equal('    foo'.lstrip(), 'foo', 'Leading strip characters (default to space) are removed');
        equal('    foo    '.lstrip(), 'foo    ', 'Trailing matching characters are not removed');
        equal('    f oo'.lstrip(' f'), 'oo', 'All combinations of matching characters are removed');
        equal('www.example.com'.lstrip('cmowz.'), 'example.com', 'Does not strip prefix, but all combinations');
    });

    test('partition', function () {
        ok(String.prototype.partition, 'string.partition()');
        deepEqual('foo bar'.partition(' '), ['foo', ' ', 'bar'], 'Returns 3-element array');
        deepEqual('foo bar baz'.partition(' '), ['foo', ' ', 'bar baz'], 'Splits at first occurrence of separator');
        deepEqual('foo_bar'.partition(' '), ['foo_bar', '', ''], 'Unmatched separator returns original string and two empty strings');
        deepEqual('foo_bar'.partition('_'), ['foo', '_', 'bar'], 'Any separator may be used');
    });

    test('_replace', function () {
        ok(String.prototype._replace, 'string._replace()');
        equal('foo'._replace('fo', 'gl'), 'glo', 'Occurrences that match are replaced');
        equal('na na na na batman!'._replace('na', 'da'), 'da da da da batman!', 'All occurrences are replaced');
        equal('little bunny foo foo'._replace('foo', 'bar', 1), 'little bunny bar foo', 'Optional count parameter limits number of replacements');
        equal('cat dog'._replace('cat', 'bat'), 'bat dog');
        equal('foo bar'._replace('foo', 'bar', 0), 'foo bar');
        equal('foo bar'._replace('foo', 'bar', -1), 'bar bar');
        equal('foo foo foo foo'._replace('foo', 'bar', 2), 'bar bar foo foo');
    });

    test('rfind', function () {
        ok(String.prototype.rfind, 'string.rfind()');
        equal('foo'.rfind('o'), 2, 'Returns highest index');
        equal('foo'.rfind('g'), -1, 'Returns -1 when no match is found');
        equal('foo bar'.rfind('foo', 2), -1, 'Optional start position');
        equal('foo foo'.rfind('foo', 0, 4), 0, 'Optional end position');
    });

    test('rindex', 4, function () {
        ok(String.prototype.rindex, 'string.rindex()');
        equal('foo foo'.rindex('f'), 4, 'Functions as String#rfind when substring is found');
        try {
            'foo'.rindex('g');
        } catch (e) {
            ok(e instanceof window.exceptions.ValueError, 'Raises ValueError when substring is not found');
            equal(e.message, 'substring not found', 'Proper error message');
        }
    });

    test('rjust', function () {
        ok(String.prototype.rjust, 'string.rjust()');
        equal('foo'.rjust(5), '  foo', 'Pads to the right with space by default');
        equal('foobar'.rjust(4), 'foobar', 'Returns original string if width is less than string length');
        equal('foo'.rjust(5, '-'), '--foo', 'Optional fillchar argument');
    });

    test('rpartition', function () {
        ok(String.prototype.rpartition, 'string.rpartition()');
        deepEqual('foo bar'.rpartition(' '), ['foo', ' ', 'bar']);
        deepEqual('foo bar baz'.rpartition(' '), ['foo bar', ' ', 'baz']);
        deepEqual('foobar'.rpartition(' '), ['', '', 'foobar']);
        deepEqual('foo_bar_baz'.rpartition('_'), ['foo_bar', '_', 'baz']);
    });

    test('rsplit', function () {
        ok(String.prototype.rsplit, 'string.rsplit()');
        deepEqual('1,2,3'.rsplit(','), ['1','2','3']);
        deepEqual('1,2,3'.rsplit(',', 1), ['1,2','3']);
        deepEqual('  1  2   3   '.rsplit(null, 1), ['  1  2','3']);
        deepEqual('   '.rsplit(), []);
        deepEqual('  1  2  3  4'.rsplit(null, 2), ['  1  2','3','4']);
        deepEqual('  1  2  3  4 5'.rsplit(null, 3), ['  1  2','3','4','5']);
        deepEqual('1,2,3,4'.rsplit(',', 2), ['1,2','3','4']);
    });

    test('rstrip', function () {
        ok(String.prototype.rstrip, 'string.rstrip()');
        equal('foo    '.rstrip(), 'foo', 'Trailing strip characters (default to space) are removed');
        equal('    foo    '.rstrip(), '    foo', 'Trailing matching characters are not removed');
        equal('mississippi'.rstrip('ipz'), 'mississ');
    });

    test('_split', function () {
        ok(String.prototype._split, 'string._split()');
        deepEqual('1,2,3'._split(','), ['1','2','3']);
        deepEqual('1,2,3'._split(',', 1), ['1','2,3']);
        deepEqual('   '._split(), []);
        deepEqual('1 2 3'._split(), ['1','2','3']);
        deepEqual(' 1  2   3  '._split(), ['1','2','3']);
        deepEqual('  1  2   3   '._split(null, 1), ['1','2   3   ']);
        deepEqual('1<>2<>3'._split('<>'), ['1','2','3']);
        deepEqual('  1<>2  '._split('<>'), ['  1','2  ']);
        deepEqual('1  2   3'._split(null, -1), ['1','2','3']);
        deepEqual('1  2  3  4  '._split(null, 2), ['1','2','3  4  ']);
    });

    test('splitlines', function () {
        ok(String.prototype.splitlines, 'string.splitlines()');
        deepEqual('ab c\n\nde fg\rkl\r\n'.splitlines(), ['ab c', '', 'de fg', 'kl']);
        // deepEqual('ab c\n\nde fg\rkl\r\n'.splitlines(true), ['ab c\n', '\n', 'de fg\r', 'kl\r\n']);
        deepEqual(''.splitlines(), []);
    });

    test('startswith', function () {
        ok(String.prototype.startswith, 'string.startswith()');
        equal('foo'.startswith('f'), true);
        equal('foo bar'.startswith('foo'), true);
        equal('foo bar'.startswith('foo', 1), false);
        equal('foo bar'.startswith('bar', 4), true);
        equal('foo bar'.startswith('foo', 0, 2), false);
        equal('foo bar'.startswith(['baz','foo']), true);
        equal('foo bar'.startswith(['bar','baz']), false);
    });

    test('strip', function () {
        ok(String.prototype.strip, 'string.strip()');
        equal('    spacious    '.strip(), 'spacious');
        equal('www.example.com'.strip('cmowz.'), 'example');
        equal('    foo bar    '.strip(), 'foo bar');
    });

    test('swapcase', function () {
        ok(String.prototype.swapcase, 'string.swapcase()');
        equal('foo'.swapcase(), 'FOO');
        equal('fOo'.swapcase(), 'FoO');
        equal('Foo&'.swapcase(), 'fOO&');
    });

    test('title', function () {
        ok(String.prototype.title, 'string.title()');
        equal("they're bill's friends from the UK".title(), "They'Re Bill'S Friends From The Uk");
        equal('foo bar baz'.title(), 'Foo Bar Baz');
        equal('FOO BAR BAZ'.title(), 'Foo Bar Baz');
    });

    test('upper', function () {
        ok(String.prototype.upper, 'string.upper()');
        ok(String.prototype.upper === String.prototype.toUpperCase, 'Is implementation of string.toUpperCase');
    });

    test('zfill', function () {
        ok(String.prototype.zfill, 'string.zfill()');
        equal('foo'.zfill(5), '00foo');
        equal('foo bar'.zfill(3), 'foo bar');
    });
}(this, window.QUnit));
