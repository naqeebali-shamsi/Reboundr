//Authors: Mounisha Soudaboina, Naqeebali Shamsi
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Avatar, CssBaseline, Typography, OutlinedInput, TextField, InputAdornment, FormControl, FormControlLabel, InputLabel, IconButton, Button, Checkbox, Alert, Stack, Link, Paper, Box, Grid } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import config from '../config';
import { AuthContext } from "../context/AuthContext";

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
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://reboundr.netlify.app/">
                Reboundr
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


export default function LandingPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);


    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [formValidation, setFormValidation] = useState();
    const [success, setSuccess] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { setUser, setToken, setUserType, setUserData } = React.useContext(AuthContext);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMousePassword = (event) => {
        event.preventDefault();
    };

    const handleEmail = () => {
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

        if (emailError || !emailInput) {
            setFormValidation("Email is Invalid. Please Re-Enter");
            return;
        }

        if (passwordError || !passwordInput) {
            setFormValidation(
                "Password should be between 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }
        setFormValidation(null);
        axios.post(`${config.baseUrl}/login`, { email: emailInput, password: passwordInput }, { headers: { "Content-Type": "application/json", "Accept": "application/json" } })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userData", JSON.stringify(response.data.user));
                setUserData(response.data.user);
                setUser(response.data.id);
                setToken(response.data.token);
                setUserType(response.data.userType);
                notifys('Logged in successfully !!!');
                setSuccess(navigate('/posts'))

            }).catch((err) => {
                console.log(err);
            })
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container component="main" sx={{ height: '93vh' }}>
            <ToastContainer />
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/category/career)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email "
                            error={emailError}
                            name="email"
                            autoComplete="email"
                            value={emailInput}
                            InputProps={{}}
                            onBlur={handleEmail}
                            onChange={(event) => {
                                setEmailInput(event.target.value);
                            }}
                            autoFocus
                        />
                        <FormControl sx={{ m: 0, ml: 0, width: "100%" }} variant="outlined">
                            <InputLabel error={passwordError} htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                error={passwordError}
                                onBlur={handlePassword}
                                onChange={(event) => {
                                    setPasswordInput(event.target.value);
                                }}
                                value={passwordInput}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMousePassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<LoginIcon />}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button
                                    id="forgotPasswordLink"
                                    name="forgotPasswordLink"
                                    variant="text"
                                    href=""
                                    onClick={() => navigate("/resetpassword")}
                                >
                                    Forgot Password?
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    id="signupLink"
                                    name="signupLink"
                                    variant="text"
                                    href=""
                                    onClick={() => navigate("/register")}
                                >
                                    Don't have an account? Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                        {formValidation && (
                            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                                <Alert severity="error" size="small">
                                    {formValidation}
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
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={isLoading}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}