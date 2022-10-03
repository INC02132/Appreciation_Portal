import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./AppreciatePage.css";
import data from "../certificateData";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import "./PreviewPage.css";
import { useMsal } from "@azure/msal-react";

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

const PositionedName = styled(Typography)(({ theme }) => ({
  fontFamily: "Staatliches",
  margin: "0",
  position: "absolute",
}));
const PositionedItem = styled(Box)(({ theme }) => ({
  margin: "0",
  position: "absolute",
}));
const PreviewPage = ({ selectedTemplate, templateData = [] }) => {
  const ref = createRef();

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    if (name === "" || message === "") {
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

  const [certificateData, setCertificateData] = useState({
    type: selectedTemplate.category,
    name: selectedTemplate.category,
    image: selectedTemplate.templateFile,
    header: selectedTemplate.header,
    footer: selectedTemplate.footer,
    basicMessage: selectedTemplate.basicMessage,
    nameLeftPostion: "220",
    nameTopPostion: "148",
    messageLeftPostion: "450",
    messageTopPostion: "237",
    nameFontSize: "20",
    messageFontSize: "20",
  });

  // const [templateDataList, setTemplateDataList] = useState(templateData)

  //Name field states
  const [name, setName] = useState("");
  const [nameLeftPostion, setNameLeftPostion] = useState(
    data[0].nameLeftPostion
  );
  const [nameTopPostion, setNameTopPostion] = useState(data[0].nameTopPostion);
  const [nameFont, setNameFont] = useState(data[0].nameFontSize);

  //Message field states
  const [message, setMessage] = useState("");
  const [messageLeftPostion, setMessageLeftPostion] = useState(
    data[0].messageLeftPostion
  );
  const [messageTopPostion, setMessageTopPostion] = useState(
    data[0].messageTopPostion
  );
  const [messageFont, setMessageFont] = useState(data[0].messageFontSize);

  const { accounts } = useMsal();

  const handleAppreciation = () => {

    const valueCard = {
      updatedMessage: message,
      senderEmail: "prajojita28@gmail.com",
      receiverEmail: "prajojita28@gmail.com",
      templateId: selectedTemplate.templateId,
    };

    fetch("http://localhost:8080/appreciation/sendValueCard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valueCard),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });

    //   window.location(
    //         "mailto:email@example.com, secondemail@example.com"
    //       );
    //       let link = document.createElement("a");
    //       link.href =
    //         "mailto:email@example.com, secondemail@example.com";
    //       console.log(link);
    //       link.click();
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
    });
  };

  const constraintsRef = useRef(null);

  const [editMode, setEditMode] = useState(false);

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
            <Grid container gap={1} sx={{ padding: "1em 2em" }}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>
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
                <Typography sx={{ fontSize: "24px" }}>Add Details</Typography>
                <FormControl sx={{ width: "100%" }}>
                  <Typography style={{ fontSize: "18px" }}>Name</Typography>
                  <TextField
                    variant="outlined"
                    sx={{ marginBottom: "0.4em" }}
                    InputProps={{ style: { height: "40px" } }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* <Typography sx={{ fontSize: "11px" }}>Font Size</Typography>
                                    <Slider
                                        size="small"
                                        key={"font"}
                                        value={Number(nameFont)}
                                        onChange={(e) => setNameFont(e.target.value)}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography sx={{ fontSize: "11px" }}>
                                        Left Position
                                    </Typography>
                                    <Slider
                                        size="small"
                                        key={"left"}
                                        min={0}
                                        max={500}
                                        value={Number(nameLeftPostion)}
                                        onChange={(e) => setNameLeftPostion(e.target.value)}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography sx={{ fontSize: "11px" }}>
                                        Top Position
                                    </Typography>
                                    <Slider
                                        size="small"
                                        key={"top"}
                                        min={0}
                                        max={500}
                                        value={Number(nameTopPostion)}
                                        onChange={(e) => setNameTopPostion(e.target.value)}
                                        valueLabelDisplay="auto"
                                    /> */}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography style={{ fontSize: "18px" }}>Message</Typography>
                  <TextField
                    multiline
                    rows={3}
                    type={"text"}
                    sx={{ marginBottom: "0.4em" }}
                    variant="outlined"
                    InputProps={{ style: { height: "12vh" } }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {/* <Typography sx={{ fontSize: "11px" }}>Font Size</Typography>
                                    <Slider
                                    size="small"
                                    key={"font"}
                                        value={Number(messageFont)}
                                        onChange={(e) => setMessageFont(e.target.value)}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography sx={{ fontSize: "11px" }}>
                                        Left Position
                                    </Typography>
                                    <Slider
                                    size="small"
                                        key={"left"}
                                        min={0}
                                        max={500}
                                        value={Number(messageLeftPostion)}
                                        onChange={(e) => setMessageLeftPostion(e.target.value)}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography sx={{ fontSize: "11px" }}>
                                        Top Position
                                        </Typography>
                                    <Slider
                                        size="small"
                                        key={"top"}
                                        min={0}
                                        max={500}
                                        value={Number(messageTopPostion)}
                                        onChange={(e) => setMessageTopPostion(e.target.value)}
                                        valueLabelDisplay="auto"
                                    /> */}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography style={{ fontSize: "18px" }}>Regards</Typography>
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
              <Grid item xs={12}>
                <ButtonGroup>
                  {/* <Button
                                        variant="contained"
                                        disabled={((name === "" || message === "") || (editMode))}
                                        onClick={() => onButtonClick()}
                                        >
                                        Download
                                    </Button> */}
                  <Button
                    variant="contained"
                    disabled={name === "" || message === "" || editMode}
                    onClick={handleAppreciation}
                    // onClick={() => {
                    //   window.location(
                    //     "mailto:email@example.com, secondemail@example.com"
                    //   );
                    //   let link = document.createElement("a");
                    //   link.href =
                    //     "mailto:email@example.com, secondemail@example.com";
                    //   console.log(link);
                    //   link.click();
                    // }}
                  >
                    Send
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setEditMode((prev) => !prev)}
                  >
                    {editMode ? "Save" : "Edit"}
                  </Button>
                </ButtonGroup>
              </Grid>
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
          <StyledCertificate ref={ref}>
            {/* <PositionedItem sx={{ width: "100%", height: "500px" }}> */}

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
                className="draggable"
                style={{
                  border: editMode
                    ? "dashed 2px #ddd"
                    : "dashed 2px transparent",
                }}
                drag={editMode}
                dragConstraints={constraintsRef}
              >
                <Typography>
                  {certificateData.header} {name}
                </Typography>
              </motion.div>
              <motion.div
                className="draggable"
                style={{
                  border: editMode
                    ? "dashed 2px #ddd"
                    : "dashed 2px transparent",
                }}
                drag={editMode}
                dragConstraints={constraintsRef}
              >
                <Typography>
                  {certificateData.basicMessage} {message}
                </Typography>
              </motion.div>
              <motion.div
                className="draggable"
                style={{
                  border: editMode
                    ? "dashed 2px #ddd"
                    : "dashed 2px transparent",
                }}
                drag={editMode}
                dragConstraints={constraintsRef}
              >
                <Typography>
                  {certificateData.footer}
                  <br />
                  {accounts?.[0]?.name ?? ""}
                </Typography>
              </motion.div>
            </motion.div>
            {/* </PositionedItem> */}

            {/* <PositionedName
                            style={{
                                fontSize: `${nameFont}px`,
                                left: `${nameLeftPostion}px`,
                                top: `${nameTopPostion}px`,
                            }}
                        >
                            {certificateData.header} {name}
                        </PositionedName>
                        <PositionedName
                            style={{
                                fontSize: `${messageFont}px`,
                                left: `${messageLeftPostion}px`,
                                top: `${messageTopPostion}px`,
                            }}
                        >
                            {certificateData.basicMessage} {message}
                        </PositionedName>
                        <PositionedName>
                            {certificateData.footer}
                        </PositionedName> */}
            <img
              height={"500px"}
              src={`data:image/png;base64,${certificateData?.image}`}
              alt="Certificate"
            />
          </StyledCertificate>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreviewPage;
