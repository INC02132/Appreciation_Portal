import { Paper, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedNavIndex } from '../../redux/reducers/appReducer';

function Help() {

  const dispatch = useDispatch();
  dispatch(setSelectedNavIndex(4));

  return (
    <div style={{margin:"3rem", marginTop: "12rem", display: "flex", justifyContent: "center", alignContent: "center"}}>
      <Paper elevation={4}
            sx={{
              backgroundColor: "#EAF2F9",
              borderRadius: "10px",
              width: "32rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "3rem 2rem 3rem 2rem",
            }}
          >
          <Typography sx={{fontSize: "1.3rem", color: "#002947", textAlign: "center"}}>
          For any query related to value cards, <br></br>please drop a mail at 
          <b> askhr@incture.com</b>
          </Typography>
          </Paper>
        </div>
  )
}

export default Help