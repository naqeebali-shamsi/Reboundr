// Author: Alis Mangukiya B00930134
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifys = (msg) => {
    toast.success(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
} // Success notification

const notifyf = (msg) => {
    toast.error(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
} // Failure notification

const ProfilesCards = (props) => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const handleConnectClick = () => {
        setIsButtonDisabled(prevState => !prevState); //checking the state of the connection
        if (isButtonDisabled) {
            notifyf("Connection request cancelled");
        } else {
            notifys("Connection sent");
        }
    }

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.src}
                            alt="profile image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {props.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {props.desc}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <a href="#" onClick={handleConnectClick} style={{ 'text-decoration': "none" }}>
                            <Button size="small" color="primary" variant="contained" disabled={isButtonDisabled}>
                                {isButtonDisabled ? 'Requested' : 'Connect'}
                            </Button>
                        </a>
                        <NavLink to="/profile" state={{ id: props.email, isButtonDisabled:isButtonDisabled }} className="btn btn-light" style={{ margin: 9, 'text-decoration': "none" }} >
                            <Button size="small" color="primary" variant="outlined" >
                                View Profile
                            </Button>
                        </NavLink>
                    </CardActions>
                    <ToastContainer />
                </Card>
            </Grid>
        </>
    )
}
export default ProfilesCards;
