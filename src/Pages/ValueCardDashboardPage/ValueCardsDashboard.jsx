import { EmojiEvents } from "@mui/icons-material";
import {
  Stack,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  ListItem,
  List,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";

function ValueCards({ template }) {
  return (
    <div>
      <Card id="value-card" sx={{ height: "10rem", border: 1, borderColor: "#007AD4" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "1rem",
            fontWeight: "500",
            margin: "1rem 1rem 0 1rem",
            color: "#007AD4"
          }}
        >
          {template.category}
        </Typography>
        <Grid container sx={{ display: "flex", paddingTop: "0" }}>
          <Grid item md={7}>
            <CardContent sx={{
              flex: "1 0 auto", paddingTop: "0",
              textAlign: "left",
            }} >
              <Typography
                variant="subtitle"
                sx={{
                  fontSize: "0.8rem",
                  color: "#263238",
                }}
              >
                {template.description}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item md={5} sx={{ margin: "auto", paddingRight: "0.5rem" }}>
            <img
              width="100%"
              src={`data:image/png;base64,${template?.logo}`}
              alt={template?.category ?? "Category"}
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

function ValueCardsDashboard({ setSelectedTemplate }) {

  const templateData = useSelector(state => state.appReducer.templateData);
  const leaderBoardData = useSelector(state => state.appReducer.leaderBoardData);
  return (
    <div>
      <Box className="wbScroll" sx={{ height: "calc(100vh - 52px)" }}>
        <Stack spacing={3} sx={{ margin: "1rem 0 0 1rem" }}>
          <Grid sx={{ height: "230px" }} container gap={2}>
            <Grid sx={{ height: "100%" }} item>
              <Paper sx={{ height: "100%", width: "15.5rem", backgroundColor: "#ddd", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box style={{ transform: "rotate(-35deg)", position: "absolute", top: "-16px", left: "-10px" }}>
                  <EmojiEvents sx={{ color: "#ff900d", fontSize: "40px" }} />
                  <Typography sx={{color: "orange"}}>Rank #1</Typography>
                </Box>
                {
                  leaderBoardData.length > 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0em", paddingTop: "1.5rem" }}>
                      <Avatar sx={{ height: '40px', width: '40px', fontSize: '14px', marginBottom: "1rem", backgroundColor: "#007AD4" }}>{leaderBoardData?.[0]?.[1]?.firstName?.[0]}{leaderBoardData?.[0]?.[1]?.lastName?.[0]}</Avatar>
                      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                          <Typography sx={{ fontSize: "30px", fontWeight: "bold", color: "#007AD4" }}>
                            {leaderBoardData?.[0]?.[0]}
                          </Typography>
                          <Typography sx={{ fontSize: "14px" }}>
                            Value Cards
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "1.2rem", color: "#007AD4", fontWeight: "bold" }}>
                          {leaderBoardData?.[0]?.[1]?.firstName} {leaderBoardData?.[0]?.[1]?.lastName}
                        </Typography>
                        <Typography sx={{ fontSize: "1rem" }}>
                          {leaderBoardData?.[0]?.[1]?.emailId}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0em", paddingTop: "1.5rem" }}>
                      <Avatar sx={{ height: '40px', width: '40px', fontSize: '14px', borderRadius: "50%", marginBottom: "1rem" }}></Avatar>
                      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                          <Skeleton height={40} width={30} />
                          <Skeleton height={20} width={80} />
                        </Box>
                        <Skeleton height={25} width={170} />
                        <Skeleton height={22} width={170} />
                      </Box>
                    </Box>
                  )
                }
              </Paper>
            </Grid>
            <Grid item flex={1} sx={{ height: "100%", paddingRight: "1rem" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#002947" }}>
                Leaderboard
              </Typography>
              <List sx={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "stretch", alignContent: "stretch" }}>
                <Paper elevation={0} sx={{ backgroundColor:"#ddd", padding: "0.2em", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ width: "20%" }}>
                    <Typography sx={{ fontWeight: "bold"}}>
                      Rank
                    </Typography>
                  </Box>
                  <Box sx={{ width: "25%" }}>
                    <Typography sx={{ fontWeight: "bold"}}>
                      Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "35%" }}>
                    <Typography sx={{ fontWeight: "bold"}}>
                      Email
                    </Typography>
                  </Box>
                  <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ fontWeight: "bold"}}>
                      Total Cards
                    </Typography>
                  </Box>
                </Paper>
                {
                  leaderBoardData?.map((leader, index) => {
                    let count = leader[0];
                    let detail = leader[1];
                    if (index === 0) return;
                    return (
                      <Paper key={index} sx={{ backgroundColor: index%2===1 ? "#fff": "#ddd", padding: "0.2em", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ width: "20%" }}>
                          <Typography sx={{ fontWeight: "bold", color: "#007AD4" }}>
                            #{index + 1}
                          </Typography>
                        </Box>
                        {/* <Box sx={{flex: "1", display: "flex", gap: "10px"}}> */}
                        <Box sx={{ width: "25%" }}>
                          <Typography>
                            {detail?.firstName} {detail?.lastName}
                          </Typography>
                        </Box>
                        <Box sx={{ width: "35%" }}>
                          <Typography>
                            {detail?.emailId}
                          </Typography>
                        </Box>
                        <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
                          <Typography>
                            {count}
                          </Typography>
                        </Box>
                      </Paper>
                    )
                  })
                }
                {
                  leaderBoardData.length === 0 && [...Array(4).keys()].map((arr, index) => (
                    <Paper key={index} sx={{ padding: "0.2em", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Skeleton height={"100%"} width={"100%"} />
                    </Paper>
                  ))
                }
              </List>
            </Grid>
          </Grid>
          <Grid>
            <Typography
              variant="h5"
              sx={{ fontWeight: "600", color: "#002947" }}
            >
              Choose a Value Card to send
            </Typography>
            <Typography variant="body" sx={{ fontSize: "0.9rem" }}>
              Appreciate your peers by sending them a value card
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ width: "97.5%" }}>
            {
              templateData.map((template) => {
                return (
                  <Grid key={template.templateId} item md={3} sx={{ cursor: "pointer" }} onClick={() => setSelectedTemplate(template)}>
                    <ValueCards template={template} />
                  </Grid>)
              })
            }
            {
              templateData.length === 0 &&
              <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <RotatingLines
                  strokeColor="#002947"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="70"
                  visible={true}
                />
                <Typography>Loading...</Typography>
              </Box>
            }
          </Grid>
        </Stack>
      </Box>
    </div>
  );
}

export default ValueCardsDashboard;
