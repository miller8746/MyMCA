# MyMCA

This is our project for CS 341-01.  It is a small-scale web-based application that allows people to sign up for YMCA programs.

Setting Up a Development Environment
------------------------------------
First, you will need to install Node.js from [here](https://nodejs.org/en/download/).  Then, run the following commands in your directory of choice:

> npm install -g @vue/cli
> 
> vue create project-name

Use the third option, "Manually select features".  Use the spacebar to check "Router" and uncheck "Linter / Formatter" so that the only two features that are checked are "Babel" and "Router".  Then hit Enter, and select the following in the next prompts: "Vue 3.x", "Y", "package.json", and "N".  This will scaffold the project.  

Next, install the project dependencies by **cd'ing into the project folder** and running

> npm install vue-router axios

Finally, (re)place the contents of the project folder with the contents of /MyMCA-frontend in this repo.  Then, to run the project, run this command in the project folder:

> npm run serve


Useful Links
------------
- [Vue documentation](https://vuejs.org/guide/introduction.html)
- [Node.js documentation](https://nodejs.org/en/docs/)
- [Node.js and Express guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [SQLiteStudio download](https://sqlitestudio.pl)
