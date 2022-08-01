import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import {
  Grid,
  Grow,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import { getPosts, getPostsBySearch } from "../../actions/posts";
// import Paginate from "../pagination/Pagination";
function useQuery() {
  return new URLSearchParams(useLocation().search); //must look into!!!
}
const Home = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      //dispatch
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleKey = (e) => {
    if (e.charCode === 13) {
      searchPost();
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={styles.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              className={styles.appBarSearch}
            >
              <TextField
                variant="outlined"
                name="search"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKey}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                defaultValue={["foo", "bar"]}
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button color="primary" variant="contained" onClick={searchPost}>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* <Paper elevation={6}><Paginate /> </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
