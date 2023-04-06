import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, FormControl, InputLabel, IconButton, Button, Input, Alert, Stack } from "@mui/material";
import config from "../config";
import axios from 'axios';

// source: https://bit.cloud/mui-org/material-ui-icons/visibility
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifys = () => {
  toast.success('password reset successful', {
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
    toast.error('Passwords do not match', {
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

export default function ResetPassword() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [passwordInput, setPasswordInput] = useState();
  const [cpasswordInput, setCPasswordInput] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleSubmit = () => {
    setSuccess(null);

    if (passwordError || !passwordInput) {
      setFormValid(
        "Password should be between 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    if (passwordInput === cpasswordInput) {

      axios.post(`${config.baseUrl}/resetpassword`, {

        email: emailInput,
        password: passwordInput

      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response);
          setSuccess(navigate("/"));
        })
        .catch((error) => {
          console.log(error);
        });
      setSuccess("password reset successful");
      notifys();
      setSuccess(navigate("/"));
      return;
    }
    else { 
      notifyf();
    }
    setFormValid(null);


    console.log("Password : " + passwordInput);
    console.log("CPassword : " + cpasswordInput);

  };

  return (

    <Paper elevation={14} variant="outlined" square sx={8} style={backGroundStyle}>

      <h1><center>Create Password </center></h1>
      <TextField
        label="Email "
        error={emailError}
        id="standard-basic"
        variant="standard"
        sx={{ width: "100%" }}
        value={emailInput}
        InputProps={{}}
        size="medium"
        onBlur={handleEmail}
        onChange={(event) => {
          setEmailInput(event.target.value);
        }}> </TextField>

      <br /><br />

      <FormControl sx={{ width: "100%" }} variant="standard" >

        <InputLabel
          error={passwordError}
          htmlFor="standard-adornment-password"
        >
          Password
        </InputLabel>
        <br /><br />
        <Input
          error={passwordError}
          onBlur={handlePassword}
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(event) => {
            setPasswordInput(event.target.value);
          }}
          value={passwordInput}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel
          error={passwordError}

        >
          Confirm password
        </InputLabel>
        <br /><br />
        <Input

          error={passwordError}
          onBlur={handleSubmit}


          onChange={(event) => {
            setCPasswordInput(event.target.value);
          }}
          value={cpasswordInput}


        />
      </FormControl>


      <br /><br />
      <center>
        <Button
          variant="contained"

          onClick={handleSubmit}
          style={buttonstyle}
        >
          Reset
        </Button>
      </center>

      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          </Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}
    </Paper>
  );
}