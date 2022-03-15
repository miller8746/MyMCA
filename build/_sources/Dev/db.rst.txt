Setting Up Database
===================

This page will guide you on setting up your local database to work with the most recent version of MyMCA.  This page will be edited periodically with any necessary changes.

- Download |sqlite link| and :code:`cs341-ymca.db` from the :code:`init-db-model` branch of MyMCA.
- Add the database in SQLiteStudio by navigating to "Database > Add Database".
- You will need to temporarily undo a foreign key constraint in order to do the next step.  
	- While connected to the database in SQLiteStudio, go to the Enrollments table and select the Foreign Key icon in the ProgramId column.
	- Undo the Foreign Key constraint by unchecking "Foreign Key" and hitting OK.
	- Save your changes by hitting the green checkmark in the header of the table.
- Download :code:`program-updates-3.sql` from the :code:`hannah/dbsetup-and-login` branch.
- Run the query on the database by right-clicking the database in the Databases view and selecting "Execute SQL from file".
- Now, you will need to re-add the Foreign Key to the Programs table.
	- In the Enrollments table, double-click the Foreign Key entry in the ProgramId column.
	- Check "Foreign Key" and hit "Configure".
	- Set "Foreign table" to "Programs" and "Foreign column" to "ProgramId" and hit Apply.
	- Return to the table view and save your changes by hitting the green checkmark in the header of the table.

Your database is now up-to-date and ready to interact with the server.  Don't forget to edit :code:`index.js` to point to your database file!

.. |sqlite link| raw:: html

	<a href="https://sqlitestudio.pl" target="_blank">SQLiteStudio</a>