import { useMsal } from '@azure/msal-react';
import { AppBar, Avatar, Box, Button, Card, CardContent, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';


function handleLogout(instance) {
  instance.logoutRedirect().catch(e => {
      console.error(e);
  });
}


const AppBarComponent = () => {

  const toolbarStyle = {
    minHeight: '52px',
    paddingLeft: '15px'
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {accounts, instance} = useMsal();

  const [userDetails, setUserDetails] = useState({
    name: "", 
    initials: "",
    email: ""
  });

  useEffect(() => {
    let splittedName = accounts[0]?.name?.split(" ");
    let firstName = splittedName[0];
    let lastName = splittedName[1];
    setUserDetails({
      name: `${accounts[0]?.name}`,
      initials: `${firstName?.[0]??""}${lastName?.[0]??""}`,
      email: accounts?.[0]?.username??""
    })
  }, [accounts])


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
					<Avatar sx={{height: '23px', width: '23px', fontSize: '14px' }}>{userDetails.initials}</Avatar>
					<Typography
						sx={{ fontSize: "16px" }}						
					>
						{userDetails?.name}
					</Typography>
					<Typography
						sx={{ fontSize: "14px" }}
					>
						{userDetails?.email}
					</Typography>
					<Button
						size='small'
            onClick={() => handleLogout(instance)}
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