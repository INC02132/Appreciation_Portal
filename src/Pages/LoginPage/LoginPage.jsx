import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Utils/authConfig";
import { useState } from 'react';
import "./LoginPage.css";

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
        <Grid container component="main" sx={{ height: '100vh' }} className="login_page">
            <CssBaseline />
            <Grid item md={6} sm={6} square>
                <div className="logo">
                    <img src="./logo.png" height="45rem" alt=" " style={{marginLeft: "1rem"}}/>
                </div>
                <Box
                    sx={{
                        my: 23,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',                        
                    }} >
                    <Typography className="welcome">
                        Welcome!
                    </Typography>
                    <Typography className="loginText">
                        Please login to your account to continue
                    </Typography>
                    <Button type="submit" variant="contained" onClick={() => handleLogin(instance)}
                            sx={{ mt: 3, mb: 2, backgroundColor: "#002947",
                            '&:hover': {
                                backgroundColor: "#011828",
                              } }}>
                                Login
                            </Button>
                </Box>
            </Grid>
            <Grid item md={6} sm={6} className="coverImage" sx={{
                backgroundImage: 'url(https://img.freepik.com/free-photo/business-people-clapping-hands-together_53876-14938.jpg?w=740&t=st=1665487416~exp=1665488016~hmac=8138666442a8ca8d7a2642d538af3bc82f11ae92cc5104628f97d52415fb1db0)',
            }} />
        </Grid>
        
    );
};

export default LoginPage;