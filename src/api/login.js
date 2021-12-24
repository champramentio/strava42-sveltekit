import api from "../services/api";
import { userState } from "../store/index";

export const postLogin = async code => {
	try {
		const result = await api.post("/auth", {
			code: code
		});

		if (result && result.data) {
			userState.set({ ...result.data });
		}

		return result;
	} catch (error) {
		console.error(error);
	}
};
