kanbender
=========

Kanbanery Helper For Moving Merged Cards To Done Column

How Kanbender works:

1. On github you add kanbender as a webhook.
2. On merge kanbender gets and parses the commit messages looking for bug id's
that follow the same pattern as the bugzilla service hook.
3. Each bug found is then looked up in bugzilla, the whiteboard is examined for a
kanbanery card ID matching the pattern [kb=xxxxxx].
4. Any kanban cards found are moved to the done column.


Setup
-----

1. Get the source:

   ```sh
   $ git clone git@github.com:bensternthal/kanbender.git
   $ cd kanbender
   ```

2. Install requirements:

   ```sh
   $ npm install
   ```

3. Configure the app:
Copy local.json-dist to local.json and populate the values.


4. Run app:

   ```sh
   $ nodemon app.js
   ```

Configuration
-----
___kanbanery:project_name___
The name of your project. This allows multiple github projects
to use the same kanbender instance. Project name is also used when setting up the
github webhook.

___kanbanery:api_token___
The API key for the user you want associated with updates.


___kanbanery:workspace_url___
The url of your workspace including API version: `https://WORKSPACE.kanbanery.com/api/v1/`

___kanbanery:project_id___
The ID of your project, found in URL: `https://project.kanbanery.com/projects/ID/board/`

___kanbanery:done_column_id___
The ID of the projects done column, can be found via this url `https://WORKSPACE.kanbanery.com/api/v1/projects/PROJECT_ID/columns.json`

___bugzilla:api_url___
URL of the bugzilla API, either prod or dev (landfill)

Github Setup
-----
1. Add the URL under webhook `http://yourserver.co,/kanbender/PROJECT` remember
project maps to whatever you entered into the json file.

2. Select json payload.

3. Subscribe to push event only

4. Save


Kanbanery Setup
-----
None requried although you may want to create a dedicated user for the API.

