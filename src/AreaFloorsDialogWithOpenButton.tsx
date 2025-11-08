import { useState } from 'react';
import { useAreaFloors } from './state/areaFloors';
import { useCurrentPosValue } from './state/currentPos';
import { useMapValue } from './state/map';
import { useStageValue } from './state/stage';
import { areaFloor } from './utils/areaFloor';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

const floorTitle = { '1': '1階', '2': '2階', '3': '3階', '4': '4階', B: '地下1階', B2: '地下2階' };

export const AreaFloorsDialogWithOpenButton = () => {
  const stage = useStageValue();
  const map = useMapValue();
  const { type, pos } = useCurrentPosValue()!;
  const [showingAreaFloors, setShowingAreaFloors] = useAreaFloors();
  const [open, setOpen] = useState(false);
  const number =
    type === 'center'
      ? map[type][pos as keyof (typeof map)['center']].number
      : map[type][pos as keyof (typeof map)[typeof type]];
  const floors = areaFloor[stage][type][number as never] as (keyof typeof floorTitle)[];
  const showingFloors = showingAreaFloors[stage][type][
    number as never
  ] as (keyof typeof floorTitle)[];
  return (
    <>
      <Button variant="outlined" size="large" onClick={() => setOpen(true)}>
        いらん階あるくね？
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>いらん階は消してこうね</DialogTitle>
        <DialogContent>
          <FormGroup row>
            {floors.map((floor) => (
              <FormControlLabel
                key={floor}
                control={
                  <Checkbox
                    checked={showingFloors.includes(floor)}
                    onChange={(e) => {
                      let newShowingFloors = showingFloors.filter((f) => f !== floor);
                      if (e.target.checked) {
                        newShowingFloors = [...newShowingFloors, floor];
                      }
                      setShowingAreaFloors({
                        ...showingAreaFloors,
                        [stage]: {
                          ...showingAreaFloors[stage],
                          [type]: {
                            ...showingAreaFloors[stage][type],
                            [number]: newShowingFloors,
                          },
                        },
                      });
                    }}
                  />
                }
                label={floorTitle[floor]}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>やめる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
