import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import { Grid, Grow, Container } from "@material-ui/core";
// import useStyles from "./styles";
import { getPosts } from "../../actions/posts";

const Home = () => {
  // const styles = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          // className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
