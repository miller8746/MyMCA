Setting Up Database
===================

This page will guide you on setting up your local database to work with the most recent version of MyMCA.  This page will be edited periodically with any necessary changes.

- Download |sqlite link| and the contents from the :code:`init-db-model` branch of MyMCA.
- Add the :code:`cs341-ymca.db` database in SQLiteStudio by navigating to "Database > Add Database".
- Run the :code:`create-and-populate.sql` query on the database by right-clicking the database in the Databases view and selecting "Execute SQL from file".

Your database is now up-to-date and ready to interact with the server.  Don't forget to edit :code:`index.js` to point to your database file!

.. |sqlite link| raw:: html

	<a href="https://sqlitestudio.pl" target="_blank">SQLiteStudio</a>