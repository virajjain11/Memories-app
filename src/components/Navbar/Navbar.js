import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    // navigate(-1);
    navigate("/", { replace: true });
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    console.log("token", token);
    // jwt expiry check
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          align="center"
          variant="h2"
        >
          Memories
        </Typography>
        <img
          src={memories}
          className={classes.image}
          alt="memories"
          height={60}
        />
      </div>
      <Toolbar>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" className={classes.userName}>
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.logout}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              component={Link}
              to="/auth"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
