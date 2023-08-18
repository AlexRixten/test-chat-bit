import { AxiosPromise } from 'axios';
import axiosFetch from './axiosFetch';
import { ISendMessageReq } from '../interfaces/chat';

export default class ChatAPI {
	sendMessage(data: ISendMessageReq) {
		return axiosFetch({
			method: 'post',
			url: `${import.meta.env.VITE_APP_BIT_API}/chat/send-message`,
			responseType: 'stream',
			data,
		}) as AxiosPromise;
	}
}
