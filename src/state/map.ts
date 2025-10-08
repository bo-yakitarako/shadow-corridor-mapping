import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { stageAtom } from './stage';
import { map, storage } from '../utils/localStorage';

export const mapInternalAtom = atom<typeof map>(storage.get(storage.get('stage')).map);

const mapAtom = atom(
  (get) => get(mapInternalAtom),
  (get, set, value: typeof map) => {
    const stage = get(stageAtom);
    storage.set(stage, { ...storage.get(stage), map: value });
    set(mapInternalAtom, value);
  },
);

export const useMap = () => useAtom(mapAtom);
export const useMapValue = () => useAtomValue(mapAtom);
export const useSetMap = () => useSetAtom(mapAtom);
