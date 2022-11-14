import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, {
  createRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import "./PreviewPage.css";
import { useMsal } from "@azure/msal-react";
import AutoCompleteSearch from "../../Components/SearchComponent/AutoCompleteSearch";
import axios from "axios";
import { ArrowBackIos } from "@mui/icons-material";
import { baseUrl } from "../../Utils/serviceRequest";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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

const PreviewPage = ({ selectedTemplate, showDashBoard }) => {
  const ref = createRef();
  const templateData = useSelector(state => state.appReducer.templateData);


  const [certificateData, setCertificateData] = useState({
    type: selectedTemplate.category,
    name: selectedTemplate.category,
    image: selectedTemplate.templateFile,
    header: selectedTemplate.header,
    footer: selectedTemplate.footer,
    templateId: selectedTemplate.templateId,
    basicMessage: selectedTemplate.basicMessage
  });

  //position state for text components(draggable)
  const [headerPosition, setHeaderPosition] = useState("");
  const [bodyPosition, setBodyPosition] = useState("");
  const [footerPosition, setFooterPosition] = useState("");

  // const [templateDataList, setTemplateDataList] = useState(templateData)

  //Name field states
  const [name, setName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  //Message field states
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState(false);


  const { accounts } = useMsal();

  const header = useRef();
  const body = useRef();
  const footer = useRef();

  const handleAppreciation = () => {
    const valueCard = {
      updatedMessage: message,
      senderEmail: accounts[0].username,
      receiverEmail: receiverEmail,
      templateId: certificateData.templateId,
      status: "pending",
      position: `${headerPosition};${bodyPosition};${footerPosition}`
    };



    fetch(`${baseUrl}/appreciation/sendValueCard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valueCard),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.result === "success") {
          setSuccessMessage(true);
        } else {
          setFailureMessage(true);
        }
        console.log(data);
      });
  };

  const handleCloseToastMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage(false);
    setFailureMessage(false);
  };

  const handleChange = (e) => {
    let temp = templateData.filter((x) => x.category === e.target.value)[0];
    setCertificateData({
      ...certificateData,
      type: temp.category,
      name: temp.category,
      image: temp.templateFile,
      header: temp.header,
      footer: temp.footer,
      basicMessage: temp.basicMessage,
      templateId: temp.templateId
    });
  };

  const handleChangeSearch = async (value) => {
    try {
      let data = await (
        await axios.get(
          `${baseUrl}/appreciation/getUserByParams?param=${value}`
        )
      ).data;
      if (data) {
        setUserSearchData(data?.data ?? []);
      }
    } catch (error) { }
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const constraintsRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [userSearchData, setUserSearchData] = useState([]);

  const optimizedFn = useCallback(debounce(handleChangeSearch), []);


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
          <Box sx={{display: 'flex', alignItems: "start"}}>
            <IconButton onClick={() => showDashBoard(false)}>
              <ArrowBackIos />
            </IconButton>

            <Paper
              className="wbScroll"
              elevation={6}
              sx={{
                height: "95%",
                overflow: "auto",
              }}
            >
              <Grid container gap={1} sx={{ padding: "2em 2em" }}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      margin: "0.5em 0",
                    }}
                  >
                    Value Card Category
                  </Typography>
                  <FormControl sx={{ width: "100%" }} size="small">
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={certificateData.name}
                      onChange={handleChange}
                    >
                      {templateData?.map((template) => (
                        <MenuItem
                          key={template.category}
                          value={template?.category ?? ""}
                        >
                          {template?.category ?? ""}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: "1em" }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      margin: "0.5em 0",
                    }}
                  >
                    Add Details
                  </Typography>

                  <FormControl>
                    <Typography style={{ fontSize: "1rem" }}>Name</Typography>
                    <AutoCompleteSearch
                      autoCompleteonChange={(val) => {
                        setName(`${val["firstName"]} ${val["lastName"]}`);
                        setReceiverEmail(val.emailId);
                      }}
                      textOnChange={(val) => optimizedFn(val)}
                      options={userSearchData}
                      // getOptionLabel={"firstName"}
                      firstNameOption={"firstName"}
                      lastNameOption={"lastName"}
                      secondaryTextOption={"emailId"}
                      placeholder={"Search for employee"}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <Typography style={{ fontSize: "1rem" }}>Message</Typography>
                    <TextField
                      multiline
                      rows={3}
                      type={"text"}
                      sx={{ marginBottom: "0.4em" }}
                      variant="outlined"
                      InputProps={{ style: { height: "auto" } }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <Typography style={{ fontSize: "1rem" }}>Regards</Typography>
                    <TextField
                      variant="outlined"
                      disabled
                      value={accounts[0].name}
                      sx={{ marginBottom: "0.4em" }}
                      InputProps={{ style: { height: "40px" } }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: "1em" }}>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", fontWeight: "400" }}
                      disabled={name === "" || message === "" || editMode}
                      onClick={handleAppreciation}
                    >
                      Send
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", fontWeight: "400" }}
                      onClick={() => setEditMode((prev) => !prev)}
                    >
                      {editMode ? "Save" : "Edit"}
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Paper>
          </Box>
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
          <StyledCertificate ref={ref}>
            <motion.div
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
              ref={constraintsRef}
            >
              <motion.div
              ref={header}
                dragDirectionLock
                className="draggable"
                style={{
                  border: editMode
                    ? "dashed 2px #ddd"
                    : "dashed 2px transparent",
                    position: "relative",
                    top: 0,
                    right:0,
                }}
                drag={editMode}
                dragConstraints={constraintsRef}
                onDragEnd={(e, info) => setHeaderPosition(header.current.style.transform)}

                
              >
                <Typography>
                  {certificateData.header} {name === "" ? "<Name>" : name},
                </Typography>
              </motion.div>
              <motion.div
              ref={body}
                className="draggable"
                style={{
                  border: editMode
                    ? "dashed 2px #ddd"
                    : "dashed 2px transparent",
                }}
                drag={editMode}
                dragConstraints={constraintsRef}
                onDragEnd={(e, info) => setBodyPosition(body.current.style.transform)}

              >
                <Typography>
                  {certificateData.basicMessage} {message}
                </Typography>
              </motion.div>
              <motion.div
              ref={footer}
                className="draggable"
                style={{
                  border: editMode
                    ? "dashed 2px #ddd"
                    : "dashed 2px transparent",
                }}
                drag={editMode}
                dragConstraints={constraintsRef}
                onDragEnd={(e, info) => setFooterPosition(footer.current.style.transform)}

              >
                <Typography>
                  {certificateData.footer}
                  <br />
                  {accounts?.[0]?.name ?? ""}
                </Typography>
              </motion.div>
            </motion.div>
            <img
              height={"500px"}
              src={`data:image/png;base64,${certificateData?.image}`}
              alt="Certificate"
            />
          </StyledCertificate>
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
            Value Card sent successfully!
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
            Card not sent!
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default PreviewPage;
