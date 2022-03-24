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
			programLocation: program.location,
			programDays: program.days
		});
	}
	getEnrollments() {
		return http.get('/api/enrollments/');
	}
	createAccount(userInfo) {
		return http.post('/api/account/', {
			name: userInfo.name,
			username: userInfo.username,
			password: userInfo.password,
			isMember: userInfo.isMember,
			isStaff: userInfo.isStaff
		});
	}

	saveAccountInfo(isMember, isStaff, userId) {
		return http.post('/api/account-info/', {
			isMember: isMember,
			isStaff: isStaff,
			userId: userId
		});
	}

	enrollUser(userid, programId){
		return http.post(`/api/users/${userid}/enrollments/${programId}/`, {});
	}
}
export default new ProfileService();