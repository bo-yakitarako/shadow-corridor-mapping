import React, { useState } from 'react';
import { areaName } from '../utils/areaName';
import { areaFloor } from '../utils/areaFloor';
import { Box, Typography } from '@mui/material';
import { useCurrentPos } from '../state/currentPos';
import { AreaSelectDialog } from './AreaSelectDialog';
import { useMapValue } from '../state/map';
import { useStageValue } from '../state/stage';
import { calcRotation } from '../utils/areaRotation';
import { useMainFloorValue } from '../state/mainFloor';

export type Pos = {
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
type AreaType = keyof Pos;
type AreaPos = Pos[AreaType];

export type AreaProps = { type: AreaType; pos: AreaPos };

const areaColor = {
  center: '#ffb74d', // orange 300
  edge: '#69f0ae', // green A200
  corner: '#64ffda', // teal A200
};

const shadowSize = '1.5px';
const size = '100px';

// eslint-disable-next-line complexity
export const Area: React.FC<AreaProps> = ({ type, pos }) => {
  const stage = useStageValue();
  const map = useMapValue();
  const mainFloor = useMainFloorValue();
  const [open, setOpen] = useState(false);
  const number =
    type === 'center'
      ? map[type][pos as keyof (typeof map)['center']].number
      : map[type][pos as keyof (typeof map)[typeof type]];
  const name = areaName[stage][type][number as keyof AreaNameDict[typeof stage][typeof type]];
  const [currentPos, setCurrentPos] = useCurrentPos();
  const isCurrent = type === currentPos?.type && pos === currentPos?.pos;
  const isStartFixed = ['shinen', 'ensou'].includes(stage) && pos === 'start';
  const imagePath =
    Object.keys(areaFloor).includes(stage) && number > 0
      ? `/map/${stage}/${type}/${number}/${stage === 'gaien' ? mainFloor : '1'}.png`
      : null;
  const autoRotation = calcRotation(type, pos);
  const rotation =
    autoRotation === null ? map.center[pos as keyof (typeof map)['center']].rotation : autoRotation;

  return (
    <Box
      sx={{
        backgroundColor: open ? '#f44336' : imagePath === null ? areaColor[type] : undefined,
        width: size,
        height: size,
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        outline: isCurrent ? '4px solid #f44336' : undefined,
        cursor: isStartFixed ? 'default' : 'pointer',
        position: 'relative',
        ':before':
          imagePath === null
            ? undefined
            : {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `rotate(${rotation}deg)`,
                zIndex: -1,
              },
      }}
      component="div"
      onContextMenu={(e) => {
        e.preventDefault();
        if (open) return;
        setCurrentPos(currentPos === null || !isCurrent ? { type, pos } : null);
      }}
      onClick={(e) => {
        e.preventDefault();
        if (isStartFixed) return;
        if (!open) {
          setOpen(true);
        }
      }}
    >
      <Typography
        fontSize={16}
        fontWeight={700}
        color={areaColor[type]}
        sx={{
          textShadow: `${shadowSize} ${shadowSize} 0px black, ${shadowSize} ${shadowSize} 0px black, ${shadowSize} -${shadowSize} 0px black, -${shadowSize} -${shadowSize} 0px black, ${shadowSize} 0px 0px black, 0px ${shadowSize} 0px black, -${shadowSize} 0px 0px black, 0px -${shadowSize} 0px black;`,
        }}
      >
        {isStartFixed ? 'スタート' : (name ?? '')}
      </Typography>
      <AreaSelectDialog type={type} pos={pos} open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};
