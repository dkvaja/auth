import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const { name } = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const handleLogOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant={"h3"} align="center">
          Welcome to the auth {name}
        </Typography>
        <Box m="0 auto">
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
          </Button>
        </Box>
      </Container>
    </>
  );
}
