import { Navigate, Route, Routes } from 'react-router-dom';
import { ERoutes } from '../../enums/routes.enum.ts';
import ChatPage from '../../pages/chat';

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path={ERoutes.Main} element={<Navigate to={ERoutes.Chat} />} />
			<Route path={ERoutes.Chat} element={<ChatPage />} />
		</Routes>
	);
};
