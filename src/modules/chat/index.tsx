import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks.ts';
import { setChatMessagesAction } from '../../store/actions/chat.ts';
import Messages from './messages';
import { InputMessage } from './InputMessage';
import { EMessageAuthor } from '../../enums/messages.enum.ts';
import { IMessage } from '../../interfaces/chat';
import './ChatModule.scss';

interface IProps {
	messages: IMessage[] | null;
}

export const ChatModule = ({ messages }: IProps) => {
	const dispatch = useAppDispatch();
	const [chunks, setChunks] = useState<string>('');

	useEffect(() => {
		switch (true) {
			case chunks.length === 1:
				// eslint-disable-next-line no-case-declarations
				const newMessageBot = {
					id: Date.now(),
					author: EMessageAuthor.Bot,
					message: chunks,
					avatar: '',
				} as IMessage;
				dispatch(setChatMessagesAction(messages ? [...messages, newMessageBot] : [newMessageBot]));
				return;
			case chunks.length > 1:
				// eslint-disable-next-line no-case-declarations
				const messagesWithoutLastMessageBot = messages?.slice(0, -1);
				// eslint-disable-next-line no-case-declarations
				const lastMessageBot = messages?.filter((mes) => mes.author === EMessageAuthor.Bot).slice(-1)[0];
				lastMessageBot!.message = chunks;

				dispatch(
					setChatMessagesAction(
						messagesWithoutLastMessageBot
							? [...messagesWithoutLastMessageBot, lastMessageBot!]
							: [lastMessageBot!],
					),
				);
				return;
			default:
				return;
		}
	}, [chunks]);

	return (
		<div className="chat-module">
			<Messages messages={messages} />
			<InputMessage setChunks={setChunks} />
		</div>
	);
};
