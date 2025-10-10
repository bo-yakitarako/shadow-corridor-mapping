import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useStage } from './state/stage';
import type { areaName } from './utils/areaName';

export const StageSelect = () => {
  const [stage, setStage] = useStage();
  return (
    <FormControl>
      <InputLabel id="stage-select-label">ステージ</InputLabel>
      <Select
        labelId="stage-select-label"
        label="ステージ"
        value={stage}
        onChange={(e) => setStage(e.target.value as keyof typeof areaName)}
        sx={{ width: '160px' }}
      >
        <MenuItem value="higurashi">ヒグラシの回廊</MenuItem>
        <MenuItem value="shinen">深淵</MenuItem>
        <MenuItem value="ensou">霊魂の淵叢</MenuItem>
        <MenuItem value="seiiki">聖域</MenuItem>
        <MenuItem value="gaien">外縁</MenuItem>
      </Select>
    </FormControl>
  );
};
