import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { CardHeader } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';



export default function BasicCard() {
  return (
    <Grid container>
    <Grid item md={5} style={{ padding: "16px" }}>
    <Card sx={{
        width:"450px",
        height:"600px",
        borderRadius:"10px"
    }}>
    <Typography sx={{
        fontSize:"24px",
        fontWeight:"500",
        textAlign:"center"
    }}>Appreciation Received(4)</Typography>
    <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: 2,
                    marginLeft:"25px",
                    width:"400px",
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
   
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}

<Card sx={{ width: "400px",
                height:"107px",
                borderRadius:"10px",
                marginLeft:"25px",
                marginTop:"20px",
                color:"#ffffff",
                backgroundColor: "#002947"}}>
     <Typography sx={{
        textAlign:"right"
    }}>26th September, 2022</Typography>
      <CardHeader title="Customer Centricity" subheader={<Typography sx={{color: "#ffffff"}}>From: Silpa Shree Mohanty</Typography>}></CardHeader>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <Card sx={{ width: "400px",
                height:"107px",
                borderRadius:"10px",
                marginLeft:"25px",
                marginTop:"20px",
                color:"#ffffff",
                backgroundColor: "#EAF2F9"}}>
    <Typography sx={{
        textAlign:"right",
        color: "#002947"
    }}>26th September, 2022</Typography>
      <CardHeader title={<Typography sx={{fontWeight: 400,
    fontSize: "1.5rem",
    color: "#002947"}}>Customer Centricity</Typography>} subheader={<Typography sx={{color: "#002947"}}>From: Silpa Shree Mohanty</Typography>}></CardHeader>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <Card sx={{ width: "400px",
                height:"107px",
                borderRadius:"10px",
                marginLeft:"25px",
                marginTop:"20px",
                color:"#ffffff",
                backgroundColor: "#EAF2F9"}}>
     <Typography sx={{
        textAlign:"right",
        color: "#002947"
    }}>26th September, 2022</Typography>
      <CardHeader title={<Typography sx={{fontWeight: 400,
    fontSize: "1.5rem",
    color: "#002947"}}>Customer Centricity</Typography>} subheader={<Typography sx={{color: "#002947"}}>From: Silpa Shree Mohanty</Typography>}></CardHeader>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <Card sx={{ width: "400px",
                height:"107px",
                borderRadius:"10px",
                marginLeft:"25px",
                marginTop:"20px",
                color:"#ffffff",
                backgroundColor: "#EAF2F9"}}>
     <Typography sx={{
        textAlign:"right",
        color: "#002947"
    }}>26th September, 2022</Typography>
      <CardHeader title={<Typography sx={{fontWeight: 400,
    fontSize: "1.5rem",
    color: "#002947"}}>Customer Centricity</Typography>}  subheader={<Typography sx={{color: "#002947"}}>From: Silpa Shree Mohanty</Typography>}></CardHeader>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    </Card>
    
    </Grid>
    </Grid>

  );
}
