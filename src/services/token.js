// import SecureLS from "secure-ls";
// const ls = new SecureLS();

class TokenService {
	getAccessToken() {
		return localStorage.getItem("token") || null;
	}

	setAccessToken(token) {
		localStorage.setItem("token", token);
	}

	getRefreshToken() {
		return localStorage.getItem("refreshToken") || null;
	}

	setRefreshToken(refreshToken) {
		localStorage.setItem("refreshToken", refreshToken);
	}

	getUser() {
		return JSON.parse(localStorage.getItem("user")) || null;
	}

	getName() {
		const user = this.getUser();
		return user.firstname + " " + user.lastname || null;
	}

	setUser(data) {
		localStorage.setItem("user", JSON.stringify(data));
	}

	removeAll() {
		// ls.clear();
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
	}
}

export default new TokenService();
