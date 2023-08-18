import React, { useState } from 'react';
import { processNextChunk } from '../../../utils/processNextChunk.ts';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setChatMessagesAction } from '../../../store/actions/chat.ts';
import { IMessage } from '../../../interfaces/chat';
import { EMessageAuthor } from '../../../enums/messages.enum.ts';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../../store/selectors/chatSelectors.ts';
import './InputMessage.scss';
import { Preloader } from '../../../components/preloader';

interface IProps {
	setChunks: (srt: (prevChunks: string) => string) => void;
}

export const InputMessage = ({ setChunks }: IProps) => {
	const dispatch = useAppDispatch();

	const messages = useSelector(messagesSelector);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');

	const onSubmitHandler = async () => {
		if (!value || isLoading) return;
		setIsLoading(true);
		createMeMessage();
		try {
			const response = await fetch(`${import.meta.env.VITE_APP_BIT_API}/chat/send-message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Transfer-Encoding': 'chunked',
				},
				body: JSON.stringify({ message: value }),
			});

			/*
			TODO: chunks прилетают слышком быстро, и очень большим скопом, и прервать запрос через new AbortController()
			 тоже не получалось, ибо чанки приходили уже после успешного ответа, поэтому и была написана рекурсивная
			  функция для обхода ответа и вывода по буквам, но в таком случае прервать запрос не получается
			 PS. Буду очень признателен, если внесете небольшие правки или просто отпишитесь с объяснением, что я не так делал)
			const reader = response.body!.pipeThrough(new TextDecoderStream('utf-8')).getReader();
			const { done, value: valueChunk } = await reader.read();
			while (true) {
				if (done) {
					console.log('end');
					return;
				}
				await new Promise((resolve) => setTimeout(resolve, 1500));

				const arrayChunks = valueChunk.match(/\{.*?\}/g);
				const chunkStr = arrayChunks?.map((chunk) => JSON.parse(chunk).value).join('');
				console.log('chunkStr', chunkStr);
			}

			*/

			const reader = response.body!.getReader();
			const accumulatedData = '';
			await processNextChunk({ reader, accumulatedData, setChunks });
		} catch (error) {
			console.error('Ошибка запроса:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const createMeMessage = () => {
		const newMessage = {
			id: Date.now(),
			author: EMessageAuthor.Me,
			message: value,
			avatar: 'https://avatars.githubusercontent.com/u/91592026?s=400&u=8586bfe497d919a03ea1f31293874e2018c9c050&v=4',
		} as IMessage;
		dispatch(setChatMessagesAction(messages ? [...messages, newMessage] : [newMessage]));

		setValue('');
	};

	const changeValueHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
	};

	const onEnterPress = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		switch (true) {
			case event.keyCode === 13 && event.shiftKey:
				break;
			case event.keyCode === 13:
				event.preventDefault();
				await onSubmitHandler();
				break;
			default:
				return;
		}
	};

	return (
		<div className="create-message">
			<textarea
				className="message_input"
				name="message"
				placeholder="Start typing here..."
				onChange={changeValueHandler}
				value={value}
				rows={1}
				onKeyDown={onEnterPress}
			/>

			<div className="message_btns">
				{(() => {
					switch (!isLoading) {
						case true:
							return (
								<button className="message_btn _send" disabled={isLoading} onClick={onSubmitHandler}>
									<svg
										width="21"
										height="21"
										viewBox="0 0 21 21"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M19.875 9.59168L1.54169 0.425015C1.398 0.353154 1.2366 0.324361 1.07692 0.342103C0.917248 0.359845 0.766105 0.423365 0.641692 0.525015C0.522879 0.624593 0.434198 0.755338 0.385617 0.902552C0.337036 1.04977 0.330482 1.20761 0.366692 1.35835L2.57503 9.50002H12V11.1667H2.57503L0.333359 19.2833C0.299381 19.4092 0.295415 19.5413 0.321779 19.669C0.348144 19.7967 0.404103 19.9164 0.485158 20.0186C0.566213 20.1207 0.670102 20.2024 0.78847 20.257C0.906839 20.3117 1.03639 20.3379 1.16669 20.3333C1.29714 20.3326 1.42559 20.3012 1.54169 20.2417L19.875 11.075C20.0115 11.0051 20.1261 10.8988 20.2061 10.768C20.2861 10.6371 20.3284 10.4867 20.3284 10.3333C20.3284 10.18 20.2861 10.0296 20.2061 9.89872C20.1261 9.76786 20.0115 9.66161 19.875 9.59168Z"
											fill="white"
										/>
									</svg>
								</button>
							);
						default:
							return (
								<button className="message_btn _loading">
									<Preloader />
								</button>
							);
					}
				})()}
			</div>
		</div>
	);
};
