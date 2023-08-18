import { IChatState, TChatActions } from '../../interfaces/chat';
import { EChatActions } from '../../enums/actions.enum.ts';

const initState: IChatState = {
	messages: null,
};

const initialState = { ...initState };

// eslint-disable-next-line default-param-last
export const chatReducer = (state = initialState, action: TChatActions): IChatState => {
	switch (action.type) {
		case EChatActions.SetMessagesChat: {
			return {
				...state,
				messages: action.payload,
			};
		}
		default:
			return state;
	}
};
