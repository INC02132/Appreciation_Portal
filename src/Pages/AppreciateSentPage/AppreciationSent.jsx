import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { toPng } from "html-to-image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Alert, Paper, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { createRef, useCallback, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useMsal } from "@azure/msal-react";
import { TimeStampToDateString } from "../../Utils/TimeStampToString";
import { setSelectedNavIndex } from "../../redux/reducers/appReducer";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../Utils/serviceRequest";

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
  const [searchText, setSearchText] = useState("");

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
        setSentCard(res.data.data);
      }
    } catch (error) { }
  };
  const [selectedCard, setSelectedCard] = useState(null);
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: "calc(100vh - 52px)", width: "95%" }}>
      <Grid
        sx={{
          flexGrow: 1,
          marginLeft:"5%",
          justifyContent: "flexStart",
          gap:10,
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
            // className="wbScroll"
            elevation={6}
            sx={{
              height: "95%",
            }}
          >
            <Grid container gap={1} sx={{ height: '100%', padding: "1em 1em" }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "1em",
                }}
              >
                Appreciation Sent
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

              <Box className="wbScroll" sx={{
                height: "70%",
                overflowY: "scroll", padding: "1rem"
              }}>
                {sentCard?.map((item) => {
                  return (item.template?.category?.toLowerCase()
                    .includes(searchText?.toLowerCase()) ||
                    `${item.receiver?.firstName?.toLowerCase()} ${item.receiver?.lastName?.toLowerCase()}`
                      .includes(searchText?.toLocaleLowerCase())) && (
                      <AppreciationCard
                        cardData={item}
                        setSelectedCard={setSelectedCard}
                      />
                    );
                })}
              </Box>

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
            margin:"auto",
          }}
        >
          {selectedCard === null?<Typography sx={{
            fontSize:"18px"

          }}>Please select a card to view</Typography>:<>
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
                {selectedCard?.template?.header}{" "}
                {selectedCard?.receiver?.firstName}{" "}
                {selectedCard?.receiver?.lastName},
              </Typography>
              <Typography className="draggable">
                {selectedCard?.template?.basicMessage}{" "}
                {selectedCard?.updatedMessage}
              </Typography>
              <Typography className="draggable">
                {selectedCard?.template?.footer}
                <br />
                {accounts?.[0]?.name ?? ""}
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

function AppreciationCard({ cardData, setSelectedCard }) {
  const handleClick = () => {
    setSelectedCard(cardData);
  };
  return (
    <Card
      onClick={() => handleClick()}
      elevation={8}
      sx={{
        width: "16rem",
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
            To: {cardData?.receiver?.firstName} {cardData?.receiver?.lastName}
          </p>
        </div>
      </div>
    </Card>
  );
}
