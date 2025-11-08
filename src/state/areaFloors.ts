import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { storage } from '../utils/localStorage';
import type { areaFloor } from '../utils/areaFloor';

const areaFloorsInternalAtom = atom(storage.get('areaFloors'));
const areaFloorsAtom = atom(
  (get) => get(areaFloorsInternalAtom),
  // @ts-ignore
  (get, set, value: typeof areaFloor) => {
    storage.set('areaFloors', value);
    set(areaFloorsInternalAtom, value);
  },
);

export const useAreaFloors = () => useAtom(areaFloorsAtom);
export const useAreaFloorsValue = () => useAtomValue(areaFloorsAtom);
export const useSetAreaFloors = () => useSetAtom(areaFloorsAtom);
