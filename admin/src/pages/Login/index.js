import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SecurityIcon from '@material-ui/icons/Security';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { loginRequest } from '../../service/requests';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(12),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(4),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(2),
	},
	submit: {
		margin: theme.spacing(4, 0, 2),
	},
}));

export default function SignIn() {
	let history = useHistory();
	const [email, setEmail] = React.useState('');
	const [senha, setSenha] = React.useState('');

	const [userLogado, setUserLogado] = React.useState(null);
	const classes = useStyles();

	let submit = async () => {
		await loginRequest(email, senha).then((res) => {
			if (res.data.auth === true) {
				var value = res.data.accessToken;
				console.log(value);
				setUserLogado(res.data.payload.id);
				localStorage.setItem('token', value);
				localStorage.setItem('usuariologado', userLogado);
				console.log('inside go');
				console.log(localStorage.getItem('token'));
				history.push('/home');
			} else {
				console.log('erro na autenticacao');
			}
		});
		//window.location.reload();
	};

	const inicio = () => {
		history.push('/');
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<SecurityIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					GeekStore
				</Typography>
				<div className={classes.form}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
						id="password"
						onChange={(event) => {
							setSenha(event.target.value);
						}}
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Lembrar-me"
					/>
					<Button
						type="submit"
						onSubmit={submit}
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={submit}
					>
						Entrar
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Esqueceu sua senha?
							</Link>
						</Grid>
						<Grid item xs>
							<Link href="" variant="body2" onClick={inicio}>
								Problemas com Login?
							</Link>
						</Grid>
					</Grid>
				</div>
			</div>
		</Container>
	);
}
