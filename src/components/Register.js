import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import React, { Component } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { withStyles } from "@mui/styles";


const styles = (theme) => ({
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
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    };
  }
  handleDataChange = (e, name) => {
    this.setState({
      ...this.state,
      [name]: e.target.value,
    });
  };

  validateFormData = () => {
    let userData = this.state;
    let error = "";
    let isValid = true;

    if (localStorage.getItem("user")) {
      const { email } = JSON.parse(localStorage.getItem("user"));
      if (userData.email === email) {
        error = "User Already Registered";
        alert('User Already Registered');
        isValid = false;
      }
    }

    if (!!userData.email) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(userData.email)) {
        isValid = false;
        error = "Please enter valid email";
      }
    }

    if (!!userData.phoneNumber) {
      if (!userData.phoneNumber.match(/^[0-9]{10}$/)) {
        isValid = false;
        error = "Please Enter valid Phone Number";
      }
    }
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(this.state));
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { classes } = this.props;
    const { name, email, phoneNumber, password } = this.state;
    console.log();
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

          <Grid item lg={4} md={4} sm={12} className={classes.loginForm}>
            <Grid container flexDirection="column" alignItems="center">
              <Typography variant="h4" align="center">
                Register
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Enter your details to create account
              </Typography>
              <Grid container spacing={2} mt={1} justifyContent="center">
                <Grid item>
                  <TextField
                    id="outlined-basic1"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      this.handleDataChange(e, "name");
                    }}
                    placeholder="Name"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-basic2"
                    type="email"
                    required
                    value={email}
                    placeholder="Email"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleDataChange(e, "email");
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-basic3"
                    type="tel"
                    value={phoneNumber}
                    placeholder="Phone Number"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleDataChange(e, "phoneNumber");
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CallOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    value={password}
                    id="outlined-basic4"
                    placeholder="Password"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleDataChange(e, "password");
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={this.handleSubmit}
                    disabled={!name || !email || !phoneNumber || !password}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Register));
