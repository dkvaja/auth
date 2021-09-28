import { Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Input } from "../Styles/styledComponents";

export default function Login() {
  const [userError, setUserError] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    if (!!data.userName && !!data.password) {
      if (!!localStorage.getItem("user")) {
        const { email, password } = JSON.parse(localStorage.getItem("user"));
        if (data.userName === email && data.password === password) {
          localStorage.setItem(
            "isUserAuthenticated",
            JSON.stringify({
              isUserAuthenticated: true,
            })
          );
          history.push("/dashboard");
        } else {
          setUserError("Credentials does not match");
        }
      } else {
        setUserError("User Not Found");
      }
    }
  };

  return (
    <>
      <Grid
        container
        className={classes.loginContainer}
        justifyContent="center"
      >
        <Grid item lg={4} md={4} sm={12} className={classes.loginFormBox}>
          <Grid container flexDirection="column" alignItems="center">
            <Typography variant="h4" align="center">
              Log in
            </Typography>

            <Typography variant="body1" align="center" gutterBottom>
              Enter your credentials to Login
            </Typography>

            <Grid container mt={1} justifyContent="center">
              {userError && <ErrorMessage message={userError} />}

              <form
                onSubmit={handleSubmit(handleLogin)}
                className={classes.form}
              >
                <Input
                  placeholder="Username"
                  type="email"
                  {...register("userName", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please Enter Valid Email Address",
                    },
                  })}
                  autoComplete="off"
                />

                {errors.userName && (
                  <ErrorMessage message={errors.userName.message} />
                )}

                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password can't not be blank",
                    },
                  })}
                />

                {errors.password && (
                  <ErrorMessage message={errors.password.message} />
                )}

                <Button
                  variant="contained"
                  type={"submit"}
                  sx={{
                    width: "100%",
                  }}
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
  loginFormBox: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  sideNav: {
    background:
      "linear-gradient(90deg, rgba(21,166,252,1) 35%, rgba(0,212,255,1) 100%)",
  },
}));
