import { IMessage, ISetChatMessagesAction } from '../../interfaces/chat';
import { EChatActions } from '../../enums/actions.enum.ts';

export const setChatMessagesAction = (payload: IMessage[] | null): ISetChatMessagesAction => ({
	type: EChatActions.SetMessagesChat,
	payload,
});
