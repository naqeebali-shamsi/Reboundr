//Author: Riya Intwala
import { Button, CardActions, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { AuthContext } from '../context/AuthContext';

import config from "../config";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
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
}

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
}

export default function Profilepage() {
    //Variable Declaration
    let _id = '';
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();
    const [result, setresult] = useState([]);
    const { user } = React.useContext(AuthContext);

    //File uploadting event
    const fileSelected = (event) => {
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const fetchData = async () => {
        var url = `${config.baseUrl}/getUserProfileDetails/` + _id
        console.log(url)
        axios.get(url)
            .then(json => setresult(json.data))
    };

    // Trigger the fetchData after the initial render by using the useEffect hook
    useEffect(() => {
        _id = localStorage.getItem('user')
        if (!_id) {
            navigate('/login', { replace: true })
        }
        fetchData();
    }, []);

    const addDetails = () => {
        navigate('/updateprofiledata', { replace: true })
    }
    //"Add CV" button functionality
    const addCVbutton = () => {
        const MIN_SIZE = 256 // 0.25MB
        const MAX_SIZE = 5120 // 5MB

        if (!selectedFile) {
            notifyf("Please choose a file...!!")
            return
        }

        const fileSizeKiloBytes = selectedFile.size / 1024

        if (fileSizeKiloBytes < MIN_SIZE) {
            notifyf("File size is less than maximum limit...!!")
            return
        }

        else if (fileSizeKiloBytes > MAX_SIZE) {
            notifyf("File size is greater than maximum limit...!!")
            return
        }

        else {
            if (selectedFile.type.split('/')[1].includes('pdf')) {
                const newText = {
                    "cv": selectedFile.name
                }
                var url = `${config.baseUrl}/addCV/` + _id
                fetch(url, {
                    method: "PUT",
                    headers: { "Content-Type": "application/JSON" },
                    body: JSON.stringify(newText)
                })
                notifys("File Uploaded Successfully...!!")
            }

            else {
                notifyf("File type no valid...!!")
            }
        }
    }
    return (
        result.map(user => {
            return (
                <Grid>
                    <Card sx={{ maxWidth: "100%", textAlign: "center", display: 'flex', backgroundColor: "#2A9D8F"}}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={user.image}
                            alt="user image"
                            sx={{borderRadius: "16px", minWidth: "20%", marginTop: "0.8%", marginLeft: "0.8%"}}
                        />
                        <CardContent sx={{ minWidth: "80%"}}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                {user.firstName} {user.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {user.bio}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography gutterBottom variant="h7" component="div">
                                Contact Detail: {user.email}
                                </Typography>
                                <CardActions sx={{ float: 'right', marginRight: "2%"}}>
                                    <Button sx={{backgroundColor: "#264653", color: "white"}} variant="outlined" component="span" onClick={addDetails}>Add Details</Button>
                                </CardActions>
                            </CardContent>
                        </CardContent>
                    </Card>
                
                    <Card sx={{color: "#264653"}}>
                       <CardContent>
                            <Typography variant="h5" component="div">Employment Details</Typography>
                            <hr />
                        </CardContent>
                        {user.employment.map(emp => {
                            return (
                                <CardContent>
                                    <Typography sx={{ fontSize: '18px' }}>{emp.companyName}</Typography>
                                    <Typography sx={{ fontSize: '12px' }}>{emp.start_date} - {emp.end_date}</Typography>
                                    <Typography sx={{ fontSize: '14px' }}>{emp.description}</Typography>
                                </CardContent>
                            )
                        })}
                        
                        <CardContent>
                        <Typography variant="h5" component="div">Project Details</Typography>
                        <hr />
                        </CardContent>
                        {user.project.map(pro => {
                            return (
                                <CardContent>
                                    <Typography sx={{ fontSize: '18px' }}>{pro.companyName}</Typography>
                                    <Typography sx={{ fontSize: '12px' }}>{pro.start_date} - {pro.end_date}</Typography>
                                    <Typography sx={{ fontSize: '14px' }}>{pro.description}</Typography>
                                </CardContent>
                            )
                        })}
                    </Card>
                    <Card sx={{width: '100%', height: '5%', display: "flex", justifyContent: "flex-end", float:'right'}}>
                        <CardContent>
                            <input type="file" onChange={fileSelected}/>
                            <Button variant="outlined"component="span" sx={{backgroundColor: "#264653", color: "white"}} onClick={addCVbutton}>Add CV</Button>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
    );
}