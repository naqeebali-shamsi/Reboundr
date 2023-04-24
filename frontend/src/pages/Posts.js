//Author: Dishank Jitendra Jani (B00917756)
import React, { useEffect, useState } from 'react'
import Postsection from '../components/PostsModule/Postsection';
import Box from '@mui/joy/Box';
import Profilesection from '../components/PostsModule/Profilesection';
import { CircularProgress, Grid } from '@mui/material';
import { Container } from '@mui/system';
import config from "../config";

export default function Posts() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Fetches the posts using Http get request
    fetch(`${config.baseUrl}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false); // Set the loading state to false
      })
      .catch((error) => console.error(error));
  }, []);

  let user_info = "I'm an award-winning content writer who has eight years of experience creating compelling articles and short stories. I'm continuously searching for new topics and stories to capture the attention of new readers.";

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Box>
              <Profilesection user_info={user_info} />
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box >
              {/* Conditionally render the loading indicator or the post section */}
              {loading ? (
                <CircularProgress />
              ) : (
                // Maps through the PostSection component and load all posts
                <>
                  {posts.map((post) => (
                    <Postsection key={post.id} title={post.Name} description={post.description} author={post.author} postedOn={post.postedOn} file={post.file} />
                  ))}
                </>
              )}
            </Box>
          </Grid>
        </Grid>

      </Container>
    </>
  )
}
