import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Stack, FormControl, FormHelperText, Alert, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import config from "../config";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifys = () => {
    toast.success('Registration Successful', {
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

const notifyf = () => {
  toast.error('passwords do not match', {
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

const backGroundStyle = { padding: 20, height: 'auto', width: 700, margin: "5% auto" }
const buttonstyle = { margin: '9px 0' }
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Registration = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [usertype, setUsertype] = useState('')

  const handleEmail = () => {
    console.log(isEmail(email));
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (!password ||
      password.length < 5 ||
      password.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== cpassword) {
      setPasswordError(true);
      notifyf();

    }
    else {
      setPasswordError(false);
      notifys();
      // setSuccess(navigate("/"));
      
      axios.post(`${config.baseUrl}/register`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userType: usertype
      }, {
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        },
      })
        .then((response) => {
          console.log(response);
      
          setSuccess(navigate("/"));
        })
        .catch((error) => {
          alert(error.response.data.message);
          window.location.reload();
          console.log(error);
        });
    }
  }


  return (
    <React.Fragment>

      <Paper elevation={14} variant="outlined" square sx={8}  style={backGroundStyle}>
      <h1 ><center>Signup with Reboundr !</center></h1>
      <form onSubmit={handleSubmit} action={<Link to="/" />} justify="center" >
      <Stack spacing={2} direction="column" sx={{
          marginTop: 5, marginBottom: 4
          , marginLeft: 8, marginRight: 8
        }}>
      
        
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="First Name"

            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="Last Name"
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        {/* </Stack> */}
      
          <TextField
            type="email"
            error={emailError}
            variant='outlined'
            color='secondary'
            label="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}

            required
            sx={{ mb: 4 }}
          />

          <FormControl variant="standard"
            required
            sx={{
              width: 250
            }}>
            <InputLabel>UserType</InputLabel>
            <Select label="UserType" value={usertype} onChange={e => setUsertype(e.target.value)} >
              <MenuItem value={'employer'}>Employer</MenuItem>
              <MenuItem value={'jobseeker'}>Job Seeker</MenuItem>

            </Select>
            <FormHelperText>Select a Usertype</FormHelperText>
          </FormControl>
          <TextField
            type="password"
            variant='outlined'
            color='secondary'
            label="Password"

            onChange={e => setPassword(e.target.value)}
            value={password}
            required

            sx={{ mb: 4 }}
          />

          <TextField
            type="password"
            variant='outlined'
            color='secondary'
            label="Confirm Password"
            onChange={e => setCPassword(e.target.value)}
            value={cpassword}

            required

            sx={{ mb: 4 }}
          />
<br/>
        
        <Button variant="contained" color="primary" type="submit"  
       style={buttonstyle}
   
        >Register</Button>
        </Stack>
      </form>
      
      <medium>Already have an account? <Link to="/login">Login Here</Link></medium>
</Paper>
    
    
   
 </React.Fragment>
  );
}

export default Registration