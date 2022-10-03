import { AppBar, Avatar, Box, Button, Card, CardContent, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const AppBarComponent = () => {

  const toolbarStyle = {
    minHeight: '52px',
    paddingLeft: '15px'
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const renderMenu = (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				position: "absolute",
				top: 45,
				right: 10,
				zIndex: 10,
			}}
		>
			<Card variant='outlined'>
				<CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<Avatar sx={{height: '23px', width: '23px', fontSize: '14px' }}>NI</Avatar>
					<Typography
						sx={{ fontSize: "16px" }}						
					>
						{"Naiyar Imam"}
					</Typography>
					<Typography
						sx={{ fontSize: "14px" }}
					>
						{"naiyar.imam@incture.com"}
					</Typography>
					<Button
						size='small'
					>
						Sign out
					</Button>
				</CardContent>
			</Card>
		</div>
	);

  

  return (
      <AppBar
        sx={{
          bgcolor: "#fff",
          height: "52px"       
        }}
        position="sticky"
      >
        <Toolbar style={toolbarStyle}>
          <div className="logo">
            <Typography sx={{color: "#00518D"}}>Incture Appreciation Portal</Typography>
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              sx={{
                color: "#424242",
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* <AccountCircle /> */}
              <Avatar sx={{height: '28px', width: '28px', fontSize: '14px', padding: '0'}}>
                {"NI"}
              </Avatar>
            </IconButton>
            <div>{isMenuOpen ? <div>{renderMenu}</div> : null}</div>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default AppBarComponent;