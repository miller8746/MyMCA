import http from "../http-common";
class ProfileService {
	getCredentials(username, password) {
		return http.get('/api/login/' + username + '&' + password);
	}
	getPrograms(userId) {
		return http.get('/api/programs/' + userId);
	}
}
export default new ProfileService();