import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

export const mainFloorAtom = atom<'1' | 'B'>('1');

export const useMainFloor = () => useAtom(mainFloorAtom);
export const useMainFloorValue = () => useAtomValue(mainFloorAtom);
export const useSetMainFloor = () => useSetAtom(mainFloorAtom);
