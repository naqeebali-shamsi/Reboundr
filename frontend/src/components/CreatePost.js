import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Box from '@mui/joy/Box';
import { UploadFile } from '@mui/icons-material';
export default function CreatePost() {

  const ALPHABET_REGEX = /^[a-zA-Z]+$/;
  
  const [formErrors, setFormErrors] = useState({
    title: '',
    desc: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    file: ''
  });

  const handleInputChange = event => {
    setFormData({
      //this ...formData tells that only the field which is updated is stored in a new objectrest all input field remains as it is 
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    if (validateForm()) {
      alert("Congratulations!!! your post is saved");
    }
    
    event.preventDefault();
    console.log(formData);
    // send form data to server, or do something else
  };

  const validateForm = () => {

    let errors = {};
    let isValid = true;
  
    if(!formData.title){
      errors.title = "Title cannot e empty";
      isValid=false;
    } else if(!ALPHABET_REGEX.test(formData.title)){
      errors.title = "post Title must be only in alphabets";
      isValid=false;
    }
  
    if(!formData.desc){
      errors.desc = "post Description Name cannot e empty";
      isValid=false;
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
        <form onSubmit={handleSubmit} method="post" action="">
          <Grid alignItems="center" justify="center">
            <Grid item>
              <TextField
              fullWidth
                type="text"
                id="title"
                name="title"
                label="Title"
                variant="filled"
                style={{ marginTop: '10' }}
                value={formData.title}
                onChange={handleInputChange}
                
                required
              />
            </Grid>
            <p style={{color:"Red"}}>
                    {formErrors.title}
                </p>

            <Grid item>
              <TextField fullWidth
                id="desc"
                name="desc"
                label="Description: "
                type="text"
                variant="filled"
                value={formData.desc}
                onChange={handleInputChange}
                style={{ marginTop: '10' }}
                multiline
                rows={4}
                required
              />
          
            </Grid>
            <p style={{color:"Red"}}>
                    {formErrors.desc}
                </p>

            <div style={{ display: 'flex', marginTop: '40px' }}>
              <Button startIcon={<UploadFile />} onChange={handleInputChange}>
              <input
                type="file"
                id="file"
                name="file"
                value={formData.file}
              />
              </Button>
            </div>
            <Button type="submit" variant="contained" style={{flex:1, float: "right", marginTop: 20}} >Post</Button>
          </Grid>
        </form>
      </Card>
    </Box>
  )
}
