import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

function HeaderIndex(props) {
    const [userType, setUserType] = useState("")

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType")
        setUserType(storedUserType)
    })
    return(
        <>
        <Box mb={2} py={10} bgcolor="secondary.main" color="white">
        <Container component = "main">
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">Open Job Listings</Typography>
                    {
                        userType === "employer" ? 
                        <Button onClick={props.openNewJobModule} variant="contained" color="primary" disableElevation>Post a Job</Button>
                        :
                        console.log("Job Seeker has logged In")
                    }
                    
                    </Box>
                </Grid>
            </Grid>
        </Container>
        </Box>
        </>
    )
}

export default HeaderIndex;