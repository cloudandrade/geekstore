import React, { useState, useEffect } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import history from 'browser-history';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Slide from '@material-ui/core/Slide';
import Routes from '../../routes';
import './styles.css';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		width: '280px',

		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},

	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

const SearchTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#f44336',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#f44336',
		},
	},
})(TextField);

export default function NavBar() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);
	const [isSearch, setIsSearch] = useState(false);
	const [activePage, setActivePage] = useState('');
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	useEffect(() => {
		switch (window.location.href) {
			case `http://localhost:3000/`:
				setActivePage('inicio');
				break;
			case `http://localhost:3000/camisas`:
				setActivePage('camisas');
				break;
			case `http://localhost:3000/camisas/:id`:
				setActivePage('camisas');
				break;
			case `http://localhost:3000/copos`:
				setActivePage('copos');
				break;
			case `http://localhost:3000/acessorios`:
				setActivePage('acessorios');
				break;

			default:
				break;
		}
	});

	const linkTo = (redirect) => {
		if (redirect === undefined) {
			setActivePage('inicio');
			history('/');
		} else {
			setActivePage(redirect);
			history(`/${redirect}`);
		}
	};

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	/* NavBar Desktops */
	return (
		<div className={classes.grow}>
			<AppBar
				position="sticky"
				color="inherit"
				style={{
					paddingTop: '10px',
					paddingBottom: '10px',
				}}
			>
				<Toolbar>
					<Typography className={classes.title} variant="h4" noWrap>
						GeekStore
					</Typography>
					<div className="Row">
						<div className="Column">
							<Typography className="textfields" variant="h6" noWrap>
								<Link
									href=""
									onClick={() => linkTo()}
									className={
										activePage.includes('inicio')
											? 'active-textfields'
											: 'textfields'
									}
								>
									Início
								</Link>
							</Typography>
						</div>
						<div className="Column">
							<Typography className="textfields" variant="h6" noWrap>
								<Link
									href=""
									onClick={() => linkTo('camisas')}
									className={
										activePage.includes('camisas')
											? 'active-textfields'
											: 'textfields'
									}
								>
									Camisas
								</Link>
							</Typography>
						</div>
						<div className="Column">
							<Typography className="textfields" variant="h6" noWrap>
								<Link
									href=""
									onClick={() => linkTo('copos')}
									className={
										activePage.includes('copos')
											? 'active-textfields'
											: 'textfields'
									}
								>
									Copos
								</Link>
							</Typography>
						</div>
						<div className="Column">
							<Typography className="textfields" variant="h6" noWrap>
								<Link
									href=""
									onClick={() => linkTo('acessorios')}
									className={
										activePage.includes('acessorios')
											? 'active-textfields'
											: 'textfields'
									}
								>
									Acessorios
								</Link>
							</Typography>
						</div>
					</div>
					<div className={classes.grow} />

					<div className={classes.sectionDesktop}>
						<Slide direction="left" in={isSearch} mountOnEnter unmountOnExit>
							<Collapse in={isSearch}>
								<SearchTextField
									label="Buscar"
									className="textfield-input"
									size="small"
								/>
							</Collapse>
						</Slide>
						<IconButton
							color="inherit"
							onClick={() => setIsSearch(!isSearch)}
						>
							<Badge color="secondary">
								<SearchIcon
									className={isSearch ? 'search-active' : null}
								/>
							</Badge>
						</IconButton>
						<IconButton
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<IconButton color="inherit">
							<Badge color="secondary">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMenu}
			<Routes />
		</div>
	);
}
