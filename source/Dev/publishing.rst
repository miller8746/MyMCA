Publishing Steps
================

Due to the nature of the MyMCA development environment, commits to MyMCA must be done manually.  Below is a guide to help you commit to the proper directory structure of the :code:`main` branch of MyMCA.

First, visit the |main branch|.  The :code:`/MyMCA-dist` directory contains three folders, one called :code:`/frontend`, one called :code:`/backend`, and one called :code:`/db`.  The :code:`/frontend` directory contains the Vue.js project, while the :code:`/backend` directory contains the Node.js project.  The :code:`/db` folder contains the script for creating and populating the database and the database scaffold, and will only ever need to be changed when database tables are altered (requiring an update to :code:`create-and_populate.sql`).

In order to make a commit, I recommend creating a :code:`/MyMCA-dist` directory on your machine with the appropriate subdirectories, populate them with the changed files, and drag the entire directory into GitHub.  This will prevent the repository from being filled from unnecessary files that are created while scaffolding the project, such as config files and dependency code.

**The only file that will ever need to be updated in** :code:`/backend` **is** :code:`index.js` **!**

**The only files that will ever need to be updated in** :code:`/frontend` **are** :code:`vue.config.js` **and files in the directories** :code:`/public` **and** :code:`/src` **!**

.. |main branch| raw:: html

	<a href="https://github.com/miller8746/MyMCA" target="_blank">main branch of MyMCA on GitHub</a>