'use strict';

/* Utilities for working with Github */

// Adapted From https://github.com/github/github-services/blob/master/lib/services/bugzilla.rb
// Special thanks to Michael Kelly
var bugRegex = new RegExp("(?:(?:close|fix|address)e?(?:s|d)? )?(?:ticket|bug|tracker item|issue)s?:? *(?:[\\d ,\\+&#and]+)","i");

function findBugs(txt) {
    var bugs = [];
    var result = bugRegex.exec(txt);
    if (result) {
        var pieces = result[0].split(/(?:,|and)/);
        for (var i = 0; i < pieces.length; i++) {
            var num = pieces[i].match(/\d+/);
            if (num) {
                bugs.push(parseInt(num[0], 10));
            }
        }
    }

    return bugs;
}

exports.testOutput = function() {
    var tests = ['bug 5912', 'issue 3, 5, and 7', 'closed bug 999 and 302', 'addresses ticket 30, 52, #62, & 5'];

    for (var k = 0; k < tests.length; k++) {
        console.log(tests[k] + ' = [' + findBugs(tests[k]).join(', ') + ']');
    }
}

// Returns An Array Of Bugs Mentioned In A Commit Message */
exports.getBugIDs = function(message) {
    return findBugs(message);
}
