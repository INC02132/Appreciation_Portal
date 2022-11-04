import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Utils/authConfig";
import { useState } from "react";
import "./LoginPage.css";
import { Stack } from "@mui/system";
import { Paper } from "@mui/material";

function handleLogin(instance) {
  instance.loginRedirect(loginRequest).catch((e) => {
    console.error(e);
  });
}

const toolbarStyle = {
  minHeight: "52px",
};

const LoginPage = () => {
  const { instance } = useMsal();

  const [toggleState, setToggleState] = useState(false);
  const handleToggle = () => {
    setToggleState(true);
  };
  const handleRemoveToggle = () => {
    setToggleState(false);
  };
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", backgroundColor: "white" }}
      className="login_page"
    >
      <CssBaseline />
      <Grid item md={7} sm={7}>
        <Stack>
          <div className="logo">
            <img
              src="./logo.png"
              height="45rem"
              alt=" "
              style={{ marginLeft: "1rem" }}
            />
            <br></br>
            <img
              src="./incture.png"
              height="24rem"
              alt=" "
              style={{ marginLeft: "1rem" }}
            />
          </div>
          <Grid
            className="coverImage"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src="./word-cloud.png" height="100%" width="100%" alt=" " />
          </Grid>
        </Stack>
      </Grid>

      <Grid item md={5} sm={5} square sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Paper elevation={4}
          sx={{
            backgroundColor: "transparent",
            borderRadius: "10px",
            width: "30rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3rem",
          }}
        >
          <Typography className="welcome">Welcome!</Typography>
          <Typography className="loginText">
          Please sign in to access message
          </Typography>
          <Button
            type="submit"
            variant="contained"
            onClick={() => handleLogin(instance)}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#002947",
              "&:hover": {
                backgroundColor: "#011828",
              },
            }}
          >
            Login
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
