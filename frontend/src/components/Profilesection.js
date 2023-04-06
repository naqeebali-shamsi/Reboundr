import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Profilesection(props) {
  const navigate = useNavigate();

  const profileClick = () => {
    navigate('/profilepage');
  }

  return (
    <Card  style={{marginTop: '10px'}}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJsI-A1jouXWhTiragizrRkXk7c9VdoFIaWHhngNjA&s"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.auth_user}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.user_info}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={profileClick} size="small">View Full profile</Button>
        <Button size="small">Activate Premium</Button>
      </CardActions>
    </Card>
  );
}

