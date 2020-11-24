import React, { useState, useContext } from "react";
import "../css/Loginpage.css";
import { Redirect } from "react-router-dom";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
import Loader from "../components/Loader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Loginpage() {
  const { user, login, showloader } = useContext(AuthunticateContext);
  const [email, setEmail] = useState(() => {
    return "";
  });
  const [password, setPassword] = useState(() => {
    return "";
  });
  const classes = useStyles();
  return user ? (
    <Redirect to="/" />
  ) : (
    <Container component="main" maxWidth="xs" style={{ marginTop: "7rem" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            aria-required="true"
            autoFocus
            onChange={handelEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            aria-required="true"
            id="password"
            autoComplete="current-password"
            onChange={handelPassChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Loader hide={!showloader} />
        </form>
      </div>
    </Container>
  );

  function handelEmailChange(e) {
    setEmail(e.target.value);
  }

  function handelPassChange(e) {
    setPassword(e.target.value);
  }

  function handelSubmit(e) {
    e.preventDefault();
    login(email, password);
  }
}
