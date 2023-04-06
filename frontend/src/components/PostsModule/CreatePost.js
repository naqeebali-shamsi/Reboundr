//Author: Dishank Jitendra Jani (B00917756)
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Box from '@mui/joy/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import config from "../../config";

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

export default function CreatePost(props) {



  const [formErrors, setFormErrors] = useState({
    Name: '',
    description: '',
  });

  const [formData, setFormData] = useState({
    Name: '',
    description: '',
    author: null,
    file: null
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  //manages the file which is uploaded
  const handleFileChange = (event) => {
    setFormData({ ...formData, file: event.target.files[0] });
  }


  //post request is made once user clicks on submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.append('Name', formData.Name);
    postData.append('description', formData.description);
    postData.append('file', formData.file);
    postData.append('author', props.firstname)

    if (validateForm()) {
      axios.post(`${config.baseUrl}/posts/add`, postData)
        .then(response => {
          notifys('Congrats!! post is saved');
          setFormData({ Name: '', description: '', file: null, author: '' });
        })
        .catch(error => {
          console.error('Error submitting form:', error.response.data);
          notifys('There was a problem submitting the form.');
        });

    }
    else {
      notifys("Form Validation failed");
    }

  };


  const validateForm = () => {

    let errors = {};
    let isValid = true;

    if (!formData.Name) {
      errors.Name = "Title cannot e empty";
      isValid = false;
    }

    if (!formData.description) {
      errors.description = "post Description Name cannot e empty";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }


  return (
    <Box gridColumn="span 9">
      <Card sx={{ padding: 4 }} style={{ marginTop: '10px' }}>
        <Typography gutterBottom variant="h5" component="div">
          Create a post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid alignItems="center" justify="center">
            <Grid item>
              <TextField
                fullWidth
                type="text"
                id="Name"
                name="Name"
                label="Title"
                variant="filled"
                style={{ marginTop: '10' }}
                value={formData.Name}
                onChange={handleInputChange}

                required
              />
            </Grid>
            <p style={{ color: "Red" }}>
              {formErrors.Name}
            </p>

            <Grid item>
              <TextField fullWidth
                id="description"
                name="description"
                label="Description: "
                type="text"
                variant="filled"
                value={formData.description}
                onChange={handleInputChange}
                style={{ marginTop: '10' }}
                multiline
                rows={4}
                required
              />

            </Grid>
            <p style={{ color: "Red" }}>
              {formErrors.description}
            </p>

            <div style={{ display: 'flex', marginTop: '40px' }}>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
              />
            </div>
            <Button type="submit" variant="contained" style={{ flex: 1, float: "right", marginTop: 20 }} >Post</Button>
          </Grid>
        </form>
      </Card>
    </Box>

  )
}
