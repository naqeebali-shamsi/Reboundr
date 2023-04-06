// Author: Alis Mangukiya B00930134
import { Grid, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Container } from '@mui/system';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ProfilesCard from '../components/Networking/ProfilesCards';
import axios from 'axios';
import config from "../config";
import { AuthContext } from "../context/AuthContext";
import { SyncLoader } from 'react-spinners';

export default function Networking() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchResults, setSearchResults] = useState(users);
    const [searchQuery, setSearchQuery] = useState('');
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate("/"); // redirect to login if token is not present
            return;
        }
        const fetchData = async () => {
            const response = await axios.get(`${config.baseUrl}/userdetails`); // fetch the data of all users
            const data = response.data;
            setUsers(data);
            setSearchResults(data);
            setIsLoading(true); // loading animation state
        };
        fetchData();
    }, [navigate, token]);

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
            const filteredData = users.filter(item =>
                item.firstName.toLowerCase().includes(query.toLowerCase()) ||
                item.lastName.toLowerCase().includes(query.toLowerCase()) ||
                (item.firstName + ' ' + item.lastName).toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredData); // setting users data according to the query
        } else {
            setSearchResults(users); // if not query then all users
        }
    };

    useState(() => {
        setSearchResults(users);
    }, [users]);

    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <Box mt={2} mb={2}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            {isLoading ? (
                // mapping users data
                <Grid container spacing={2}>
                    {
                        searchResults.map((user, index) => (
                            <ProfilesCard key={index} title={user.firstName + " " + user.lastName} desc={user.designation} buttonText={user.buttonText} src={user.image} email={user.email} />
                        ))
                    }
                </Grid>
            ) : (
                // loading animation
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <SyncLoader color="#36D7B7" loading={true} size={15} />
                </div>
            )}
        </Container>
    )
}
