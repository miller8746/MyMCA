import http from "../http-common";
class ProfileService {
	getCredentials(username, password) {
		return http.get('/api/login/' + username + '&' + password);
		// TODO: put params in request body?
	}
	getPrograms(userId) {
		return http.get(`/api/programs/${userId}`);
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
			programDays: program.days,
			programRepetitions: program.repetitions
		});
	}
	getEnrollments() {
		return http.get('/api/enrollments/', {});
	}
	getUserEnrollments(userId) {
		return http.get(`/api/user-enrollments/${userId}`);
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
	getUsers() {
		return http.get('/api/users/', {});
	}
}
export default new ProfileService();