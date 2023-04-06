//Author: Dishank Jitendra Jani (B00917756)
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import config from "../../config";
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import CreatePost from './CreatePost';
import { Box, Modal } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
};

export default function Profilesection(props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const [result, setresult] = useState([]);
  let _id = '';

  //getting authenticated user's information
  useEffect(() => {
    _id = localStorage.getItem('user')
    console.log(_id);

    fetchData();

  }, []);
//fetching data of user using Id
  const fetchData = async () => {
    var url = `${config.baseUrl}/getUserProfileDetails/` + _id
    console.log(url)
    axios.get(url)
      .then(json => setresult(json.data))
  };

  const profileClick = () => {
    navigate('/profilepage');
  }

  return (
    result.map(user => {
      return (
        <Card style={{ marginTop: '10px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={user.image}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.user_info}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={profileClick} size="small">View Full profile</Button>
            <Button size="small">Activate Premium</Button>
          </CardActions>
          <Button variant="contained" style={{ marginTop: '10px' }} onClick={handleOpen}>create a post</Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CreatePost firstname={user.firstName} />
            </Box>
          </Modal>
        </Card>

      )

    })
  );
}

