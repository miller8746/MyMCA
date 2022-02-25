# MyMCA

This is our project for CS 341-01.  It is a small-scale web-based application that allows people to sign up for YMCA programs.

Setting Up a Development Environment
------------------------------------
First, you will need to install Node.js from [here](https://nodejs.org/en/download/).  Then you can set up the backend and frontend separately.

Backend
-------
In the directory you want to create the backend project in, run

> npm init

You can use the default options when prompted.  You will also need to install some dependencies with this command:

> npm install express cors sqlite3 --save

Then, download /MyMCA-dist/backend/index.js from this repo and place it in the project folder.  Finally, you can run the following command to have the backend listening on port 3000:

> node index.js

Frontend
--------
In the directory you created for the backend project, run the following:

> npm install -g @vue/cli
> 
> vue create project-name

You can replace "project-name" with whatever you want the project to be named.  It is recommended to use something like "MyMCA", as the project name will be visible in the browser tab.  

The create command will ask you for some inputs.  Use the third option, "Manually select features".  Use the spacebar to check "Router", check "Vuex", and uncheck "Linter / Formatter" so that the only three features that are checked are "Babel", "Router", and "Vuex".  Then hit Enter, and select the following in the next prompts: "Vue 3.x", "Y", "package.json", and "N".  This will scaffold the project.

Next, install the frontend project dependencies by **cd'ing into the frontend project folder** and running

> npm install axios vuex-persistedstate moment --save

Finally, (re)place the contents of the project folder with the contents of /MyMCA-dist/frontend in this repo.  There are some extra bits left over from the initial scaffolding that can be removed (but don't have to be), including:

- src/views
- src/store
- src/router/index.js
- src/components/HelloWorld.vue

Then, to run the project, run this command in the project folder:

> npm run serve

You will now be able to access the project through http://localhost:8080.


Useful Links
------------
- [Vue documentation](https://vuejs.org/guide/introduction.html)
- [Node.js documentation](https://nodejs.org/en/docs/)
- [Node.js and Express guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [SQLiteStudio download](https://sqlitestudio.pl)
