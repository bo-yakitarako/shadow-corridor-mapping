import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { storage } from '../utils/localStorage';

const defaultSettings = storage.get('settings');
const settingsInternalAtom = atom(defaultSettings);
const settingsAtom = atom(
  (get) => get(settingsInternalAtom),
  // @ts-ignore
  (get, set, value: typeof defaultSettings) => {
    storage.set('settings', value);
    set(settingsInternalAtom, value);
  },
);

export const useSettings = () => useAtom(settingsAtom);
export const useSettingsValue = () => useAtomValue(settingsAtom);
export const useSetSettings = () => useSetAtom(settingsAtom);
