import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header, Footer } from '@/shared/ui';
import './main-layut.sass';

function MainLayout() {
	return (
		<>
			<Header />
			<main className='main'>
				<Container sx={{ p: '20px' }} maxWidth='lg'>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</>
	);
}

export { MainLayout };
