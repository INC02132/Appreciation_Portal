import * as React from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { createRef, useCallback, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useMsal } from "@azure/msal-react";
import { toPng } from "html-to-image";
import { useDispatch } from "react-redux";
import { setSelectedNavIndex } from "../../redux/reducers/appReducer";
import { baseUrl } from "../../Utils/serviceRequest";
import CardPanel from "../../Components/CardPanel/CardPanel";

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

  const dispatch = useDispatch();
  dispatch(setSelectedNavIndex(1));
  const ref = createRef();

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const fetchData = async () => {
    try {
      let res = await axios.get(
        `${baseUrl}/appreciation/getAppreciationReceivedById?receiverId=${accounts[0]?.username ?? ""
        }`
      );
      if (res.status === 200) {
        setReceivedCard(res.data.data);
        // setCount(Object.keys(receivedCard).length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedCard, setSelectedCard] = useState(null);

  React.useEffect(() => {
    fetchData();
  }, [accounts]);

  return (
    <Box sx={{ height: "calc(100vh - 52px)", width: "95%" }}>
      <Grid
        sx={{
          flexGrow: 1,
          marginLeft: "5%",
          justifyContent: "flexStart",
          gap: 10,
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
            elevation={6}
            sx={{
              height: "95%",
            }}
          >
            <CardPanel
              panelTitle={"Appreciation Received"}
              cards={receivedCard}
              setSelectedCard={setSelectedCard}
              type={"From"}
            />
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
            margin: "auto",

          }}
        >
          {selectedCard === null ? <Typography sx={{
            fontSize: "18px"

          }}>Please select a card to view</Typography> : <>
            <StyledCertificate ref={ref}>
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
            <Button onClick={() => onButtonClick()} variant="contained" sx={{ marginTop: "1rem", textTransform: "none", fontWeight: "400" }}>
              Download
            </Button>
          </>}
        </Grid>
      </Grid>
    </Box>
  );
}