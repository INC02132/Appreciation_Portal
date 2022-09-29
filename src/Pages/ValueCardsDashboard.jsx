import {
  Stack,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React from "react";

function ValueCards() {
  return (
    <div>
      <Card>
        <Typography
          variant="h5"
          sx={{
            fontSize: "1rem",
            fontWeight: "500",
            margin: "1rem 1rem 0 1rem",
          }}
        >
          Customer Centricity
        </Typography>
        <Grid container sx={{ display: "flex" }}>
          <Grid item md={7}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle"
                sx={{
                  fontSize: "0.8rem",
                  color: "#263238",
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                Putting the customer first and at the center of everything that
                you do.
              </Typography>
            </CardContent>
          </Grid>
          <Grid item md={5} sx={{ margin: "auto" }}>
            <img
              width="95%"
              src="../Logos/Customer Centricity.png"
              alt="Customer Centricity"
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

function ValueCardsDashboard() {
  return (
    <div>
      <Box sx={{ height: "calc(100vh - 52px)" }}>
        <Stack spacing={3} sx={{ margin: "1rem 0 0 1rem" }}>
          <Grid container gap={2}>
            <Typography
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
            </Typography>
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
            <Grid item md={3}>
              <ValueCards />
            </Grid>
            <Grid item md={3}>
              <ValueCards />
            </Grid>
            <Grid item md={3}>
              <ValueCards />
            </Grid>
            <Grid item md={3}>
              <ValueCards />
            </Grid>
            <Grid item md={3}>
              <ValueCards />
            </Grid>
            <Grid item md={3}>
              <ValueCards />
            </Grid>
            <Grid item md={3}>
              <ValueCards />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </div>
  );
}

export default ValueCardsDashboard;
