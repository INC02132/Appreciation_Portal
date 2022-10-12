import { Backdrop, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const LoginLoadingPage = () => {
    return (
        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{height: '100vh'}}>
            <CircularProgress />
            <Typography color='#0288d1'>Loading</Typography>
        </Box>
    )
}

export default LoginLoadingPage