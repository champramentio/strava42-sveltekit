import axios from "axios";
import { variables } from "./variables";
import { get as getting } from "svelte/store";
import { userState } from "../store/index";

const timeout = 15000;

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
	baseURL: variables.basePath,
	timeout
});

axiosAPI.interceptors.request.use(
	async config => {
		const state = getting(userState);

		const expires = state && state.expires_at;
		let accessToken = state && state.access_token;
		const refreshToken = state && state.refresh_token;

		if (accessToken) {
			//check expired token
			if (expires - Date.now() / 1000 < 60) {
				try {
					const result = await axios({
						url: `${variables.basePath}/refresh_token`,
						method: "POST",
						data: {
							refresh_token: refreshToken
						}
					})
						.then(res => {
							return Promise.resolve(res.data);
						})
						.catch(err => {
							return Promise.reject(err);
						});

					if (result.data.error) window.location("/login");

					//set new data to the store
					userState.set({ ...result.data, athelete: state.athlete });

					//overwrite new access token
					accessToken = result.data.access_token;
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}

		//return config;
		config.headers["authorization"] = `Bearer ${accessToken}`;

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// implement a method to execute all the request from here.
const apiRequest = (method, url, request) => {
	const headers = {
		authorization: ""
	};
	//using the axios instance to perform the request that received from each http method
	return axiosAPI({
		method,
		url,
		data: request,
		headers
	})
		.then(res => {
			return Promise.resolve(res.data);
		})
		.catch(err => {
			return Promise.reject(err);
		});
};

// function to execute the http get request
const get = (url, request) => apiRequest("get", url, request);

// function to execute the http delete request
const deleteRequest = (url, request) => apiRequest("delete", url, request);

// function to execute the http post request
const post = (url, request) => apiRequest("post", url, request);

// function to execute the http put request
const put = (url, request) => apiRequest("put", url, request);

// function to execute the http path request
const patch = (url, request) => apiRequest("patch", url, request);

// expose your method to other services or actions
const api = {
	get,
	delete: deleteRequest,
	post,
	put,
	patch
};
export default api;
