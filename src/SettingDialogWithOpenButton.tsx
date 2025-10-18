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
import { useSettings } from './state/settings';

export const SettingDialogWithOpenButton = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [settings, setSettings] = useSettings();

  function update<K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) {
    setSettings({ ...settings, [key]: value });
  }
  type Size = (typeof settings)['mapSize'];

  return (
    <>
      <Button variant="outlined" size="large" onClick={() => setOpen(true)}>
        設定
      </Button>
      <Dialog open={open} onClose={handleClose} container={() => document.body}>
        <DialogTitle>設定</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel
            label="マップにエリア名を表示"
            control={
              <Checkbox
                checked={settings.showAreaName}
                onChange={(e) => update('showAreaName', e.target.checked)}
                size="large"
              />
            }
          />
          <FormControlLabel
            label="エリアの境界に余白を表示"
            control={
              <Checkbox
                checked={settings.showAreaOutline}
                onChange={(e) => update('showAreaOutline', e.target.checked)}
                size="large"
              />
            }
          />
          <FormControlLabel
            label="外縁のマップ表示を地下1階にする"
            control={
              <Checkbox
                checked={settings.isGaienUnderground}
                onChange={(e) => update('isGaienUnderground', e.target.checked)}
                size="large"
              />
            }
          />
          <FormControl sx={{ display: { xs: 'none', sm: 'block' } }}>
            <FormLabel id="map-size-label">マップの大きさ</FormLabel>
            <RadioGroup
              row
              aria-labelledby="map-size-label"
              value={settings.mapSize}
              onChange={(e) => update('mapSize', e.target.value as Size)}
            >
              <FormControlLabel value="small" control={<Radio />} label="小さい" />
              <FormControlLabel value="medium" control={<Radio />} label="中くらい" />
              <FormControlLabel value="large" control={<Radio />} label="大きい" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="area-size-label">エリア詳細の大きさ</FormLabel>
            <RadioGroup
              row
              aria-labelledby="area-size-label"
              value={settings.areaDetailSize}
              onChange={(e) => update('areaDetailSize', e.target.value as Size)}
            >
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
