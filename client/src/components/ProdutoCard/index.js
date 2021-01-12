import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import "./styles.css"

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 250,
	},
	media: {
		height: 0,
		marginRight: '2%',
		marginLeft: '2%',
		paddingTop: '75%',
		// 16:9
		cursor: 'pointer',
	},
}));

export default function ProdutoCard({price, title, image, isSale, oldPrice, onClick, addToCart}) {
	const classes = useStyles();



	return (
		<Card className={classes.root}>
			<CardHeader
				onClick={onClick}
				className="title"
				title={title}
			/>
			<CardMedia
				className={classes.media}
				image={image}
				
				onClick={onClick}
			/* 	onMouseEnter={() => {
					console.log('hover the card');
				}}
				onMouseLeave={() => console.log('leaved the card')} */
			/>
			<CardContent className="price" >
				<Typography
					variant="subtitle2"
					color="inherit"
					component="h3"
				>
					Preço: R$ {price}
				</Typography>
			</CardContent>
		</Card>
	);
}
