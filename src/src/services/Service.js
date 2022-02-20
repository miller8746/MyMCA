import http from "../http-common";
class ProfileService {
	getCredentials(username, password) {
		return {userId: 1, name: 'testUser', member: true, staff: true};
	}
	getPrograms(credentials) {
		var programs = [
			{
			programId: 1, 
			title: 'testProgram', 
			offeringPeriod: new Date('2/20/21'),
			description: "it's not real",
			cost: 48.0,
			capacity: 20,
			instructor: 1
			}
		];
		var postObject = { programs: programs, credentials: credentials };
		return postObject;
	}
}
export default new ProfileService();