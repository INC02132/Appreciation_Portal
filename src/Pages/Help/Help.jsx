import { Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedNavIndex } from '../../redux/reducers/appReducer';

function Help() {

  const dispatch = useDispatch();
  dispatch(setSelectedNavIndex(4));

  return (
    <div style={{margin:"3rem", display: "flex", justifyContent: "center", alignContent: "center"}}>
        <Typography sx={{fontSize: "1.5rem", color: "#002947", textAlign: "center"}}>
        For any query related to value card, <br></br>please drop a mail at 
        <b> askhr@incture.com</b>
        </Typography>
        </div>
  )
}

export default Help