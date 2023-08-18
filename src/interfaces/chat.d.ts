import { EChatActions } from '../enums/actions.enum.ts';
import { EMessageAuthor } from '../enums/messages.enum.ts';

export interface IChatState {
	messages: IMessage[] | null;
}

export interface IMessage {
	id: number;
	author: EMessageAuthor;
	avatar: string;
	message: string;
}

export interface ISetChatMessagesAction {
	type: EChatActions.SetMessagesChat;
	payload: IMessage[] | null;
}

export type TChatActions = ISetChatMessagesAction;
