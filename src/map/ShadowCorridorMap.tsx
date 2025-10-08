import { Box } from '@mui/material';
import { Area } from './Area';
import { useStageValue } from '../state/stage';

const gap = '6px';

export const ShadowCorridorMap = () => {
  const stage = useStageValue();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
      <Box sx={{ display: 'flex', gap }}>
        <Area type="corner" pos="northWest" />
        <Area type="edge" pos="northNorthWest" />
        <Area type="center" pos="goal" />
        <Area type="edge" pos="northNorthEast" />
        <Area type="corner" pos="northEast" />
      </Box>
      <Box sx={{ display: 'flex', gap }}>
        <Area type="edge" pos="westNorthWest" />
        <Area type="center" pos="northWest" />
        <Area type="center" pos="north" />
        <Area type="center" pos="northEast" />
        <Area type="edge" pos="eastNorthEast" />
      </Box>
      <Box sx={{ display: 'flex', gap }}>
        <Area type="edge" pos="west" />
        <Area type="center" pos="west" />
        <Area type="center" pos="center" />
        <Area type="center" pos="east" />
        <Area type="edge" pos="east" />
      </Box>
      <Box sx={{ display: 'flex', gap }}>
        <Area type="edge" pos="westSouthWest" />
        <Area type="center" pos="southWest" />
        <Area type="center" pos="south" />
        <Area type="center" pos="southEast" />
        <Area type="edge" pos="eastSouthEast" />
      </Box>
      <Box sx={{ display: 'flex', gap }}>
        <Area type="corner" pos="southWest" />
        <Area type="edge" pos="southSouthWest" />
        {stage !== 'gaien' ? <Area type="center" pos="start" /> : <Area type="edge" pos="south" />}
        <Area type="edge" pos="southSouthEast" />
        <Area type="corner" pos="southEast" />
      </Box>
    </Box>
  );
};
