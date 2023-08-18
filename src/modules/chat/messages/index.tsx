import { IMessage } from '../../../interfaces/chat';
import { EMessageAuthor } from '../../../enums/messages.enum.ts';
import avatarBot from '../../../assets/bot.svg';
import './Messages.scss';

interface IProps {
	messages: IMessage[] | null;
}

const Messages = ({ messages }: IProps) => {
	return (
		<>
			<div className="messages">
				{messages ? (
					messages.map(({ id, author, message, avatar }) => {
						if (author === EMessageAuthor.Me) {
							return (
								<div className="message _me" key={id}>
									<pre className="message_text _me">{message}</pre>
									<div className="message_avatar">
										<img src={avatar} alt="" />
									</div>
								</div>
							);
						} else {
							return (
								<div className="message _bot" key={id}>
									<div className="message_avatar">
										<img src={avatarBot} alt="" />
									</div>
									<div className="message_text _bot">{message}</div>
								</div>
							);
						}
					})
				) : (
					<div className="messages-plug">Напишите любой вопрос и наш бот вам ответит</div>
				)}
			</div>
		</>
	);
};

export default Messages;
