import React from 'react';
import { Box, IconButton, Grid, Typography, Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";
import theme from "../../theme/theme";
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useEffect } from 'react';
import EmployerDetails from '../EmployerDetails';

const useStyles = makeStyles({
    skillStyle: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        cursor: "pointer",
    }
});

function ViewJob(props) {

    const [userType, setUserType] = useState("")
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType")
        setUserType(storedUserType)
    })

    const date = new Date(props.job.postedOn);

    const classes = useStyles();

    return (
        <>
            <Dialog open={!!Object.keys(props.job).length} fullWidth>
                {!showDetails ?
                    <>
                        <DialogTitle>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                {props.job.title} @ {props.job.companyName}
                                <IconButton onClick={props.closeModal}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Box className={classes.info} display="flex">
                                <Typography variant='caption'>Posted on:</Typography>
                                <Typography ml={4} variant='body2'>
                                    {date.getDate() + " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getFullYear()}
                                </Typography>
                            </Box>
                            <Box className={classes.info} display="flex">
                                <Typography variant='caption'>Job Type:</Typography>
                                <Typography ml={4} variant='body2'>{props.job.type}</Typography>
                            </Box>
                            <Box className={classes.info} display="flex">
                                <Typography variant='caption'>Job Location:</Typography>
                                <Typography ml={4} variant='body2'>{props.job.location}</Typography>
                            </Box>
                            <Box className={classes.info} display="flex">
                                <Typography variant='caption'>Job Description:</Typography>
                                <Typography ml={4} variant='body2'>{props.job.description}</Typography>
                            </Box>
                            <Box className={classes.info} display="flex">
                                <Typography variant='caption'>Company Name:</Typography>
                                <Typography ml={4} variant='body2'>{props.job.companyName}</Typography>
                            </Box>
                            <Box className={classes.info} display="flex">
                                <Typography variant='caption'>Company Website:</Typography>
                                <Typography ml={4} variant='body2'>{props.job.companyUrl}</Typography>
                            </Box>
                            <Box>
                                <Typography variant='caption'>Skills</Typography>
                                <Grid container alignItems="center">
                                    <Typography component={'span'} variant='body2'>{props.job.skills &&
                                        props.job.skills.map((skill) => (
                                            <Grid item key={skill} className={classes.skillStyle}>{skill}</Grid>
                                        ))}</Typography>
                                </Grid>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            {
                                userType === "jobseeker" ?
                                    <Box flexGrow={1} display="flex" justifyContent="space-between">
                                    <Button variant='filled' component='c' onClick={() => setShowDetails(true)}>View Employer Details</Button>
                                    <Button color="success" variant='outlined' component="a" href={props.job.link} target="_blank">Apply</Button>
                                    </Box>
                                    :
                                    console.log("Employer this person")
                            }
                        </DialogActions>
                    </>
                    :
                    <EmployerDetails employer={props.job.companyName} closeModal={() => setShowDetails(false)} />
                }
            </Dialog>
        </>

    )
}

export default ViewJob;