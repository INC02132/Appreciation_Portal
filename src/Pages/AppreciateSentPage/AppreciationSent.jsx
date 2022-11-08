import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { toPng } from "html-to-image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { createRef, useCallback, useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useMsal } from "@azure/msal-react";
import { TimeStampToDateString } from "../../Utils/TimeStampToString";
import { setSelectedNavIndex } from "../../redux/reducers/appReducer";
import { useDispatch } from "react-redux";
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

export default function AppreciationSent() {
  const { accounts } = useMsal();
  const [sentCard, setSentCard] = useState(null);
  const [count, setCount] = useState();

  const dispatch = useDispatch();

  dispatch(setSelectedNavIndex(2));
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
        `${baseUrl}/appreciation/getAppreciationBySenderId?senderId=${accounts[0]?.username ?? ""
        }`
      );
      if (res.status === 200) {
        setCount(res.data.count);
        setSentCard(res.data.data);
      }
    } catch (error) { }
  };
  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

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
              panelTitle={"Appreciation Sent " + "(" + count + ")"}
              cards={sentCard}
              setSelectedCard={setSelectedCard}
              type={"To"}
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
                  transform: `${selectedCard?.position?.split(";")?.[0]??""}`
                }}>
                  <Typography>
                    {selectedCard?.template?.header}{" "}
                    {selectedCard?.receiver?.firstName}{" "}
                    {selectedCard?.receiver?.lastName},
                  </Typography>
                </Box>
                <Box className="draggable" style={{
                  position: "relative",
                  transform: `${selectedCard?.position?.split(";")?.[1]??""}`
                }}>
                  <Typography>
                    {selectedCard?.template?.basicMessage}{" "}
                    {selectedCard?.updatedMessage}
                  </Typography>
                </Box>
                <Box className="draggable" style={{
                  position: "relative",
                  transform: `${selectedCard?.position?.split(";")?.[2]??""}`
                }}>
                  <Typography>
                    {selectedCard?.template?.footer}
                    <br />
                    {accounts?.[0]?.name ?? ""}
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
        </Grid>
      </Grid>
    </Box>
  );
}
