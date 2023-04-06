// Author: Alis Mangukiya B00930134
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import config from "../../config";

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

const Profile = (props) => {

    const { state } = useLocation();
    const [userDetails, setUserDetails] = useState(null);
    const id = state.id;
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleConnectClick = () => {
        setIsButtonDisabled(prevState => !prevState); //checking the state of the connection
        if (isButtonDisabled) {
            notifyf("Connection request cancelled");
        } else {
            notifys("Connection sent");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${config.baseUrl}/userdetails/${id}`); // Fetching data by email id
            const data = await response.json();
            setUserDetails(data);
        };
        fetchData();
    }, [id]);

    return (
        <>
            <div>
                {userDetails ? (
                    // mapping users data
                    <Container maxWidth="md" sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={userDetails.image}
                                            alt="profile image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {userDetails.firstName + " " + userDetails.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.designation}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.location}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.connectionCount} connections
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <a onClick={handleConnectClick} style={{ 'text-decoration': "none" }}>
                                            <Button size="small" color="primary" variant="contained" disabled={isButtonDisabled} style={{ marginLeft: '8px' }}>
                                                {isButtonDisabled ? 'Requested' : 'Connect'}
                                            </Button>
                                        </a>
                                    </CardActions>
                                    <ToastContainer />
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={8}>
                                <Card style={{ marginBottom: '10px' }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: 35 }}>
                                                Experiences
                                            </Typography>
                                            <hr />
                                            <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: 20 }}>
                                                {userDetails.experience.role}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.experience.company}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.experience.years} years
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.experience.location}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: 35 }}>
                                                Education
                                            </Typography>
                                            <hr />
                                            <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold', fontSize: 25 }}>
                                                {userDetails.education.university}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.education.major}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.education.year}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userDetails.education.location}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                ) : (
                    // loading animation
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <SyncLoader color="#36D7B7" loading={true} size={15} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile;