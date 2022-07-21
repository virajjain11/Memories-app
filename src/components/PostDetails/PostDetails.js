import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useStyles from "./styles";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import moment from "moment";
import { getPost, getPostsBySearch } from "../../actions/posts";

const Postdetails = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, post } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log(id);
    dispatch(getPost(id));
    console.log("dispatch from useEffect");
  }, [id]);

  if (isLoading) {
    console.log("no post!!!");
    return (
      <>
        <Paper elevation={6}>
          <CircularProgress size="7em" />
        </Paper>
      </>
    );
  }

  return (
    <>
      {!isLoading && (
        <>
          <Paper
            style={{ padding: "20px", borderRadius: "15px" }}
            elevation={6}
          >
            <div className={classes.card}>
              <div className={classes.section}>
                <Typography variant="h3" component="h2">
                  {post.post.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="textSecondary"
                  component="h2"
                >
                  {post.post.tags.map((tag) => `#${tag} `)}
                </Typography>
                <Typography gutterBottom variant="body1" component="p">
                  {post.post.message}
                </Typography>
                <Typography variant="h6">
                  Created by: {post.post.name}
                </Typography>
                <Typography variant="body1">
                  {moment(post.post.createdAt).fromNow()}
                </Typography>
                <Divider style={{ margin: "20px 0" }} />
                <Typography variant="body1">
                  <strong>Realtime Chat - coming soon!</strong>
                </Typography>
                <Divider style={{ margin: "20px 0" }} />
                <Divider style={{ margin: "20px 0" }} />
              </div>
              <div className={classes.imageSection}>
                <img
                  className={classes.media}
                  src={post.post.selectedFile}
                  alt={post.post.title}
                />
              </div>
            </div>
          </Paper>
        </>
      )}
    </>
  );
};

export default Postdetails;

// const PostDetails = () => {
// const {
//   post: { post },
//   posts,
//   isLoading,
// } = useSelector((state) => state.posts);

//   const dispatch = useDispatch();
//   const { id } = useParams();
//   console.log(id);
//   // dispatch(getPost(id));

//   useEffect(() => {
//     console.log("useEffect");
//     // dispatch(getPost(id));
//     console.log("dispatch from useEffect");
//   }, [id]);

//   // const data = useSelector((state) => state);
//   // console.log(data);

//   console.log("posts", posts);
//   const navigate = useNavigate();
//   const classes = useStyles();

//   // useEffect(() => {
//   //   if (post) {
//   //     dispatch(
//   //       getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
//   //     );
//   //   }
//   //   console.log("posts", posts);
//   // }, [post]);

//   if (!post) {
//     console.log("no post!!!");
//     return null;
//   }

//   if (isLoading) {
//     return (
//       <>
//         <Paper elevation={6}>
//           <CircularProgress size="7em" />
//         </Paper>
//       </>
//     );
//   }

//   return (
//     <>
//       <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
//         <div className={classes.card}>
//           <div className={classes.section}>
//             <Typography variant="h3" component="h2">
//               {post.title}
//             </Typography>
//             <Typography
//               gutterBottom
//               variant="h6"
//               color="textSecondary"
//               component="h2"
//             >
//               {post.tags.map((tag) => `#${tag} `)}
//             </Typography>
//             <Typography gutterBottom variant="body1" component="p">
//               {post.message}
//             </Typography>
//             <Typography variant="h6">Created by: {post.name}</Typography>
//             <Typography variant="body1">
//               {moment(post.createdAt).fromNow()}
//             </Typography>
//             <Divider style={{ margin: "20px 0" }} />
//             <Typography variant="body1">
//               <strong>Realtime Chat - coming soon!</strong>
//             </Typography>
//             <Divider style={{ margin: "20px 0" }} />
//             {/* <CommentSection post={post} /> */}
//             <Divider style={{ margin: "20px 0" }} />
//           </div>
//           <div className={classes.imageSection}>
//             <img
//               className={classes.media}
//               src={post.selectedFile}
//               alt={post.title}
//             />
//           </div>
//         </div>
//       </Paper>
//     </>
//   );
// };

// export default PostDetails;
