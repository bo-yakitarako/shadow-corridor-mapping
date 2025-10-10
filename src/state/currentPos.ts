import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { stageAtom } from './stage';
import { storage } from '../utils/localStorage';
import type { AreaProps } from '../map/Area';

export const currentPosInternalAtom = atom<AreaProps | null>(
  storage.get(storage.get('stage')).current,
);

const currentPosAtom = atom(
  (get) => get(currentPosInternalAtom),
  (get, set, value: AreaProps | null) => {
    const stage = get(stageAtom);
    storage.set(stage, { ...storage.get(stage), current: value });
    set(currentPosInternalAtom, value);
  },
);

export const useCurrentPos = () => useAtom(currentPosAtom);
export const useCurrentPosValue = () => useAtomValue(currentPosAtom);
export const useSetCurrentPos = () => useSetAtom(currentPosAtom);
