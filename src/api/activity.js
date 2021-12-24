import api from "../services/api";

export const getActivities = async () => {
	try {
		return await api.get("/activities");
	} catch (error) {
		console.error(error);
	}
};

export const postActivities = async payload => {
	try {
		return await api.post("/activities", { ...payload });
	} catch (error) {
		console.error(error);
	}
};
