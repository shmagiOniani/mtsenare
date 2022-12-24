import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import API from '../../utils/services/API';

export default function AddLibrary({ open, handleClose }) {

  const [btnLoading, setBtnLoading]= React.useState(false)

  const addLibrary = () => {
    setBtnLoading(true);

    API.get(`/api/libraries?all=true`)
      .then((res) => console.log(res))
      .finally(() => {
        setBtnLoading(false);
        handleClose()
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Library</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField 
          autoFocus 
          margin="dense" 
          id="name" 
          label="Name" 
          type="email" fullWidth 
          variant="standard" />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={btnLoading} onClick={addLibrary}>Save</LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

AddLibrary.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
