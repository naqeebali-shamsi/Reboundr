import React, {useState} from "react";
import { Box, Button, Grid, Dialog, DialogTitle, FilledInput, DialogContent } from "@mui/material";
import dummySkills from "../../dummySkill"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function AddNewSkill(props) {

    const [newSkill, setNewSkill] = useState('');

    const handleSubmit = (j) => {
        if(!newSkill){
            notifyf("You didn't enter any skill.");
        } else {
            dummySkills.push(newSkill)
            console.log(dummySkills);
            props.closeSkillModule();
        }
    }

    const handleChange = (e) => {
        setNewSkill(e.target.value);
    }

    return (
        <>
        <Dialog open={props.openNewSkillModule} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Enter skill
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                    <FilledInput onChange={handleChange} name="skill" value={newSkill} placeholder="Enter Skill Here.. *" fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={2}>
                    <Button onClick={j => handleSubmit(j)} variant="outlined" color="primary" 
                            disableElevation>
                            Submit
                    </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default AddNewSkill;