//Author: Riya Intwala
import { Button , Grid, TextField, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";
import React, { useState, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
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

export default function UpdateProfileData(){
    const [bio, setbio] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [taskText, settastText] = useState('');
    const [projectCompany, setprojectCompany] = useState('');
    const [projectStart, setprojectStart] = useState('');
    const [projectEnd, setprojectEnd] = useState('');
    const [projectTask, setprojectTask] = useState('');
    const { user } = React.useContext(AuthContext);
    const [_id, setid] = useState('');

    useEffect(() => {
        setid(localStorage.getItem('user'))
        console.log("id: " + _id)
      }, [user]);

    const navigate = useNavigate();

    const getBio = event =>{
        setbio(event.target.value);
    };

    const getCompanyName = event =>{
        setcompanyName(event.target.value);
    };

    const getStartDate = event =>{
        setstartDate(event.target.value);
    };

    const getEndDate = event =>{
        setendDate(event.target.value);
    };

    const getTastText = event =>{
        settastText(event.target.value);
    };

    const getProjectName = event =>{
        setprojectCompany(event.target.value);
    };

    const getProjectStartDate = event =>{
        setprojectStart(event.target.value);
    };

    const getProjectEndDate = event =>{
        setprojectEnd(event.target.value);
    };

    const getProjectTask = event =>{
        setprojectTask(event.target.value);
    };

    const addBioDetails = () => {
        const newText = {
            "bio" : bio
        }
        var url = `${config.baseUrl}/addBio/` + _id
        fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/JSON"},
            body: JSON.stringify(newText) 
        })
        notifys("Bio added Successfully...!!")
    }

    const companyDetails = () => {
        if(companyName.length!==0){
            if(startDate.length!==0 && endDate.length!==0){
                if(taskText.length!==0){
                    const newText = {
                        "companyName" : companyName,
                        "start_date" : startDate,
                        "end_date" : endDate,
                        "description" : taskText,
                    }
                    var url = `${config.baseUrl}/addEmployeeDetails/` + _id
                    fetch(url, {
                        method: "PUT",
                        headers: {"Content-Type": "application/JSON"},
                        body: JSON.stringify(newText) 
                    })
                    notifys("Employment Details added Successfully...!!")
                }
                else{ notifyf('Task details is absent...!!') }
            }
            else{ notifyf('Joining and Ending details is absent...!!') }
        }
        else{ notifyf('Company name is absent...!!') }
    }

    const projectDetails = () => {
        if(projectCompany.length!==0){
            if(projectStart.length!==0 && projectEnd.length!==0){
                if(projectTask.length!==0){
                    const newText = {
                        "companyName" : projectCompany,
                        "start_date" : projectStart,
                        "end_date" : projectEnd,
                        "description" : projectTask,
                    }
                    var url = `${config.baseUrl}/addProjectDetails/` + _id
                    fetch(url, {
                        method: "PUT",
                        headers: {"Content-Type": "application/JSON"},
                        body: JSON.stringify(newText) 
                    })
                    notifys("Employment Details added Successfully...!!")
                }
                else{ notifyf('Task details is absent...!!') }
            }
            else{ notifyf('Joining and Ending details is absent...!!') }
        }
        else{ notifyf('Company name is absent...!!') }
    }

    const backProfile = () => {
        navigate('/profilepage', {replace: true})
    }

    return(
       <Grid>
            <Card>
                <Card sx={{ textAlign: "center", backgroundColor: "#2A9D8F"}}>
                    <CardContent sx={{marginTop: "1%"}}>
                        <Typography gutterBottom variant="h5" component="div">Add Your Details Here:</Typography>
                    </CardContent>
                </Card>
                <Card sx={{color: "#264653"}}>
                    <CardContent>
                        <Typography>Update your Bio:</Typography>
                        <hr />
                        <TextField sx={{paddingRight: '1%'}} value={bio} onChange= {getBio} label='Add Bio Here:'/>
                        <Button sx={{float: "right", backgroundColor: "white", color: "#264653"}} variant="outlined" component="span" onClick={addBioDetails}>Update Bio</Button>
                    </CardContent>

                    <CardContent sx={{marginTop: '2%'}}>
                        <Typography>Add Employment Details Here:</Typography>
                        <hr />
                        <TextField sx={{paddingRight: '1%'}} value={companyName} onChange= {getCompanyName} label='company name:'/>
                        Start Date: <TextField sx={{paddingRight: '1%'}} value={startDate} type='date' onChange = {getStartDate}/>
                        End Date: <TextField sx={{paddingRight: '1%'}} value={endDate} type='date' onChange = {getEndDate}/>
                        <TextField label='Task Details:' value={taskText} onChange= {getTastText}/>
                        <Button sx={{alignSelf: 'right', float: 'right', backgroundColor: "white", color: "#264653"}} variant="outlined" component="span" onClick={companyDetails}>Add Employments Details</Button>
                    </CardContent>

                    <CardContent sx={{marginTop: '2%'}}>
                        <Typography>Add Project Details Here:</Typography>
                        <hr />
                        <TextField sx={{paddingRight: '1%'}} value={projectCompany} onChange= {getProjectName} label='company name:'/>
                        Start Date: <TextField sx={{paddingRight: '1%'}} value={projectStart} type='date' onChange = {getProjectStartDate}/>
                        End Date: <TextField sx={{paddingRight: '1%'}} value={projectEnd} type='date' onChange = {getProjectEndDate}/>
                        <TextField label='Task Details:' value={projectTask} onChange= {getProjectTask}/>
                        <Button sx={{alignSelf: 'right', float: 'right', backgroundColor: "white", color: "#264653"}} variant="outlined" component="span" onClick={projectDetails}>Add Employments Details</Button>
                    </CardContent>
                    <br />
                    <CardContent sx={{float: "right"}}>
                        <Button onClick={backProfile}>Back to Profile Page</Button>
                    </CardContent>
                </Card>
            </Card>
       </Grid>
    );
}