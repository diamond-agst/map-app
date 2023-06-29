import React from "react"
import "./styles.scss"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import close from "../../assets/close.svg"

const DialogBlock = ({children, open, handleClose, onButtonClick, title, buttonText}) => {
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <div className="titleDialog">
                    <h1>{title}</h1>
                    <img onClick={handleClose} src={close}/>
                </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            {buttonText &&
            <DialogActions>
                <Button onClick={onButtonClick} autoFocus>
                    {buttonText}
                </Button>
            </DialogActions>}
      </Dialog>
    )
}

export default DialogBlock;