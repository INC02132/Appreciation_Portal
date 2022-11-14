import { createRef, useCallback, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setSelectedNavIndex } from '../../redux/reducers/appReducer';
import { useMsal } from "@azure/msal-react";
import { baseUrl } from "../../Utils/serviceRequest";
import axios from "axios";
import { toPng } from "html-to-image";
import { Alert, Box, Button, ButtonGroup, Grid, Paper, Snackbar, styled, TextField, Typography } from "@mui/material";
import CardPanel from "../../Components/CardPanel/CardPanel";
import CommentDialog from "../AllAppreciationPage/CommentDialog";

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



const AllAppreciationPage = () => {
  const { accounts } = useMsal();
  const [allCard, setallCard] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  dispatch(setSelectedNavIndex(5));
  const ref = createRef();

  const statusHandler = (_status) => {
    setPageNumber(1);
    setallCard([]);
    if (_status === "all") _status = "";
    setStatus(_status);
  }

  const [successMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);


  const handleCloseToastMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(false);
    setFailureMessage(false);
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
      let url = "";
      if (status === "") {
        url = `${baseUrl}/appreciation/getAllAppreciation/8/${pageNumber}/${status}`
      } else {
        url = `${baseUrl}/appreciation/getAppreciationByStatus/8/${pageNumber}/${status}`
      }
      let res = await axios.get(url);
      if (res.data.result === "success") {
        console.log(res.data.data)
        setallCard(prevState => [...prevState, ...res.data.data]);
        setPageNumber(prev => prev + 1)
      }
    } catch (error) {
      console.error(error)
    }
  };
  const [selectedCard, setSelectedCard] = useState(null);

  const changeStatus = async (_status) => {
    let url = `${baseUrl}/appreciation/updateStatus/${selectedCard.valueCardId}?status=${_status}`;
    try {
      let res = await axios.put(url);
      if (res.data.result === "success") {
        setSelectedCard({...selectedCard, status: _status})
        setSuccessMessage(true);
        console.log(res)
      } else {
        setFailureMessage(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [status]);
  
  const [open, setOpen] = useState(false);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleReject = () => {
    changeStatus("rejected");
  };

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
            <CardPanel statusHandler={statusHandler} fetchData={fetchData} panelTitle={"All Appreciation"} cards={allCard} setSelectedCard={setSelectedCard} />
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
                  transform: `${selectedCard?.position?.split(";")?.[0] ?? ""}`
                }}>
                  <Typography>
                    {selectedCard?.template?.header} {selectedCard?.receiver?.firstName ?? " "} {selectedCard?.receiver?.lastName ?? ""},
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
                  transform: `${selectedCard?.position?.split(";")?.[2] ?? ""}`
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
            <ButtonGroup>

              <Button onClick={() => onButtonClick()} variant="contained" sx={{ marginRight: "3rem", marginTop: "1rem", textTransform: "none", fontWeight: "400" }}>
                Download
              </Button>
              {
                selectedCard.status === "approved" &&
                <ButtonGroup>
                  <Button variant="contained" sx={{ backgroundColor: "red", marginTop: "1rem", textTransform: "none", fontWeight: "400"}} onClick={() => changeStatus("rejected")}>
                    Reject
                  </Button>
                </ButtonGroup>
              }
              {
                selectedCard.status === "pending" &&
                <>
                <ButtonGroup>
                  <Button variant="contained" sx={{ backgroundColor: "green", marginTop: "1rem", textTransform: "none", fontWeight: "400"}} onClick={() => changeStatus("approved")}>
                    Approve
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: "red", marginTop: "1rem", textTransform: "none", fontWeight: "400"}} onClick={handleClickOpenDialog}>
                    Reject
                  </Button>
                  <CommentDialog open={open} setOpen={setOpen} handleCloseDialog={handleCloseDialog} handleClickOpenDialog={handleClickOpenDialog} handleReject={handleReject}/>
                </ButtonGroup>
                </>
              }
              {
                selectedCard.status === "rejected" &&
                <ButtonGroup>
                  <Button variant="contained" sx={{  backgroundColor: "green", marginTop: "1rem", textTransform: "none", fontWeight: "400"}} onClick={() => changeStatus("approved")}>
                    Approve
                  </Button>
                </ButtonGroup>
              }
            </ButtonGroup>
          </>}
        </Grid>
        <Snackbar
          open={successMessage}
          autoHideDuration={6000}
          onClose={handleCloseToastMessage}
        >
          <Alert
            onClose={handleCloseToastMessage}
            severity="success"
            sx={{ width: "100%", color: "#fff", backgroundColor: "#138019" }}
          >
            Status changed successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={failureMessage}
          autoHideDuration={6000}
          onClose={handleCloseToastMessage}
        >
          <Alert
            onClose={handleCloseToastMessage}
            severity="error"
            sx={{ width: "100%", color: "#fff", backgroundColor: "red" }}
          >
            Some error occured!
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  )
}

export default AllAppreciationPage