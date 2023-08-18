import { useSelector } from 'react-redux';
import { messagesSelector } from '../../store/selectors/chatSelectors.ts';
import { ChatModule } from '../../modules/chat';
import { MainLayout } from '../../layout/Main';
import './ChatPage.scss';

function ChatPage() {
	const messages = useSelector(messagesSelector);

	return (
		<MainLayout>
			<div className="chat-page">
				<h1 className="chat-page_title">Bot Chat</h1>
				<h2 className="chat-page_description">AI-based service</h2>
				<ChatModule messages={messages} />
			</div>
		</MainLayout>
	);
}

export default ChatPage;
