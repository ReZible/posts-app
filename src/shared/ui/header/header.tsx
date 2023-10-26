import './header.sass';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header className='header'>
			<Link to='/'>Главная</Link>
		</header>
	);
}

export { Header };
