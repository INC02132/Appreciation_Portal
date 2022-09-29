import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardHeader } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { createRef, useCallback, useState } from "react";


const handleCilck= () =>{
  <img
              height={"500px"}
              src="../Assests/Slide1.jpg"
              alt="Certificate"
            />
}

export default function AppreciationReceived() {
  return (
    <Grid container>
      <Grid item md={5} style={{ padding: "16px" }}>
        <Card
          sx={{
            width: "350px",
            height: "600px",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Appreciation Received(4)
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: 2,
              marginLeft: "25px",
              width: "300px",
              borderColor: "#D9D9D9",
              borderRadius: "7px",
              padding: "0rem",
            }}
          >
            <TextField
              sx={{ paddingLeft: "0.5rem" }}
              id="input-with-sx"
              variant="standard"
              placeholder="Search"
              fullWidth
              focused={false}
              InputProps={{ disableUnderline: true }}
            />
            <IconButton disableRipple>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}

          <Card
            elevation={8}
            sx={{
              width: "300px",
              height: "107px",
              borderRadius: "10px",
              marginLeft: "25px",
              marginTop: "20px",
              color: "#002947",
              backgroundColor: "#EAF2F9",
              "& :hover": {
                backgroundColor: "#002947",
                color: "white",
              },
              "& :active": {
                backgroundColor: "#002947",
                color: "white",
              },
            }}
          >
            <div
              style={{
                height: "100%",
              }}
            >
              <p
                style={{
                  textAlign: "right",
                  fontWeight: "400px",
                  fontSize: "0.9rem",
                  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                }}
              >
                26th September, 2022
              </p>

              <div style={{ marginLeft: "1rem", marginTop: "1.1rem" }}>
                <p
                  style={{
                    fontWeight: "600px",
                    fontSize: "1.3rem",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                  }}
                >
                  Customer Centricity
                </p>

                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "400px",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    marginTop: "0.3rem",
                  }}
                >
                  From: Silpa Shree Mohanty
                </p>
              </div>
            </div>
          </Card>
          <Card
            elevation={8}
            sx={{
              width: "300px",
              height: "107px",
              borderRadius: "10px",
              marginLeft: "25px",
              marginTop: "20px",
              color: "#002947",
              backgroundColor: "#EAF2F9",
              "& :hover": {
                backgroundColor: "#002947",
                color: "white",
              },
              "& :active": {
                backgroundColor: "#002947",
                color: "white",
              },
            }}
          >
            <div
              style={{
                height: "100%",
              }}
            >
              <p
                style={{
                  textAlign: "right",
                  fontWeight: "400px",
                  fontSize: "0.9rem",
                  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                }}
              >
                26th September, 2022
              </p>

              <div style={{ marginLeft: "1rem", marginTop: "1.1rem" }}>
                <p
                  style={{
                    fontWeight: "600px",
                    fontSize: "1.3rem",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                  }}
                >
                  Customer Centricity
                </p>

                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "400px",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    marginTop: "0.3rem",
                  }}
                >
                  From: Silpa Shree Mohanty
                </p>
              </div>
            </div>
          </Card>
          <Card
            elevation={8}
            sx={{
              width: "300px",
              height: "107px",
              borderRadius: "10px",
              marginLeft: "25px",
              marginTop: "20px",
              color: "#002947",
              backgroundColor: "#EAF2F9",
              "& :hover": {
                backgroundColor: "#002947",
                color: "white",
              },
              "& :active": {
                backgroundColor: "#002947",
                color: "white",
              },
            }}
          >
            <div
              style={{
                height: "100%",
              }}
            >
              <p
                style={{
                  textAlign: "right",
                  fontWeight: "400px",
                  fontSize: "0.9rem",
                  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                }}
              >
                26th September, 2022
              </p>

              <div style={{ marginLeft: "1rem", marginTop: "1.1rem" }}>
                <p
                  style={{
                    fontWeight: "600px",
                    fontSize: "1.3rem",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                  }}
                >
                  Customer Centricity
                </p>

                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "400px",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    marginTop: "0.3rem",
                  }}
                >
                  From: Silpa Shree Mohanty
                </p>
              </div>
            </div>
          </Card>
          <Card onClick={handleCilck}
            elevation={8}
            sx={{
              width: "300px",
              height: "107px",
              borderRadius: "10px",
              marginLeft: "25px",
              marginTop: "20px",
              color: "#002947",
              backgroundColor: "#EAF2F9",
              "& :hover": {
                backgroundColor: "#002947",
                color: "white",
              },
              "& :active": {
                backgroundColor: "#002947",
                color: "white",
              },
            }}
          >
            <div
              style={{
                height: "100%",
              }}
            >
              <p
                style={{
                  textAlign: "right",
                  fontWeight: "400px",
                  fontSize: "0.9rem",
                  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                }}
              >
                26th September, 2022
              </p>

              <div style={{ marginLeft: "1rem", marginTop: "1.1rem" }}>
                <p
                  style={{
                    fontWeight: "600px",
                    fontSize: "1.3rem",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                  }}
                >
                  Customer Centricity
                </p>

                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "400px",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    marginTop: "0.3rem",
                  }}
                >
                  From: Silpa Shree Mohanty
                </p>
              </div>
            </div>
          </Card>
        </Card>
      </Grid>
          <Grid item md={7} style={{ padding: "16px" }}>
    <img
              height={"500px"}
              src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=916&q=80"
              alt="Certificate"
            />
    </Grid>
    </Grid> 

   
  );
}
