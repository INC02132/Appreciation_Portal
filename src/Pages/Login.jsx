import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Utils/authConfig";

function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch((e) => {
        console.error(e);
    });
}

const toolbarStyle = {
    minHeight: "52px",
};

const Login = () => {
    const { instance } = useMsal();


    const [toggleState, setToggleState] = useState(false);
    const handleToggle = () => {
        setToggleState(true);
    };
    const handleRemoveToggle = () => {
        setToggleState(false);
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    className="incture-logo"
                    style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
                >
                    <img src={""} alt=" " height="38vh" width="auto" />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100vh - 52px)",
                    }}
                >
                    <img src={""} height="80%" width="40%"></img>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                            height: "calc(100vh - 52px)",
                        }}
                    >
                        
                        <Button
                            style={{
                                width: "20%",
                                backgroundColor: "#3026B9",
                                color: "#fff",
                            }}
                            variant="contained"
                            onClick={() => handleLogin(instance)}
                        >
                            LogIn
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
