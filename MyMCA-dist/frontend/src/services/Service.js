/*
* File name: Service.js
* Purpose: Sends gets/posts between the Vue application and the server
* Authors: Heather Miller, Hannah Hunt
* Date Created: 2/20/22
* Last Modified: 4/26/22
*/

// Sends the gets/posts via axios
import http from "../http-common";
class ProfileService {
	/*
	* Name: getCredentials
	* Purpose: Attempts to log the user in using the username and password given
	* Parameters: username (string), password (string)
	*/
	getCredentials(username, password) {
		return http.get('/api/login/' + username + '&' + password);
		// TODO: put params in request body?
	}
	/*
	* Name: getPrograms
	* Purpose: Gets all the programs in the system with the specified criteria
	* Parameters: searchTerm (string; parameter to filter by name)
	*/
	getPrograms(searchTerm) {
		return http.get(`/api/programs/search=${searchTerm}`);
	}

	/*
	* Name: getNonDeactivatedPrograms
	* Purpose: Gets all the programs in the system with the specified criteria that are not deactivated
	* Parameters: searchTerm (string; parameter to filter by name)
	*/
	getNonDeactivatedPrograms(searchTerm){
		return http.get(`/api/nondeactivatedprograms/search=${searchTerm}`);
	}
	/*
	* Name: getUserPrograms
	* Purpose: Gets all the user's registered programs in the system with the specified criteria
	* Parameters: userId (integer; the id of the user whose programs to get), searchTerm (string; parameter to filter by name)
	*/
	getUserPrograms(userId, searchTerm) {
		return http.get(`/api/users/${userId}/programs/search=${searchTerm}`);
	}
	/*
	* Name: createProgram
	* Purpose: Creates the program in the system using the provided information
	* Parameters: program (Object; contains all the program information)
	*/
	createProgram(program) {
		return http.post(`/api/programs/`, {
			programTitle: program.title,
			programDescription: program.description,
			programCapacity: program.capacity,
			programCost: program.cost,
			programOfferingPeriod: program.offeringPeriod,
			programOfferingPeriodEnd: program.offeringPeriodEnd,
			programLocation: program.location,
			programDays: program.days,
			programRepetitions: program.repetitions
		});
	}
	/*
	* Name: saveProgram
	* Purpose: Saves a program in the system after being edited
	* Parameters: program (Object; contains all the program information)
	*/
	saveProgram(program) {
		return http.post(`/api/edit-program/`, {
			programTitle: program.title,
			programDescription: program.description,
			programCapacity: program.capacity,
			programCost: program.cost,
			programOfferingPeriod: program.offeringPeriod,
			programOfferingPeriodEnd: program.offeringPeriodEnd,
			programLocation: program.location,
			programDays: program.days,
			programRepetitions: program.repetitions,
			programId: program.id
		});
	}
	/*
	* Name: getProgram
	* Purpose: Gets a single program's information
	* Parameters: programId (integer; the program's id)
	*/
	getProgram(programId) {
		return http.get(`/api/edit-program/${programId}`);
	}
	/*
	* Name: deactivateProgram
	* Purpose: Deactivates the program with the given id
	* Parameters: programId (integer; the program's id)
	*/
	deactivateProgram(programId) {
		return http.post(`/api/deactivate-program/${programId}`);
	}
	/*
	* Name: getEnrollments
	* Purpose: Gets the enrollment count for all programs in the system
	* Parameters: none
	*/
	getEnrollments() {
		return http.get('/api/enrollments/', {});
	}
	/*
	* Name: getUserEnrollments
	* Purpose: Gets the number of enrollments a user has in each one of their enrolled programs
	* Parameters: userId (integer)
	*/
	getUserEnrollments(userId) {
		return http.get(`/api/users/${userId}/enrollments`);
	}
	/*
	* Name: createAccount
	* Purpose: Creates an account in the system with the information given
	* Parameters: userInfo (Object; contains all of the account information)
	*/
	createAccount(userInfo) {
		return http.post('/api/account/', {
			name: userInfo.name,
			username: userInfo.username,
			password: userInfo.password,
			isMember: userInfo.isMember,
			isStaff: userInfo.isStaff
		});
	}

	/*
	* Name: deactivateAccount
	* Purpose: Deactivated an account in the system with the information given
	* Parameters: userid (String; userid)
	*/
	deactivateAccount(userId) {
		return http.post('/api/account/delete', {
			userId: userId
		});
	}	
	/*
	* Name: saveAccountInfo
	* Purpose: Saves changes to a user's account information made on the Profile page
	* Parameters: isMember (boolean; new member status), isStaff (boolean; new staff status), userId (integer)
	*/
	saveAccountInfo(isMember, isStaff, userId) {
		return http.post('/api/account-info/', {
			isMember: isMember,
			isStaff: isStaff,
			userId: userId
		});
	}
	/*
	* Name: enrollUser
	* Purpose: Enrolls a specified user into a specified program
	* Parameters: userId (integer), programId (integer)
	*/
	enrollUser(userid, programId, firstName){
		return http.post(`/api/users/${userid}/enrollments/`, 
			{
				"FirstName" : firstName,
				"ProgramId" : programId
			});
	}
	/*
	* Name: getUsers
	* Purpose: Gets users in the system
	* Parameters: searchTerm (string; optional parameter to filter by user's display name)
	*/
	getUsers(searchTerm) {
		return http.get(`/api/users/search=${searchTerm}`, {});
	}
}
export default new ProfileService();