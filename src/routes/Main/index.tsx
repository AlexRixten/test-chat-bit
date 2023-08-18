import { Route, Routes } from 'react-router-dom';
import ChatPage from '../../pages/chat';
import { ERoutes } from '../../enums/routes.enum.ts';

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path={ERoutes.Chat} element={<ChatPage />} />
		</Routes>
	);
};
