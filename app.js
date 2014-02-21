'use strict';

var express = require('express');
var app = express();

var github = require('./lib/github');

app.use(express.json());
app.use(express.urlencoded());

app.post('/kanbender', function(req, res) {
    res.send('success');

    var bugs = github.getBugIDs(req.body.head_commit.message)

    console.log(bugs);

    //Bugs Found Proceed
    // if (bugs.length > 0) {
    //     console.log(bugs);
    // }
});

app.listen(8000);

//test
