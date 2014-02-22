'use strict';

var bz = require('bz');

var bugzilla = bz.createClient({
  url: 'https://api-dev.bugzilla.mozilla.org/latest/'
});

// Given a bug id, returns the kb tag if it exists in the whiteboard field
// Format of whiteboard tag: [kb=000000]
exports.getKanbanId = function (bugId, callback) {
  bugzilla.getBug(bugId, function(error, bug) {
    if (!error) {
      if(bug.whiteboard) {
        var match = bug.whiteboard.match(/\[kb=(\d+)\]/);

        if (match) {
          return callback(match[1]);
        }
      }
    }
  });
}


