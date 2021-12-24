import api from '../services/api';
import { userState } from '../store/index';

export const postLogout = async () => {
	try {
		const result = await api.post('logout');

		if (result && result.data) {
			userState.set();
		}

		return result;
	} catch (error) {
		console.error(error);
	}
};
