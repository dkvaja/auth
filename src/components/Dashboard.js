import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory, useLocation } from "react-router-dom";
import Drawer from "./DrawerBox";
import MenuAppBar from './AppBar';


export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const handleLogOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <MenuAppBar setIsDrawerOpen={setIsDrawerOpen} open={isDrawerOpen} />
      <Drawer >
        <Typography variant={"h3"} align="center">
          Welcome to the auth {location.state?.userName}
        </Typography>
        <Box m="0 auto">
          <Button variant="contained" onClick={handleLogOut}>
            Log Out
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
