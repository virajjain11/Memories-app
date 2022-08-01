import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const classes = useStyles();

  // console.log("Post from post component", post);
  const Likes = () => {
    //1 Like, 2 Likes, You ad 2 others
    // console.log(post?.likes?.length, "post?.likes?.length");
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (userId) => userId === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;{" "}
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          {" "}
          <ThumbUpAltOutlined fontSize="small" /> &nbsp;{post.likes.length}{" "}
          {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp;
      </>
    );
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <>
      <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography
            variant="h6"
            onClick={() => {
              setCurrentId(post._id);
              console.log(post._id, "iddddd");
            }}
          >
            {post.name}
          </Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {/* EDIT button  */}
          {(user?.result?.googleId === post.creator ||
            user?.result?._id === post.creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
                console.log(post._id, "iddddd");
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          )}
        </div>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <div className={classes.details}>
            <Typography variant="body2" color="secondary">
              {/* {console.log("posttttt tagss", post.tags)} */}
              {post?.tags?.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            {/* <ThumbUpAltIcon fontSize="small" />
            &nbsp; Like &nbsp;
            {post.like?.count} */}
            <Likes />
          </Button>
          {(user?.result?.googleId === post.creator ||
            user?.result?._id === post.creator) && (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
