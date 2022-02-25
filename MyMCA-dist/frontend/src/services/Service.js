import http from "../http-common";
class ProfileService {
	getCredentials(username, password) {
		return http.get('/api/login/' + username + '&' + password);
	}
	getPrograms() {
		return http.get(`/api/programs/`);
	}
	getEnrollments(){
		return http.get('/api/enrollments/');
	}
}
export default new ProfileService();
