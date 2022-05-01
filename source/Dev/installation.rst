Installing and Running MyMCA
============================

Setting Up a Development Environment
------------------------------------
First, you will need to install Node.js from |node.js link|.  After this is done, you can set up the database, backend, and frontend separately.  To get started, download the contents of the |MyMCA link|.

Database
--------

- Download |sqlite link|.
- Add the :code:`/MyMCA-dist/db/cs341-ymca.db` database in SQLiteStudio by navigating to "Database > Add Database".
- Run the :code:`/MyMCA-dist/db/create-and_populate.sql` query on the database by right-clicking the database in the Databases view and selecting "Execute SQL from file".

Your database is now up-to-date and ready to interact with the server.  Don't forget to edit :code:`index.js` to point to your database file (if it is not already).

Backend
-------

In the directory you want to create the backend project in, run::

	npm init

You can use the default options when prompted.  You will also need to install some dependencies with this command::

	npm install express cors sqlite3 body-parser object-hash --save

Then, retrieve :code:`/MyMCA-dist/backend/index.js` and place it in the project folder.  Finally, you can run the following command to have the backend listening on port 3000::

	node index.js

Don't forget to edit :code:`index.js` to point to your database file (if it is not already).

Frontend
--------
In the directory you created for the backend project, run the following::

	npm install -g @vue/cli
	vue create project-name

You can replace "project-name" with whatever you want the project to be named.  It is recommended to use something like "MyMCA", as the project name will be visible in the browser tab.  

The create command will ask you for some inputs.  Use the third option, "Manually select features".  Use the spacebar to check "Router", check "Vuex", and uncheck "Linter / Formatter" so that the only three features that are checked are "Babel", "Router", and "Vuex".  Then hit Enter, and select the following in the next prompts: "Vue 3.x", "Y", "package.json", and "N".  This will scaffold the project.

Next, install the frontend project dependencies by **cd'ing into the frontend project folder** and running::

	npm install axios vuex-persistedstate moment --save

Finally, (re)place the contents of the project folder with the contents of :code:`/MyMCA-dist/frontend` in this repo.  There are some extra bits left over from the initial scaffolding that can be removed (but don't have to be), including:

- src/views
- src/store
- src/router/index.js
- src/components/HelloWorld.vue

Then, to run the project, run this command in the project folder::

	npm run serve

You will now be able to access the project through |localhost link|.

.. |node.js link| raw:: html

	<a href="https://nodejs.org/en/download/" target="_blank">here</a>

.. |MyMCA link| raw:: html

	<a href="https://github.com/miller8746/MyMCA" target="_blank">main branch of MyMCA on GitHub</a>

.. |sqlite link| raw:: html

	<a href="https://sqlitestudio.pl" target="_blank">SQLiteStudio</a>

.. |localhost link| raw:: html

	<a href="http://localhost:8080" target="_blank">http://localhost:8080</a>