import React, { useState } from 'react';
import { areaName } from './areaName';
import { Box, Typography } from '@mui/material';
import { useCurrentPos } from '../state/currentPos';
import { AreaSelectDialog } from './AreaSelectDialog';
import { useMapValue } from '../state/map';
import { useStageValue } from '../state/stage';

type Pos = {
  center:
    | 'goal'
    | 'northWest'
    | 'north'
    | 'northEast'
    | 'west'
    | 'center'
    | 'east'
    | 'southWest'
    | 'south'
    | 'southEast'
    | 'start';
  edge:
    | 'northNorthWest'
    | 'northNorthEast'
    | 'eastNorthEast'
    | 'east'
    | 'eastSouthEast'
    | 'southSouthEast'
    | 'south'
    | 'southSouthWest'
    | 'westSouthWest'
    | 'west'
    | 'westNorthWest';
  corner: 'northWest' | 'northEast' | 'southEast' | 'southWest';
};

type AreaNameDict = typeof areaName;
type PosType<T extends keyof Pos> = {
  type: T;
  pos: Pos[T];
};
export type AreaPos = {
  [T in keyof Pos]: PosType<T>;
}[keyof Pos];

const areaColor = {
  center: '#ffb74d', // orange 300
  edge: '#69f0ae', // green A200
  corner: '#64ffda', // teal A200
};

export const Area: React.FC<AreaPos> = ({ type, pos }) => {
  const stage = useStageValue();
  const map = useMapValue();
  const [open, setOpen] = useState(false);
  const number = map[type][pos as keyof (typeof map)[typeof type]];
  const name = areaName[stage][type][number as keyof AreaNameDict[typeof stage][typeof type]];
  const [currentPos, setCurrentPos] = useCurrentPos();
  const isCurrent = type === currentPos?.type && pos === currentPos?.pos;
  const isStartFixed = ['shinen', 'ensou'].includes(stage) && pos === 'start';

  return (
    <Box
      sx={{
        bgcolor: open ? '#ffff00' : areaColor[type],
        width: '120px',
        height: '120px',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        outline: isCurrent ? '6px solid #ffff00' : undefined,
        cursor: isStartFixed ? 'default' : 'pointer',
      }}
      component="div"
      onContextMenu={(e) => {
        e.preventDefault();
        if (open) return;
        setCurrentPos(currentPos === null || !isCurrent ? ({ type, pos } as AreaPos) : null);
      }}
      onClick={(e) => {
        e.preventDefault();
        if (isStartFixed) return;
        if (!open) {
          setOpen(true);
        }
      }}
    >
      <Typography>{isStartFixed ? 'スタート' : (name ?? '')}</Typography>
      <AreaSelectDialog type={type} pos={pos} open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};
