import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import theme from "../../theme/theme";
import { makeStyles } from '@mui/styles';
import { differenceInHours } from 'date-fns'

const useStyles = makeStyles({
    wrapper: {
        border: '1px solid #e8e8e8',
        cursor: "pointer",
        transition: '.3s',
        "&:hover" : {
            boxShadow: "20",
            borderLeft: "6px solid #FFD700"
        }
    },
    companyName: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "5px",
        padding: theme.spacing(0.75),
        display: "inline-block",
        fontWeight: 600,
        color: "white"
    },
    skillStyle: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "5px",
        padding: theme.spacing(0.75),
        display: "inline-block",
        fontWeight: 600,
        color: "whitesmoke"
    }
})

function Jobcard(props) {   
    const classes = useStyles()
    return(
        <>
            <Box>
            <Container component = "main" className={classes.wrapper}>
                <Grid alignItems="center" p={2} container spacing={12}>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1">{props.title}</Typography>
                        <Typography className={classes.companyName} variant="subtitle2">{props.companyName}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {props.skills ? props.skills.map((s) => (
                            <Grid key={s} className={classes.skillStyle} item>
                                {s}
                            </Grid>
                        )) : 
                        <>
                        </>}
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption"> {differenceInHours(Date.now(), new Date(props.postedOn))} hours ago | {props.type} | {props.location}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Box>
                        <Button onClick={props.open} variant="outlined">Check</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    )
}

export default Jobcard;