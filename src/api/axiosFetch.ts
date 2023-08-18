import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface IConfigFetch extends AxiosRequestConfig {
	errorCallback?: (error: AxiosError) => void;
	isAuthorization?: boolean;
	Accept?: string;
}

export default async function axiosFetch(config: IConfigFetch) {
	const newConfig = { ...config };

	return axios({
		...newConfig,
		headers: {
			...newConfig.headers,
		},
	}).catch((error: AxiosError) => {
		if (config.errorCallback) {
			config?.errorCallback?.(error);
		}

		throw error;
	});
}
