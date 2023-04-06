//Author: Dishank Jitendra Jani (B00917756)
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';


export default function Postsection(props) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <Card style={{ marginTop: '10px', width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }

        title={props.author}
        subheader={props.postedOn}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://i.imgur.com/Q9G9FZj.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleClick} style={{ color: isClicked ? 'red' : 'inherit' }}>
          <FavoriteIcon />
        </IconButton>

      </CardActions>

    </Card>
  );
}