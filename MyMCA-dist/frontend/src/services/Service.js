import http from "../http-common";
class ProfileService {
	getCredentials(username, password) {
		return http.get('/api/login/' + username + '&' + password);
	}
	getPrograms(userId) {
		return http.get(`/api/users/${userId}/programs`);
	}
}
export default new ProfileService();