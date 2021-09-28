import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, Controller } from 'react-hook-form'

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [logInData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!!logInData.userName && !!logInData.password) {
      if (!!localStorage.getItem("user")) {
        const { email, password } = JSON.parse(localStorage.getItem("user"));
        if (logInData.userName === email && logInData.password === password) {
          localStorage.setItem(
            "isUserAuthenticated",
            JSON.stringify({
              isUserAuthenticated: true,
            })
          );
          history.push("/dashboard");
        }
      }
    }
  };

  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const { userName, password } = logInData;
  return (
    <>
      <Grid
        container
        className={classes.loginContainer}
        justifyContent="center"
      >
        <Grid item lg={4} md={4} sm={12} className={classes.loginForm}>
          <Grid container flexDirection="column" alignItems="center">
            <Typography variant="h4" align="center">
              Log in
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Enter your credentials to Login
            </Typography>
            <Grid container spacing={2} mt={1} justifyContent="center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  id="outlined-basic1"
                  type="email"
                  // value={userName}
                  name={userName}
                  error={Boolean(errors.userName)}
                  helperText={errors.userName?.message}
                  inputRef={register({
                    required: "First Name is required.",
                  })}
                  placeholder="Username"
                  variant="outlined"
                  // onChange={(e) =>
                  //   setLoginData({
                  //     ...logInData,
                  //     userName: e.target.value,
                  //   })
                  // }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  type="password"
                  id="outlined-basic"
                  placeholder="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) =>
                    setLoginData({
                      ...logInData,
                      password: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  // onClick={handleLogin}
                  type={"submit"}
                  // disabled={!userName || !password}
                >
                  Log In
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={8} md={8} sm={12} className={classes.sideNav}>
          <Grid
            container
            height="100%"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="body1" color="#fff" gutterBottom>
              Don't have an account?
            </Typography>
            <Button variant="contained" component={Link} to={"/register"}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
  },
  loginForm: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sideNav: {
    background:
      "linear-gradient(90deg, rgba(21,166,252,1) 35%, rgba(0,212,255,1) 100%)",
  },
}));
