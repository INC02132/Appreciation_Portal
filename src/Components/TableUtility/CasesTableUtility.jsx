import React, { useState } from "react";
import { IconButton, Stack, Typography, Button, Paper, Table, TableCell, TableHead, TableContainer, TableBody, TableRow, createTheme, ThemeProvider, makeStyles } from "@mui/material";
import { ArrowLeft, ArrowRight, CheckBox } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Data from '../../demo_data/CasesDemoData'
// import { roleData as data } from '../../../demo_datas/data'

import "./table.css";
import "./utilities.css";
import InfiniteScroll from "react-infinite-scroll-component";
let CasesTableUtility = () => {
  
let tableRowTheme = createTheme({
  components:{
    MuiTableRow:{
      styleOverrides:{
        root:{
          Height: '100px'
        }
      }
    },
    MuiTableHead:{
      styleOverrides:{
        root:{
          backgroundColor: 'blue',
          color: 'red'
        }
      }
    }
  }
})

  


  return (

    < >
      
      {Data &&
        <Paper sx= {{
          flexGrow: 1,
          // marginTop: "6vw",
          // marginLeft: "6vw",
          position: 'relative',
          // width: '90%',
          margin: '1em',
          overflow: 'hidden'
        }}
        >
            
          <TableContainer  sx={{
            width: "100%",
            maxHeight:'300px',
            overflow: 'hidden'
          }}
          >
            
              <div style={{margin: '10px'}}>
                <Typography variant = 'h4'> Cases</Typography>
              </div>

              {/* *************************table*****************************  */}
              {/* *************************table header*****************************  */}

              
                
                <ThemeProvider theme={tableRowTheme}>

                      {/* <InfiniteScroll
              dataLength={Data.length}
              next={getNextBatchOfData}
              hasMore={true}
             
              height='100vh'
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No More Records found</b>
                </p>
              }
            > */}
                <Table className="wbScroll" style={{ borderSpacing: "0px", minHeight: 'max-content', margin: "0", padding: 'opx 10px', position:'relative' }}>

                  <TableHead  container px={2} sx={{position:'sticky', top: '0', zIndex: '2'}} className="table_header" >
                    <TableRow sx={{maxHeight: '50px'}}>
                     <TableCell width='50%'>
                        <Typography>
                            Case Details
                        </Typography>
                     </TableCell>
                     <TableCell  width='25%'>
                        <Typography>
                            Category
                        </Typography>
                     </TableCell>
                     <TableCell width='25%'>
                        <Typography>
                           Status
                        </Typography>
                     </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* *************************table body*****************************  */}
                  <TableBody>
                    {
                      Data.map((item, index) => (
                        <TableRow className='table_card' sx={{maxHeight: '50px !important'}}>

                         <TableCell> 
                            <Stack direction={'row'}>
                                <Box bgcolor='blue'>
                        <CheckBox>
                        </CheckBox>
                                </Box>
                                <Box bgcolor='red'>
                                <Typography>
                                    {item.employeeName}
                                </Typography>
                                <Typography>
                                    {item.employeeId}
                                </Typography>
                                <Typography>
                                    {item.case}
                                </Typography>
                                <Typography>
                                    {item.caseID}
                                </Typography>
                                </Box>
                            </Stack>
                         </TableCell>
                         <TableCell>
                            <Typography>
                                {item.department}
                            </Typography>
                            <Typography>
                                {item.caseType}
                            </Typography>
                         </TableCell>
                         <TableCell>
                            <Button variant="outlined" >
                                {item.status}
                            </Button>
                         </TableCell>

                        </TableRow>

                      ))}

                  </TableBody>
                </Table>
                  {/* </InfiniteScroll>  */}
                          </ThemeProvider>


              


              {/* ********************pagination component**********************  */}
              
            
          </TableContainer>
        </Paper>
      }

    

    </ >

  );
};

export default CasesTableUtility;


// { ****************************************ReadMe*************************************** 

  // ADD THIS FUNCTIONS TO THE PARENT ELEMENT AND PASS THIS FUNCTIONS AS PROPS TO TABLEUTILITY COMPONENT
    // PURPOSE: FOR DISPLAYING MODAL AND GRABBING ITEM ID THAT IS TO BE MODIFIED FROM TABLEUTILITY 

//  let ShowDeleteModalFunc = (status, id) => {
//   let func = (e) => {
//     console.log(id,'sadasdasd')
//     setDeleteModalStatus(status)
//   }
//   func()
// }
// let ShowEditModalFunc = (status, id) => {
//   let func=() => {
//     console.log(id)
//     setEditModalStatus(status)
//   }
//   func()
// }

// }


// PROPS: DATA AS Data, 
// ARRAY OF HEADER KEYS AS headerkeys (STRINGS YOU WANT TO DISPLAY AS TABLE HEADER)
// ARRAY OF DATA KEYS AS bodykeys
// TITLE OF TABLE AS tabletitle
// functions for displaying modal ShowEditModalFunc & ShowDeleteModalFunc

// example :  Data={RoleData} headerkeys={['Role Id', 'Role', 'Created on', 'Modified on', '']} bodykeys={['role_id', 'role', 'created_on', 'modified_on']} tableTitle={'Role'} ShowEditModalFunc={ShowEditModalFunc} ShowDeleteModalFunc={ShowDeleteModalFunc}