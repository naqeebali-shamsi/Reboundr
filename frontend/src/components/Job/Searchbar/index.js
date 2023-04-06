import React, { useState } from "react";
import { Box, Button, Select, MenuItem, Container, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useEffect } from "react";

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: "#fff",
        boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
        borderRadius: "5px",
        "& > *": {
            flex: 1, 
            height: "45px",
            margin: "8px",
        },
    },
});

function Search(props) {

    // Handling props for filter
    const search = () => {
        props.fetchCustomJob(jobSearch);
    }
    const [jobSearch, setJobSearch] = useState({
        type: 'Full time',
        location: 'Remote'
    });
    const handleChange = (e) => {
        setJobSearch(oldState => ({...oldState, [e.target.name]: e.target.value}))
    }

    // Handling props for searching
    const [searchValue, setSearchvalue] = useState('')
    const handleSearchValue = (e) => {
        setSearchvalue(e.target.value)
    }

    useEffect(() => {
        props.fetchSearchedJob(searchValue);
    })

    const classes = useStyles()
    return(
        <>
            <Container component="main">
            <Box p={2} mt={-5} mb={2} className={classes.wrapper} alignItems="center" display="flex" justifyContent="space-between">
                <Select onChange={handleChange} value={jobSearch.type} name="type"> 
                    <MenuItem value="Full time">Full time</MenuItem>
                    <MenuItem value="Part time">Part time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                </Select>
                <Select onChange={handleChange} value={jobSearch.location} name="location"> 
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="In-Office">In-Office</MenuItem>
                </Select>
                <Button onClick={search} variant="contained" color="primary" disableElevation>Search</Button>
            </Box>
            <Box display="flex" justifyContent="center">
                <TextField color="secondary" focused  label="Type to search for any Job ..." 
                variant="outlined" size="medium" sx={{width: 600}} id="outlined-basic" name="input" 
                value={searchValue} onChange={handleSearchValue}></TextField>
            </Box>
            <Box display="flex" justifyContent="flex-end">
            </Box>
            </Container>
        </>
    )
}

export default Search;