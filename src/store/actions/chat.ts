import { IMessage, ISendMessageThunkParams, ISetChatMessagesAction } from '../../interfaces/chat';
import { EChatActions } from '../../enums/actions.enum.ts';

export const setChatMessagesAction = (payload: IMessage[] | null): ISetChatMessagesAction => ({
	type: EChatActions.SetMessagesChat,
	payload,
});

export const sendMessageThunk =
	({ requestData }: ISendMessageThunkParams) =>
	async () => {
		const response = await fetch(`${import.meta.env.VITE_APP_BIT_API}/chat/send-message`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Transfer-Encoding': 'chunked',
			},
			body: JSON.stringify(requestData),
		});

		const reader = response.body!.getReader();
		console.log('reader', reader);
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				console.log('Запрос завершен');
				break;
			}
			const chunkData = new TextDecoder().decode(value);
			console.log('Получен чанк данных:', chunkData);
		}
	};
