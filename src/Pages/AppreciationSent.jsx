import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardHeader } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { createRef, useCallback, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useMsal } from "@azure/msal-react";
import { TimeStampToDateString } from "../Utils/TimeStampToString";

const handleCilck = () => {
  <img height={"500px"} src="../Assests/Slide1.jpg" alt="Certificate" />;
};

export default function AppreciationSent() {
  const { accounts } = useMsal();  
  const [sentCard, setSentCard] = useState(null);

    const fetchData = async () => {
      try{
        let res = await axios.get(
          `http://localhost:8080/appreciation/getAppreciationBySenderId?senderId=${accounts[0]?.username??""}`
        );
        if(res.status===200) {
          setSentCard(res.data.data)
        }
      } catch(error) {

      }
    }
    const [selectedCard, setSelectedCard] = useState(null);
    React.useEffect(() => {
      fetchData();
    }, [])

  return (
    <Grid container>
      <Grid item md={5} style={{ padding: "16px" }}>
        <Card
          sx={{
            width: "350px",
            height: "600px",
            borderRadius: "10px",
            padding: "1em 0.2em",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              textAlign: "center",
              margin: "1em 0",
            }}
          >
            Appreciation Sent
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: 2,
              marginLeft: "25px",
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
              InputProps={{ disableUnderline: true }}
            />
            <IconButton disableRipple>
              <SearchIcon />
            </IconButton>
          </Box>

          {
            sentCard?.map((item) => {
              return <AppreciationCard cardData={item} setSelectedCard={setSelectedCard}  />
            })
          }

          
          
        </Card>
      </Grid>
      <Grid item md={8} style={{ padding: "16px", display: "flex", alignItems: "center" }}>
        
          <img src={`data:image/png;base64,${selectedCard?.template?.templateFile}`} 
          height={"500px"}
          />
      </Grid>
    </Grid>
  );
}

function AppreciationCard({cardData, setSelectedCard}) {
  const handleClick=()=>{
    setSelectedCard(cardData)
  }
  return (
    <Card
    onClick={() => handleClick()}
      elevation={8}
      sx={{
        width: "300px",
        height: "107px",
        borderRadius: "10px",
        marginLeft: "25px",
        marginTop: "20px",
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
  