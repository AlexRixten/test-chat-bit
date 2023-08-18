import { createSelector } from 'reselect';
import { RootState } from '../rootReducer';

const state = ({ chat }: RootState) => chat;

export const messagesSelector = createSelector(state, ({ messages }) => messages);
