import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Alert, CardHeader, Paper, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { createRef, useCallback, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useMsal } from "@azure/msal-react";
import { TimeStampToDateString } from "../Utils/TimeStampToString";

const StyledCertificate = styled(Paper)(({ theme }) => ({
  boxShadow: "0 0 5px #000",
  borderRadius: "0px",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export default function AppreciationReceived() {
  const { accounts } = useMsal();
  const [receivedCard, setReceivedCard] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [toastMessage, setToastMessage] = useState(false);
  const handleCloseToastMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastMessage(false);
  };

  const fetchData = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8080/appreciation/getAppreciationReceivedById?receiverId=${
          accounts[0]?.username ?? ""
        }`
      );
      if (res.status === 200) {
        setReceivedCard(res.data.data);
      }
    } catch (error) {}
  };

  const [selectedCard, setSelectedCard] = useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: "calc(100vh - 52px)" }}>
      <Grid
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        container
        gap={8}
      >
        <Grid
          item
          xs={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            className="wbScroll"
            elevation={6}
            sx={{
              height: "95%",
              overflow: "auto",
            }}
          >
            <Grid container gap={1} sx={{ padding: "1em 1em" }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "1em",
                }}
              >
                Appreciation Received
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: 1,
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
                  onChange={(e) => setSearchText(e.target.value)}
                  InputProps={{ disableUnderline: true }}
                />
                <IconButton disableRipple>
                  <SearchIcon />
                </IconButton>
              </Box>

              {receivedCard?.map((item) => {
                // return (
                //   (searchText
                //     .toLowerCase()
                //     .includes(item.template?.category?.toLowerCase()) ||
                //     searchText
                //       .toLowerCase()
                //       .includes(item.sender?.firstName?.toLowerCase)) && (
                //     <AppreciationCard
                //       cardData={item}
                //       setSelectedCard={setSelectedCard}
                //     />
                //   )
                // );
                return (
                  <AppreciationCard
                      cardData={item}
                      setSelectedCard={setSelectedCard}
                    />
                );
              })}
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledCertificate>
            <Box
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                display: "flex",
                gap: "2em",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography className="draggable">
                {selectedCard?.template?.header} {accounts?.[0]?.name ?? " "},
              </Typography>
              <Typography className="draggable">
                {selectedCard?.template?.basicMessage}{" "}
                {selectedCard?.updatedMessage}
              </Typography>
              <Typography className="draggable">
                {selectedCard?.template?.footer}
                <br />
                {selectedCard?.sender?.firstName}{" "}
                {selectedCard?.sender?.lastName}
              </Typography>
            </Box>
            <img
              height={"500px"}
              src={`data:image/png;base64,${selectedCard?.template?.templateFile}`}
              alt="Certificate"
            />
          </StyledCertificate>
          <Button variant="contained" sx={{ marginTop: "1rem" }}>
            Download
          </Button>
        </Grid>

        <Snackbar
          open={toastMessage}
          autoHideDuration={6000}
          onClose={handleCloseToastMessage}
        >
          <Alert
            onClose={handleCloseToastMessage}
            severity="success"
            sx={{ width: "100%", color: "#fff", backgroundColor: "#138019" }}
          >
            Value Card downloaded successfully!
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
}

function AppreciationCard({ cardData, setSelectedCard }) {
  const handleClick = () => {
    setSelectedCard(cardData);
  };
  return (
    <Card
      onClick={() => handleClick()}
      elevation={8}
      sx={{
        width: "300px",
        height: "107px",
        borderRadius: "10px",
        marginTop: "10px",
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
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: "100%",
          padding: "1rem",
        }}
      >
        <p
          style={{
            textAlign: "right",
            fontSize: "0.8rem",
          }}
        >
          {TimeStampToDateString(cardData?.date)}
        </p>

        <div style={{ marginTop: "1.1rem" }}>
          <p
            style={{
              fontWeight: "500",
              fontSize: "1rem",
            }}
          >
            {cardData?.template?.category}
          </p>

          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: "400",
              marginTop: "0.1rem",
            }}
          >
            From: {cardData?.sender?.firstName} {cardData?.sender?.lastName}
          </p>
        </div>
      </div>
    </Card>
  );
}
