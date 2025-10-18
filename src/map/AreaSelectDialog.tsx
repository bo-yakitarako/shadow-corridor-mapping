import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { areaName } from '../utils/areaName';
import { useStageValue } from '../state/stage';
import { useMap } from '../state/map';
import { useCurrentPos } from '../state/currentPos';

type Props = {
  type: keyof typeof typeTitle;
  pos: keyof typeof posTitle;
  open: boolean;
  onClose: () => void;
};

const typeTitle = {
  center: '中央',
  edge: '外周',
  corner: '角',
};

const posTitle = {
  start: 'スタート後',
  goal: 'ゴール前',
  northWest: '北西',
  northNorthWest: '北北西',
  north: '北',
  northNorthEast: '北北東',
  northEast: '北東',
  eastNorthEast: '東北東',
  east: '東',
  eastSouthEast: '東南東',
  southEast: '南東',
  southSouthEast: '南南東',
  south: '南',
  southSouthWest: '南南西',
  southWest: '南西',
  westSouthWest: '西南西',
  west: '西',
  westNorthWest: '西北西',
  center: '真ん中',
};

export const AreaSelectDialog: React.FC<Props> = ({ type, pos, open, onClose }) => {
  const stage = useStageValue();
  const [map, setMap] = useMap();
  const [currentPos, setCurrentPos] = useCurrentPos();
  const options = Object.entries(areaName[stage][type])
    .map(([num, name]) => [Number(num), name] as const)
    .filter(
      ([num]) =>
        !(Object.values(map[type]) as (number | { number: number })[]).some((value) =>
          typeof value === 'number' ? value === num : value.number === num,
        ),
    );
  const reset = () => {
    if (type === 'center') {
      setMap({ ...map, [type]: { ...map[type], [pos]: { number: 0, rotation: 0 } } });
    } else {
      setMap({ ...map, [type]: { ...map[type], [pos]: 0 } });
    }
    if (currentPos?.type === type && currentPos?.pos === pos) {
      setCurrentPos(null);
    }
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      container={() => document.body}
      slotProps={{
        paper: {
          style: {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            margin: 'auto',
            maxHeight: 'calc(100vh - 40px)',
          },
        },
      }}
    >
      <DialogTitle>
        {typeTitle[type]}の{posTitle[pos]}は何のエリアかなあ？
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {options.map(([number, name]) => {
          const onClick = () => {
            if (type === 'center') {
              const area = map[type][pos as keyof (typeof map)['center']];
              setMap({ ...map, [type]: { ...map[type], [pos]: { ...area, number } } });
            } else {
              setMap({ ...map, [type]: { ...map[type], [pos]: number } });
            }
            setCurrentPos({ type, pos });
            onClose();
          };
          return (
            <Button key={number} onClick={onClick} variant="outlined">
              {name}
            </Button>
          );
        })}
        {options.length === 0 && <Typography>全部選ばれちゃってた</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={reset}>リセット</Button>
        <Button onClick={onClose}>やめる</Button>
      </DialogActions>
    </Dialog>
  );
};
