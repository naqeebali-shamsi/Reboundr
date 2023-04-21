import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HeaderIndex from '../components/Job/Header/index';
import Search from '../components/Job/Searchbar/index';
import Jobcard from '../components/Job/JobCard';
import PostJob from '../components/Job/NewJobModule';
import ViewJob from '../components/Job/ViewJobModule';
import AddNewSkill from '../components/Job/NewSkill';
import axios from 'axios';
import config from '../config';
import { AuthContext } from '../context/AuthContext';

function JobsModule() {

  const [userType, setUserType] = useState("")

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType")
    setUserType(storedUserType)
  })

  const { token } = useContext(AuthContext);

  const [openJobModule, setOpenJobModule] = useState(false);
  const [viewJob, setViewJob] = useState({});
  const [openSkillModule, setOpenSkillModule] = useState(false);
  const [filteredJob, setFilteredJob] = useState(false);
  const clearFilters = () => {
    setFilteredJob(false);
  }
  
  const fetchCustomJob = jobSearch => {
    setFilteredJob(jobSearch)
  }
  const [jobBeingSearched, setJobBeingSearched] = useState('');
  const fetchSearchedJob = searchedJob => {
    setJobBeingSearched(searchedJob)
  }
  const [jobDataApi, setJobDataApi] = useState([])

  useEffect(() => {
    let request_config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    async function fetchMyAPI() {
      const result = await axios(`${config.baseUrl}/jobs`, {
        headers: request_config.headers
      });
      console.log(result.data)
      setJobDataApi(result.data);
    }
    fetchMyAPI()
  }, []);

  const fJobs = jobDataApi.filter((j) => j.type.includes(filteredJob.type) && j.location.includes(filteredJob.location))

  return (
    <>
      <HeaderIndex openNewJobModule={() => setOpenJobModule(true)} />
      <PostJob closeJobModule={() => setOpenJobModule(false)} openJobModule={openJobModule} openNewSkillModule={() => setOpenSkillModule(true)} />
      <AddNewSkill closeSkillModule={() => setOpenSkillModule(false)} openNewSkillModule={openSkillModule} />
      <ViewJob job={viewJob} closeModal={() => setViewJob({})} />
      <Box mb={3}>
        {
          userType === "jobseeker" ?
            <Search fetchCustomJob={fetchCustomJob} fetchSearchedJob={fetchSearchedJob} jobBeingSearched={jobBeingSearched} filteredJob={filteredJob} clearFilters={clearFilters} />
            :
            console.log("Employer has logged in")
        }

        {/* Inline conditonal operator
      1st check filter is true, then display filtered job. Else display all the jobs or allow to search for a job  */}
        {
          filteredJob
            ? jobDataApi.map(j => <Jobcard open={() => setViewJob(j)} key={j._id} {...j} />)
              .filter((j) => j.props.type === filteredJob.type && j.props.location === filteredJob.location)
            : jobDataApi.filter((job) => {
              return jobBeingSearched.toLowerCase() === '' ? job : job.title.toLowerCase().includes(jobBeingSearched)
            }).map(j => <Jobcard open={() => setViewJob(j)} key={j._id} {...j} />)
        }
      </Box>
    </>
  );
}

export default JobsModule;