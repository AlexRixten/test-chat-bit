import { PropsWithChildren } from 'react';
import './MainLayout.scss';

export const MainLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="main-layout">
			<div className="container">{children}</div>
		</div>
	);
};
