import {useState} from 'react';
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

export default function AddShop({ open, handleClose, target ,id}) {

  const [btnLoading, setBtnLoading]= useState(false)
  const [name, setName]= useState("")

  const close=()=> {
    handleClose()
    setName("")
  }

  const handleSubmit = () => {
    setBtnLoading(true);
    if(target === "Library") {
      API.post(`/api/libraries`, {name})
      .then((res) => console.log(res))
      .finally(() => {
        setBtnLoading(false);
        close()
        setName("")
      });
    }else if(target === "Sublibrary"){
      API.put(`/api/libraries/${id}/add-sublibrary`, {name})
      .then((res) => console.log(res))
      .finally(() => {
        setBtnLoading(false);
        close()
        setName("")
      });
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{target}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField 
          autoFocus 
          margin="dense" 
          label="Name" 
          fullWidth 
          variant="standard"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          />

      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <LoadingButton loading={btnLoading} onClick={handleSubmit}>Save</LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

AddShop.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
