import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// import { Container } from './styles';

function Home() {
	let history = useHistory();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			history.push('/login');
		}
	}, []);

	return (
		<>
			<div>
				<h1>Home</h1>
			</div>
		</>
	);
}

export default Home;
