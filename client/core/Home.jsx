import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ecommerce from './../assets/images/ecommerce.jpg';
   

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 1000,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 600,
  },
}));

export default function Home(){ 
const classes = useStyles()
return (
<Card className={classes.card}>
   
  <Typography variant="h6" className={classes.title}>Home Page</Typography>
<CardMedia className={classes.media}
image={ecommerce} title="Unicorn Bicycle"/>
<CardContent>
<Typography variant="body2" component="p"> 
Welcome to the MERN Skeleton home page. 
</Typography> 
</CardContent>
</Card> 

)
}


