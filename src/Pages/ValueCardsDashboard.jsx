import {
  Stack,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";

function ValueCards({ template }) {
  return (
    <div>
      <Card sx={{height: "10rem"}}>
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
            <CardContent sx={{ flex: "1 0 auto", paddingTop: "0",
                  textAlign: "justify",
                  textJustify: "inter-word", }} >
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

function ValueCardsDashboard({ templateData = [], setSelectedTemplate }) {

  return (
    <div>
      <Box className="wbScroll" sx={{ height: "calc(100vh - 52px)" }}>
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
            {
              templateData.map((template) => {
                return (
                  <Grid key={template.templateId} item md={3} sx={{ cursor: "pointer" }} onClick={() => setSelectedTemplate(template)}>
                    <ValueCards template={template} />
                  </Grid>)
              })
            }
          </Grid>
        </Stack>
      </Box>
    </div>
  );
}

export default ValueCardsDashboard;
