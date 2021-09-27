import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router} from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { customTheme } from "./Styles/customTheme";


ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
