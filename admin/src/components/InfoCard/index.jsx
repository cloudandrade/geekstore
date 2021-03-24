import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css';

// import { Container } from './styles';
const useStyles = makeStyles({
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function Home({ color, title, number }) {
	const classes = useStyles();
	var cardColor = 'card-body-default';
	if (color === 'yellow') {
		cardColor = 'card-body-yellow';
	} else if (color === 'blue') {
		cardColor = 'card-body-blue';
	} else if (color === 'red') {
		cardColor = 'card-body-red';
	} else if (color === 'green') {
		cardColor = 'card-body-green';
	}

	return (
		<>
			<Card className={cardColor}>
				<CardContent>
					<Typography gutterBottom>{title ? title : 'Registros'}</Typography>
					<Typography variant="h5" component="h2">
						{number ? number : 0}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}

export default Home;
