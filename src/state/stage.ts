import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { storage } from '../utils/localStorage';
import type { areaName } from '../map/areaName';
import { currentPosInternalAtom } from './currentPos';
import { mapInternalAtom } from './map';

const stageInternalAtom = atom(storage.get('stage'));
export const stageAtom = atom(
  (get) => get(stageInternalAtom),
  // @ts-ignore
  (get, set, value: keyof typeof areaName) => {
    storage.set('stage', value);
    set(stageInternalAtom, value);
    set(currentPosInternalAtom, storage.get(value).current);
    set(mapInternalAtom, storage.get(value).map);
  },
);

export const useStage = () => useAtom(stageAtom);
export const useStageValue = () => useAtomValue(stageAtom);
export const useSetStage = () => useSetAtom(stageAtom);
