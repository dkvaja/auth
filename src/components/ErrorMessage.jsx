import React from "react";
import { Typography } from "@mui/material";

export default function ErrorMessage({ message }) {
  return (
    <>
      <Typography variant="body1" fontSize={14} color="error.main">
        *{message}
      </Typography>
    </>
  );
}
