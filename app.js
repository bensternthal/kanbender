'use strict';

//require('console-stamp')(console, 'isoDateTime');

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
  var branch = req.body.ref;

  // Bail of branch is not master or if there are no commits
  if(branch != "refs/heads/master")
    return errorHandler("Commit Not To Master: " + branch);

  if(!commits)
    return errorHandler("No commits");

  var bugs = github.getBugIDs(commits);
  if (bugs.length > 0) {
    nimble.each(bugs, function (bugId) {
      taskIsDone(bugId, project);
    });
  }

});

function taskIsDone(bugId, project) {
  // Get card id from whiteboard in bugzilla
  bugzilla.getKanbanId(bugId, function(error, cardId) {
    if (error) return errorHandler(error);

    // Move card: testing? use testUpdateCard
    kanbanery.updateCard(cardId,project, function(error, cardId) {
      if (error) return errorHandler(error);
      console.log('Card Moved: ' + cardId);
    });
  });
}


function errorHandler(error) {
  console.error('Error: ' + error);
}
