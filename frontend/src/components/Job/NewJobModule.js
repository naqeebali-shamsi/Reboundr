import React, { useContext, useState } from "react";
import { Box, Button, Select, IconButton, MenuItem, Grid, Typography, Dialog, DialogActions, DialogTitle, DialogContent, FilledInput } from "@mui/material";
import theme from "../../theme/theme";
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import dummySkills from "../../dummySkill"
import axios from "axios";
import config from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: "whitesmoke",
        }
    },
    included : {
        backgroundColor: theme.palette.secondary.main,
        color: "whitesmoke",
    }
})

const initState = {
    title: "",
    type: "Full time",
    companyName: "",
    companyUrl: "",
    location: "In-Office",
    link: "",
    description: "",
    skills: []
};

function PostJob(props) {
    const {token, setToken} = useContext(AuthContext);
    const closeModule = () => {
        setJobDetails(initState);
        props.closeJobModule();
    }

    const [jobDetails, setJobDetails] = useState(initState);

    const handleSkillSubmit = (j) => {
        // Check to see if skills are max six 
        if(dummySkills.length > 5) {
            notifyf("Cannot have more than 6 skills");
        }
        else {
            props.openNewSkillModule();
        }
    }

    const handleSubmit = async (j) =>  {
        let request_config = {
            maxBodyLength: Infinity,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          };
        for (const field in jobDetails) {
            if(typeof jobDetails[field] === 'string' && !jobDetails[field]) return notifyf('Please fill all the details');
        }
        if(!jobDetails.skills.length) return notifyf('Please select atleast one skill!');
        console.log("token =", token)
        try {
            await axios.post(`${config.baseUrl}/jobs`, { 
                title: jobDetails.title,
                type: jobDetails.type, 
                location: jobDetails.location,
                companyName: jobDetails.companyName,
                companyUrl: jobDetails.companyUrl,
                skills: jobDetails.skills, 
                link: jobDetails.link,
                description: jobDetails.description
            }, {
                headers: request_config.headers
              })
        } catch (err) {
            console.log(err)
        }
        closeModule();
    }

    const handleChange = (e) => {
        setJobDetails(oldState => ({...oldState, [e.target.name]: e.target.value}))
    }
    
    const addRemoveSkills = (skill) => {
        jobDetails.skills.includes(skill)
        ? setJobDetails(oldState => ({
            ...oldState, 
            skills: oldState.skills.filter(s => s !== skill),
        }))
        : setJobDetails(oldState => ({...oldState, skills: oldState.skills.concat(skill),
        }))
    }
    const classes = useStyles();
    return(
        <>
        <Dialog open={props.openJobModule} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post Job
                    <IconButton onClick={closeModule}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="title" value={jobDetails.title} placeholder="Job Title *" fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="type" value={jobDetails.type} fullWidth> 
                            <MenuItem value="Full time">Full time</MenuItem>
                            <MenuItem value="Part time">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyName" value={jobDetails.companyName} placeholder="Company Name *" fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyUrl" value={jobDetails.companyUrl} placeholder="Company URL *" fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} name="location" value={jobDetails.location} fullWidth> 
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="In-Office">In-Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="link" value={jobDetails.link} placeholder="Job link *" fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" value={jobDetails.description} placeholder="Job Description *" fullWidth multiline rows={3}></FilledInput>
                    </Grid>
                </Grid>
                <Box mt={2} color="red">
                    <Typography>Skills*</Typography>
                    <Typography variant="caption">Upto 6 skills only</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        {dummySkills.map((skill) => (
                            <Box onClick={() => addRemoveSkills(skill)} 
                            className={`${classes.skillStyle} 
                            ${jobDetails.skills.includes(skill) && classes.included}`} key={skill}>{skill}</Box>
                        ))}
                        <Button onClick={j => handleSkillSubmit(j)} variant="outlined" color="primary" 
                            disableElevation>
                            Add Skill
                        </Button>
                    </Box>
                </Box>
                <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">* Required Fields</Typography>
                    <Button onClick={j => handleSubmit(j)} variant="contained" color="primary" 
                    disableElevation>
                    Post Job
                    </Button>
                </Box>
            </DialogActions>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default PostJob;