'use strict';

var nconf = require('nconf');
var express = require('express');
var app = express();

var github = require('./lib/github');
var bugzilla = require('./lib/bugzilla');
var kanbanery = require('./lib/kanbanery');

app.use(express.json());
app.use(express.urlencoded());

nconf.argv().env().file({ file: 'local.json' });

app.listen(8000);

// Main loop - project maps to settings file
app.post('/kanbender/:project', function(req, res) {
  res.send('success');
  var project = req.params.project;
  var commits = req.body.commits;

  // Bail if no commit message
  if (req.body.commits) {
    var bugs = github.getBugIDs(commits);
    // Bugs Found Proceed
    if (bugs.length > 0) {

      // For each bug do all the things
      for(var b = 0; b < bugs.length; b++) {
        // Look up kb tags from Bugzilla

        bugzilla.getKanbanId(bugs[b], function(id) {
          // Move any bugs with kb id populated

          kanbanery.updateCard(id,project, function(id) {
            console.log("and we are done");
          });
        });
      }
    }
  }

});


