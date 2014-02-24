'use strict';

var express = require('express');
var nimble = require('nimble');
var nconf = require('nconf');
var app = express();

var github = require('./lib/github');
var bugzilla = require('./lib/bugzilla');
var kanbanery = require('./lib/kanbanery');

app.use(express.json());
app.use(express.urlencoded());

nconf.argv().env().file({ file: 'local.json' });

app.listen(8000);

// Main loop
app.post('/kanbender/:project', function(req, res) {
  res.send('success');
  var project = req.params.project;
  var commits = req.body.commits;

  // Bail if no commit message, loop through found bugs
  if (req.body.commits) {
    var bugs = github.getBugIDs(commits);

    if (bugs.length > 0) {
      nimble.each(bugs, function (val) {
        taskIsDone(val, project);
      });
    }
  }
});

function taskIsDone(id, project) {
  var kanbanCardId = null;

  nimble.series([
    function (callback) {
      bugzilla.getKanbanId(id, function(error, kBId) {
        if (error) return errorHandler(error);
        kanbanCardId = kBId;
        callback();
      })
    },
    function (callback) {
      kanbanery.updateCard(kanbanCardId, project, function(error) {
        if (error) return errorHandler(error);
        callback();
      });
    }
  ]);
}

function errorHandler(error) {
  console.log('Error: ' + error);
}



