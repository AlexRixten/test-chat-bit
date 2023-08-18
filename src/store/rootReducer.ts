import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from './reducers/chat.ts';

const rootReducer = combineReducers({
	chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
