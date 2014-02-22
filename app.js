'use strict';

var nconf = require('nconf');
var express = require('express');
var app = express();

var github = require('./lib/github');
var bugzilla = require('./lib/bugzilla');

app.use(express.json());
app.use(express.urlencoded());

nconf.argv().env().file({ file: 'local.json' });


// for each bug mentioned we do this
// then for each whiteboard tag we do the kanban thing
// bugzilla.getKanbanId(948057, function(result) {
//   console.log(result);
// });

// Main loop - project maps to settings file
app.post('/kanbender/:project', function(req, res) {
  console.log(req.params.project);
  // res.send('success');

  // var commits = req.body.commits;
  // var bugs = github.getBugIDs(commits)

  // // Bugs Found Proceed
  // if (bugs.length > 0) {
  //   //for each bug we need to look for the whiteboard tag in bugzilla
  //   //call back hell!!

  //}
});

app.listen(8000);
