import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import InfoCard from '../../components/InfoCard/index';

// import { Container } from './styles';
const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

function Home() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	let history = useHistory();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			history.push('/login');
		}
	}, []);

	return (
		<>
			<div>
				<Grid container className={classes.root} spacing={2}>
					<Grid item xs={12}>
						<Grid container justify="center" spacing={1}>
							<Grid item>
								<InfoCard
									color="red"
									title="usuarios cadastrados"
									number={1}
								/>
							</Grid>
							<Grid item>
								<InfoCard color="blue" title="produtos" number={30} />
							</Grid>
							<Grid item>
								<InfoCard
									color="green"
									title="usuarios online"
									number={48}
								/>
							</Grid>
							<Grid item>
								<InfoCard color="yellow" title="pedidos" number={11} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default Home;
