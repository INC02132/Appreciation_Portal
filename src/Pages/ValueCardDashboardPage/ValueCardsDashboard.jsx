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
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";

function ValueCards({ template }) {
  return (
    <div>
      <Card sx={{ height: "10rem" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "1rem",
            fontWeight: "500",
            margin: "1rem 1rem 0 1rem",
          }}
        >
          {template.category}
        </Typography>
        <Grid container sx={{ display: "flex", paddingTop: "0" }}>
          <Grid item md={7}>
            <CardContent sx={{
              flex: "1 0 auto", paddingTop: "0",
              textAlign: "justify",
              textJustify: "inter-word",
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

  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const fetchLeaderBoardData = async () => {
    try {
      let res = await axios.get("https://apprservice.practicei.xyz/appreciation/getTopUserCount");
      if (res.status === 200) {
        setLeaderBoardData(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchLeaderBoardData();
  }, [])



  return (
    <div>
      <Box className="wbScroll" sx={{ height: "calc(100vh - 52px)" }}>
        <Stack spacing={3} sx={{ margin: "1rem 0 0 1rem" }}>
          <Grid container gap={2}>
            {/* <Typography
              variant="h5"
              sx={{ fontWeight: "600", color: "#002947" }}
            >
              Incture Value Cards
            </Typography>
            <Typography variant="body" sx={{ fontSize: "0.9rem" }}>
              A form of employee recognition where you recognize exemplary
              performance or behavior as and when it happens. The main purpose
              of Value based recognition is to let employees know that you have
              noticed their efforts. At the same time, it reinforces the values
              that are important to our organization.
              <br></br>
              It is called as <b>"Value based recognition"</b> because they are
              given basis the organizational values displayed by an employee in
              his/her day-to-day work.
            </Typography> */}
            <Grid item>

              <Paper sx={{ height: "100%", width: "280px", position: "relative" }}>
                <EmojiEvents sx={{ color: "#ff900d", fontSize: "40px" }} style={{ transform: "rotate(-25deg)", position: "absolute", top: "-10px", left: "-10px" }} />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0.5em" }} style={{ position: "absolute", top: "0", left: "0" }}>

                  <Avatar sx={{ height: '40px', width: '40px', fontSize: '14px', marginBottom: "1rem" }}>{leaderBoardData?.[0]?.[1]?.firstName?.[0]}{leaderBoardData?.[0]?.[1]?.lastName?.[0]}</Avatar>
                  <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                      {/* <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}> */}
                      <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                        {leaderBoardData?.[0]?.[0]}
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Value Cards
                      </Typography>
                      {/* </Paper> */}
                    </Box>
                    <Typography>
                      Name: {leaderBoardData?.[0]?.[1]?.firstName} {leaderBoardData?.[0]?.[1]?.lastName}
                    </Typography>
                    <Typography>
                      Email: {leaderBoardData?.[0]?.[1]?.emailId}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item flex={1} sx={{paddingRight: "1rem"}}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                Leaderboard
              </Typography>
              <List sx={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "stretch", alignContent: "stretch" }}>
                {
                  leaderBoardData?.map((leader, index) => {
                    let count = leader[0];
                    let detail = leader[1];
                    if (index === 0) return (
                      <Paper elevation={0} sx={{ padding: "0.2em", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{width: "20%"}}>
                          <Typography>
                            Rank
                          </Typography>
                        </Box>
                        <Box sx={{width: "25%"}}>
                          <Typography>
                            Name
                          </Typography>
                        </Box>
                        <Box sx={{width: "35%"}}>
                          <Typography>
                            Email
                          </Typography>
                        </Box>
                        <Box sx={{width: "20%", display: "flex", justifyContent: "center"}}>
                          <Typography>
                            Total Cards
                          </Typography>
                        </Box>
                      </Paper>
                    );
                    return (
                      <Paper sx={{ padding: "0.2em", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{width: "20%"}}>
                        <Typography>
                          #{index+1}
                        </Typography>
                      </Box>
                      {/* <Box sx={{flex: "1", display: "flex", gap: "10px"}}> */}
                      <Box sx={{width: "25%"}}>
                        <Typography>
                          {detail?.firstName} {detail?.lastName}
                        </Typography>
                      </Box>
                      <Box sx={{width: "35%"}}>
                        <Typography>
                          {detail?.emailId}
                        </Typography>
                      </Box>
                      <Box sx={{width: "20%", display: "flex", justifyContent: "center"}}>
                        <Typography>
                          {count}
                        </Typography>
                      </Box>
                    </Paper>
                    )
                  })
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
