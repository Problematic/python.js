/*! python.js - v0.1.0 - 2013-02-01
* https://github.com/Problematic/python.js
* Copyright (c) 2013 Derek Stobbe; Licensed MIT */

(function (window, undefined) {
    "use strict";

    var exceptions = {};

    var NotImplementedError = function (message) {
        this.message = message;
        this.name = 'NotImplementedError';
    };
    NotImplementedError.prototype = new Error();
    NotImplementedError.prototype.constructor = NotImplementedError;

    var ValueError = function (message) {
        this.message = message;
        this.name = 'ValueError';
    };
    ValueError.prototype = new Error();
    ValueError.prototype.constructor = ValueError;

    exceptions.NotImplementedError = NotImplementedError;
    exceptions.ValueError = ValueError;

    window.exceptions = exceptions;
}(this));

(function (window, undefined) {
    "use strict";

    var exceptions = window.exceptions,
        strProto = String.prototype;

    strProto.capitalize = function () {
        var string = this.toLowerCase();

        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    strProto.center = function (width, fillchar) {
        var string = this, len = string.length, padchars = width - len, left, right;
        fillchar = fillchar || ' ';

        if (width <= len) {
            return string;
        }

        left = Math.floor(padchars / 2);
        right = width - len - left;

        left = new Array(left + 1).join(fillchar);
        right = new Array(right + 1).join(fillchar);

        return left + string + right;
    };

    strProto.count = function (sub, start, end) {
        var string = this.slice(start || 0, end), count = 0, idx;

        if (sub === '') {
            return string.length + 1;
        }

        idx = string.indexOf(sub);
        while (idx !== -1) {
            count++;
            idx = string.indexOf(sub, idx + sub.length);
        }

        return count;
    };

    strProto.endswith = function (suffix, start, end) {
        var string = this.slice(start || 0, end);

        if (suffix instanceof Array) {
            for (var i = 0; i < suffix.length; i++) {
                if (string.indexOf(suffix[i], string.length - suffix[i].length) !== -1) {
                    return true;
                }
            }

            return false;
        }

        return string.indexOf(suffix, string.length - suffix.length) !== -1;
    };

    strProto.find = function (sub, start, end) {
        var string = this.slice(start || 0, end);

        return string.indexOf(sub);
    };

    strProto.format = function () {
        var regex, kwargs = {}, args = Array.prototype.slice.call(arguments), string = this;
        if (typeof args[args.length - 1] === 'object') {
            kwargs = args.pop();
        }

        for (var i = 0; i < args.length; i++) {
            regex = new RegExp('\\{' + i + '\\}', 'gm');
            string = string.replace(regex, arguments[i]);
        }

        for (var key in kwargs) {
            regex = new RegExp('\\{' + key + '\\}', 'gm');
            string = string.replace(regex, kwargs[key]);
        }

        return string;
    };

    strProto.index = function (sub, start, end) {
        var idx = this.find(sub, start, end);

        if (idx === -1) {
            throw new exceptions.ValueError('substring not found');
        }

        return idx;
    };

    strProto.isalnum = function () {
        return this.search(/^[a-z0-9]+$/gi) !== -1;
    };

    strProto.isalpha = function () {
        return this.search(/^[a-z]+$/gi) !== -1;
    };

    strProto.isdigit = function () {
        return this.search(/^[0-9]+$/g) !== -1;
    };

    strProto.islower = function () {
        return this.search(/[a-z]+/gi) !== -1 && this === this.toLowerCase();
    };

    strProto.isspace = function () {
        return this.search(/^\s+$/g) !== -1;
    };

    strProto.istitle = function () {
        return this === this.title();
    };

    strProto.isupper = function () {
        return this.search(/[a-z]+/gi) !== -1 && this === this.toUpperCase();
    };

    strProto.join = function (iterable) {
        return iterable.join(this);
    };

    strProto.ljust = function (width, fillchar) {
        var padding;

        fillchar = fillchar || ' ';
        padding = width - this.length;
        if (padding <= 0) {
            return this;
        }

        return this + new Array(padding + 1).join(fillchar);
    };

    strProto.lower = strProto.toLowerCase;

    strProto.lstrip = function (chars) {
        var string = this, regex;
        chars = chars || '\\s';

        regex = new RegExp('^([' + chars + '])*', 'g');

        return string.replace(regex, '');
    };

    strProto.partition = function (sep) {
        var string = this, arr, split;

        if (string.indexOf(sep) === -1) {
            return [string, '', ''];
        }

        split = string.split(new RegExp('(' + sep + ')'));
        arr = split.slice(0, 2);
        arr.push(split.slice(2).join(''));

        return arr;
    };

    strProto._replace = function (old, rep, count) {
        var string = this, regex;
        if (count === 0) {
            return string;
        } else if (!count || count < 0) {
            return this.split(old).join(rep);
        }

        regex = new RegExp('(' + old + ')');
        while (count--) {
            string = string.replace(regex, rep);
        }

        return string;
    };

    strProto.rfind = function (sub, start, end) {
        var string = this.slice(start || 0, end);

        return string.lastIndexOf(sub);
    };

    strProto.rindex = function (sub, start, end) {
        var idx = this.rfind(sub, start, end);

        if (idx === -1) {
            throw new exceptions.ValueError('substring not found');
        }

        return idx;
    };

    strProto.rjust = function (width, fillchar) {
        var padding;

        fillchar = fillchar || ' ';
        padding = width - this.length;
        if (padding <= 0) {
            return this;
        }

        return new Array(padding + 1).join(fillchar) + this;
    };

    strProto.rpartition = function (sep) {
        var string = this, arr, split;

        if (string.indexOf(sep) === -1) {
            return ['', '', string];
        }

        split = string.split(new RegExp('(' + sep + ')'));
        arr = split.slice(-2);
        arr.unshift(split.slice(0, -2).join(''));

        return arr;
    };

    strProto.rsplit = function (sep, maxsplit) {
        var string = this, arr, split, remainder, whitespace = '\\s+';

        if (string === '' && sep) {
            return [''];
        }

        sep = sep || whitespace;
        if (sep === whitespace) {
            string = maxsplit ? string.rstrip() : string.trim();
            if (string === '') {
                return [];
            }
        }

        if (maxsplit && maxsplit > 0) {
            split = string.split(new RegExp('(' + sep + ')'));
            remainder = split.slice(0, 0-maxsplit*2).join('');

            arr = string.strip(sep).split(new RegExp(sep));
            arr = arr.slice(arr.length - maxsplit);

            arr.unshift(remainder);

            return arr;
        }

        return string.split(new RegExp(sep));
    };

    strProto.rstrip = function (chars) {
        var string = this, regex;
        chars = chars || '\\s';

        regex = new RegExp('([' + chars + '])*$', 'g');

        return string.replace(regex, '');
    };

    strProto._split = function (sep, maxsplit) {
        var string = this, arr, split, remainder, whitespace = '\\s+';

        if (string === '' && sep) {
            return [''];
        }

        sep = sep || whitespace;
        if (sep === whitespace) {
            string = maxsplit ? string.lstrip() : string.trim();
            if (string === '') {
                return [];
            }
        }

        if (maxsplit && maxsplit > 0) {
            arr = string.split(new RegExp(sep));
            arr = arr.slice(0, maxsplit);

            split = string.split(new RegExp('(' + sep + ')'));
            remainder = split.slice(maxsplit + 1).join('').lstrip(sep);

            arr.push(remainder);

            return arr;
        }

        return string.split(new RegExp(sep));
    };

    strProto.splitlines = function (keepends) {
        if (this === '') {
            return [];
        }

        return this.strip('\r\n').split(/[\r\n]/);
    };

    strProto.startswith = function (prefix, start, end) {
        var string = this.slice(start || 0, end);

        if (prefix instanceof Array) {
            for (var i = 0; i < prefix.length; i++) {
                if (string.indexOf(prefix[i]) === 0) {
                    return true;
                }
            }

            return false;
        }

        return string.indexOf(prefix) === 0;
    };

    strProto.strip = function (chars) {
        var string = this, regex;
        chars = chars || '\\s';

        regex = new RegExp('^([' + chars + '])*|([' + chars + '])*$', 'g');

        return string.replace(regex, '');
    };

    strProto.swapcase = function () {
        var string = this, arr = [], char;

        for (var i = 0; i < string.length; i++) {
            char = string[i];
            if (char.islower()) {
                arr.push(char.upper());
            } else if (char.isupper()) {
                arr.push(char.lower());
            } else {
                arr.push(char);
            }
        }

        return arr.join('');
    };

    strProto.title = function () {
        var arr = this.split(/([^\w])/), fragment;
        for (var i = 0; i < arr.length; i++) {
            fragment = arr[i];
            arr[i] = fragment[0].upper() + fragment.slice(1).lower();
        }

        return arr.join('');
    };

    strProto.upper = strProto.toUpperCase;

    strProto.zfill = function (width) {
        return this.rjust(width, '0');
    };
}(this));
