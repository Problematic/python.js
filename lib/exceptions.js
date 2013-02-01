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
