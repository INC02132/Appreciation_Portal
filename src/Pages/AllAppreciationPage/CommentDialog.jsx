import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CommentDialog(props) {

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleCloseDialog} sx={{margin: "1rem"}}>
        <DialogTitle sx={{fontSize: "1rem"}}>Please mention your reason for rejection</DialogTitle>
        <DialogContent>
        <TextField fullWidth placeholder='Add a comment' variant="outlined" multiline rows="3" onChange={(e) => props.handleCommentChange(e)}/>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" sx={{ backgroundColor: "red", marginBottom: "1rem", textTransform: "none", fontWeight: "400"}} onClick={props.handleReject}>Reject</Button>
            <Button variant="outlined" sx={{ marginBottom: "1rem", marginRight: "1rem", textTransform: "none", fontWeight: "400"}} onClick={props.handleCloseDialog}>Cancel</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}
