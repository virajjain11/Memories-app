import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import FileBase from "react-file-base64";

export default function Form({ currentId, setCurrentId }) {
  const post = useSelector((state) =>
    currentId ? state.posts.filter((post) => post._id === currentId) : null
  );
  const classes = useStyles();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    SelectedFile: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (post) {
      // console.log(postData);
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      SelectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          value={postData.creator}
          fullWidth
          label="creator"
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          value={postData.title}
          fullWidth
          label="title"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          value={postData.message}
          fullWidth
          label="message"
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          value={postData.tags}
          fullWidth
          label="tags"
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, SelectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          color="primary"
        >
          Submit
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={clear}
          size="small"
          color="secondary"
        >
          clear
        </Button>
      </form>
    </Paper>
  );
}
