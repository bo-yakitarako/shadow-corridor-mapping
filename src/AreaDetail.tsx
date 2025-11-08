import { Box, Button, Typography } from '@mui/material';
import { useStageValue } from './state/stage';
import { useMap } from './state/map';
import { useCurrentPosValue } from './state/currentPos';
import { calcRotation } from './utils/areaRotation';
import { useSettingsValue } from './state/settings';
import { AreaFloorsDialogWithOpenButton } from './AreaFloorsDialogWithOpenButton';
import { useAreaFloorsValue } from './state/areaFloors';

const floorTitle = { '1': '1階', '2': '2階', '3': '3階', '4': '4階', B: '地下1階', B2: '地下2階' };

const xsSize = {
  small: '30dvw',
  medium: '45dvw',
  large: '60dvw',
};
const size = {
  small: '180px',
  medium: '280px',
  large: '400px',
};

export const AreaDetail = () => {
  const stage = useStageValue();
  const [map, setMap] = useMap();
  const currentPos = useCurrentPosValue();
  const { areaDetailSize } = useSettingsValue();
  const areaFloors = useAreaFloorsValue();
  if (currentPos === null || !Object.keys(areaFloors).includes(stage)) {
    return null;
  }
  const { type, pos } = currentPos;
  const number =
    type === 'center'
      ? map[type][pos as keyof (typeof map)['center']].number
      : map[type][pos as keyof (typeof map)[typeof type]];
  if (!number) {
    return null;
  }
  const floorDict = areaFloors[stage as keyof typeof areaFloors][type];
  const floors = floorDict[number as keyof typeof floorDict] as (keyof typeof floorTitle)[];
  const autoRotation = calcRotation(type, pos);
  const rotation =
    autoRotation === null ? map.center[pos as keyof (typeof map)['center']].rotation : autoRotation;
  const isStartFixed = ['shinen', 'ensou'].includes(stage) && pos === 'start';
  return (
    <Box>
      <Box
        sx={{
          maxWidth: '100dvw',
          maxHeight: '100dvh',
          overflow: 'auto',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {floors.map((floor) => (
            <Box
              key={floor}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Typography fontSize={24}>{floorTitle[floor]}</Typography>
              <Box
                component="img"
                src={`/map/${stage}/${type}/${number}/${floor}.png`}
                sx={{
                  width: { xs: xsSize[areaDetailSize], sm: size[areaDetailSize] },
                  height: 'auto',
                  transform: `rotate(${rotation}deg)`,
                  p: 0,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <AreaFloorsDialogWithOpenButton />
        {type === 'center' && !isStartFixed && (
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              const area = map[type][pos as keyof (typeof map)['center']];
              const rotation = area.rotation === 270 ? 0 : area.rotation + 90;
              setMap({ ...map, [type]: { ...map[type], [pos]: { ...area, rotation } } });
            }}
          >
            回転しよ
          </Button>
        )}
      </Box>
    </Box>
  );
};
