import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Input } from "../Styles/styledComponents";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export default function Register() {
  const [registerError, setRegisterError] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, phoneNumber, password } = data;
    if (localStorage.getItem('user')) {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      loggedInUser.email === email && setRegisterError("User Already Registerd please use different mail");
    }
    else {
      if (registerDataValidator(data)) {
        const formatedUserData = {
          name: name.trim(),
          email,
          phoneNumber,
          password: password.trim(),
        };
        localStorage.setItem("user", JSON.stringify(formatedUserData));
        history.push("/");
      } else {
        console.log("false");
      }
    }
  };

  const registerDataValidator = (data) => {
    let isValid = true;
    let error = "";
    const { name, email, phoneNumber, password } = data;

    if (name.trim() === "") {
      isValid = false;
      error = "Please Enter Valid Name";
      setRegisterError(error);
      return isValid;
    }

    else if (email.trim() === "") {
      isValid = false;
      error = "Please Enter valid email"
      return isValid;
    }
    else if (password.trim() === "") {
      isValid = false;
      error = "Please Enter valid password"
      return isValid;
    }
    return isValid;
  };

  return (
    <>
      <Grid
        container
        className={classes.loginContainer}
        justifyContent="center"
      >
        <Grid item lg={8} md={8} sm={12} className={classes.sideNav}>
          <Grid
            container
            height="100%"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="body1" color="#fff" gutterBottom>
              Have you already an account?
            </Typography>
            <Button variant="contained" component={Link} to={"/"}>
              Log in
            </Button>
          </Grid>
        </Grid>

        <Grid item lg={4} md={4} sm={12} className={classes.loginFormBox}>
          <Grid container flexDirection="column" alignItems="center">
            <Typography variant="h4" align="center">
              Register
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Enter your details to create account
            </Typography>
            <Grid container spacing={2} mt={1} justifyContent="center">
              {registerError && <ErrorMessage message={registerError} />}
              <form
                onSubmit={handleSubmit(handleRegister)}
                className={classes.form}
                autocomplete="off"
              >
                <Input
                  placeholder="Name"
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    pattern: {
                      value: /^[a-zA-z\s]+$/,
                      message: 'Enter Valid Name'
                    }
                  })}
                  autoComplete="off"
                />
                {errors.name && <ErrorMessage message={errors.name.message} />}

                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please Enter Valid Email Address",
                    },
                  })}
                  autoComplete="off"
                />
                {errors.email && (
                  <ErrorMessage message={errors.email.message} />
                )}

                <Input
                  placeholder="Phone Number"
                  type="tel"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                      message: "Please Enter Valid Phone number",
                    },
                  })}
                  autoComplete="off"
                />
                {errors.phoneNumber && (
                  <ErrorMessage message={errors.phoneNumber.message} />
                )}

                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                {errors.password && (
                  <ErrorMessage message={errors.password.message} />
                )}

                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                  }}
                  type="submit"
                >
                  Register
                </Button>
              </form>
            </Grid>
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
