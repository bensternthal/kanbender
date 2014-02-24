'use strict';

var request = require('request');
var nconf = require('nconf');

nconf.argv().env().file({ file: 'local.json' });

exports.updateCard = function(id, project, callback) {
  var projectUrl = nconf.get(project + ':kanbanery:workspace_url');
  var apiToken = nconf.get(project + ':kanbanery:api_token');
  var doneColumnId = nconf.get(project + ':kanbanery:done_column_id');

  var options = {
    method: 'PUT',
    url: projectUrl + 'tasks/' + id + '.json',
    headers: {
        'X-Kanbanery-ApiToken': apiToken
    },
    form: {
      'task[column_id]' : doneColumnId
    }
  }

  // fix this callback
  request(options, function (error, response, body) {
    if (error) return callback('kanbanery - ' + error)
    return callback(null, id);
  });

}
