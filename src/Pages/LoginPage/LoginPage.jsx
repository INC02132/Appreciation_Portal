import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Utils/authConfig";
import { useState } from "react";
import "./LoginPage.css";
import { Paper, Stack } from "@mui/material";

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
    <Grid container
    component="main"
      sx={{ height: "100vh", backgroundColor: "white" }}
      style={{backgroundImage: "url(./LoginImage.png)", backgroundSize: "100%"}}
      className="login_page">
        <Grid item md={6}>
        <img
              src="./incture.png"
              height="26rem"
              alt=" "
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            />
        </Grid>
        <Grid item md={6}>
          <Stack>
            <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
            <img
              src="./logo.png"
              height="45rem"
              alt=" "
              style={{ marginRight: "1rem" }}
            />
            </Grid>
            <Grid sx={{display: "flex", justifyContent: "flex-end", paddingTop: "10rem", paddingRight: "4rem"}}>
            <Paper elevation={4}
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              width: "24rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "3rem 2rem 3rem 2rem",
            }}
          >
            <Typography className="welcome">Welcome!</Typography>
            <Typography className="loginText">
            Please sign in to access
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
          </Stack>
           
        </Grid>
      </Grid>     
  );
};

export default LoginPage;
