import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';

export const SettingDialogWithOpenButton = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button variant="outlined" size="large" onClick={() => setOpen(true)}>
        設定
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        container={() => document.body}
        slotProps={{
          paper: {
            style: {
              position: 'fixed',
              top: '20px',
              left: '20px',
              right: '20px',
              margin: 'auto',
              maxHeight: 'calc(100vh - 40px)',
            },
          },
        }}
      >
        <DialogTitle>設定</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel label="マップにエリア名を表示" control={<Checkbox checked />} />
          <FormControlLabel label="エリアの境界に余白を表示" control={<Checkbox checked />} />
          <FormControl sx={{ display: { sm: 'none', md: 'block' } }}>
            <FormLabel id="map-size-label">マップの大きさ</FormLabel>
            <RadioGroup row aria-labelledby="map-size-label">
              <FormControlLabel value="small" control={<Radio />} label="小さい" />
              <FormControlLabel value="medium" control={<Radio />} label="中くらい" />
              <FormControlLabel value="large" control={<Radio />} label="大きい" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="area-size-label">エリア詳細の大きさ</FormLabel>
            <RadioGroup row aria-labelledby="area-size-label">
              <FormControlLabel value="small" control={<Radio />} label="小さい" />
              <FormControlLabel value="medium" control={<Radio />} label="中くらい" />
              <FormControlLabel value="large" control={<Radio />} label="大きい" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>やめる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
