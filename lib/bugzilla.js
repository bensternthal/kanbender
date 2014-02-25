'use strict';

var bz = require('bz');
var nconf = require('nconf');

nconf.argv().env().file({ file: 'local.json' });

var bzUrl = nconf.get('bugzilla:api_url');

var bugzilla = bz.createClient({
  url: bzUrl
});

// Given a bug id, returns the kb tag if it exists in the whiteboard field
// Format of whiteboard tag: [kb=000000]
exports.getKanbanId = function (bugId, callback) {
  bugzilla.getBug(bugId, function(error, bug) {

    if (error) return callback('bugzilla - ' + error)

    if (bug.whiteboard) {
      var match = bug.whiteboard.match(/\[kb=(\d+)\]/);

      if (match) {
        return callback(null, match[1]);
      } else {
        return callback('No Card Id In Whiteboard: ' + bugId);
      }
    }

  });
}
