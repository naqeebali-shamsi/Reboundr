import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton, Grid, Typography, Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function EmployerDetails(props) {
    const [details, setDetails] = useState('');
    useEffect(() => {
        axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${props.employer}`)
            .then(res => {
                console.log(res);
                setDetails(res.data.extract);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Employer Details
                    <IconButton onClick={props.closeModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box display="flex">
                    <Typography ml={4} variant='body2'>{details}</Typography>
                </Box>
            </DialogContent>
        </>
    )
}
