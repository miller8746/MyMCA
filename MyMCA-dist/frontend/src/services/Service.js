import http from "../http-common";
class ProfileService {
	getCredentials(username, password) {
		return http.get('/api/login/' + username + '&' + password);
		// TODO: put params in request body?
	}
	getPrograms() {
		return http.get(`/api/programs`);
	}
	createProgram(program) {
		return http.post(`/api/programs/`, {
			programTitle: program.title,
			programDescription: program.description,
			programCapacity: program.capacity,
			programCost: program.cost,
			programOfferingPeriod: program.offeringPeriod,
			programOfferingPeriodEnd: program.offeringPeriodEnd,
			programLocation: program.location
		});
	}
	getEnrollments() {
		return http.get('/api/enrollments/');
	}
}
export default new ProfileService();