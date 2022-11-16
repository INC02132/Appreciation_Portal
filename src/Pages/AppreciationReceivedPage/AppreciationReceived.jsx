import * as React from "react";
import { Box, Button, Paper, Typography, Grid, Alert, Snackbar } from "@mui/material";
import { createRef, useCallback, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useMsal } from "@azure/msal-react";
import { toPng } from "html-to-image";
import { useDispatch, useSelector } from "react-redux";
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
  const [count, setCount] = useState();

  const dispatch = useDispatch();
  dispatch(setSelectedNavIndex(1));
  const ref = createRef();

  const appReducer = useSelector(state => state.appReducer);

  const [pendingMessage, setpendingMessage] = useState(false);


  const handleCloseToastMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setpendingMessage(false);
  };

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
        setCount(res.data.count);
        let data = res.data.data;
        data?.forEach((element, index) => {
          let templateData = appReducer.templateData?.find(temp => temp.templateId===element.templateId);
          let obj = {...element, template:templateData};
          data[index]=obj;
        })
        setReceivedCard(data);
        // setCount(Object.keys(receivedCard).length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelection = (cardData) => {
    let templateData = appReducer.templateData?.find(element => element.templateId===cardData.templateId)
    if(!templateData) {
      setpendingMessage(true);
      return;
    }
    let obj = {...cardData, template: templateData};
    setSelectedCard(obj);
  }

  React.useEffect(() => {
    fetchData();
  }, [appReducer.templateData]);

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
              panelTitle={"Appreciation Received " + "(" + count + ")"}
              cards={receivedCard}
              setSelectedCard={handleCardSelection}
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
                <Box className="draggable" style={{
                  position: "relative",
                  transform: `${selectedCard?.position?.split(";")?.[1] ?? ""}`
                }}>
                  <Typography>
                    {selectedCard?.template?.header} {accounts?.[0]?.name ?? " "},
                  </Typography>
                </Box>
                <Box className="draggable" style={{
                  position: "relative",
                  transform: `${selectedCard?.position?.split(";")?.[1] ?? ""}`
                }}>
                  <Typography>
                    {selectedCard?.template?.basicMessage}{" "}
                    {selectedCard?.updatedMessage}
                  </Typography>
                </Box>
                <Box className="draggable" style={{
                  position: "relative",
                  transform: `${selectedCard?.position?.split(";")?.[1] ?? ""}`
                }}>
                  <Typography>
                    {selectedCard?.template?.footer}
                    <br />
                    {selectedCard?.sender?.firstName}{" "}
                    {selectedCard?.sender?.lastName}
                  </Typography>
                </Box>
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
          <Snackbar
          open={pendingMessage}
          autoHideDuration={6000}
          onClose={handleCloseToastMessage}
        >
          <Alert
            onClose={handleCloseToastMessage}
            severity="error"
            sx={{ width: "100%", color: "#fff", backgroundColor: "red" }}
          >
            Template Loading Please Wait...
          </Alert>
        </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
}