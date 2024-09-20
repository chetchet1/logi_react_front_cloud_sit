import React, { useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '@mui/material';

type maxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const MyDialog = (props: any) => {
  const open = props.open;
  let maxWidth: maxWidth | false = 'sm';
  if (props.maxWidth !== undefined) {
    maxWidth = props.maxWidth;
  }
  const title = () => {
    if (props.title !== undefined) {
      return <DialogTitle align="center">{props.title}</DialogTitle>;
    }
    return;
  };

  const close = useCallback(() => {
    if (props.forwardTempDelete) {
      props.forwardTempDelete();
    }

    props.close();
  }, [props]);

  return (
    <div>
      <Dialog aria-labelledby="responsive-dialog-title" open={open} fullWidth={true} maxWidth={'lg'}>
        {title()}

        <DialogContent dividers>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={close} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDialog;
