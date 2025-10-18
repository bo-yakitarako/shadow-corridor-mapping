import type { AreaProps } from '../map/Area';

export const map = {
  center: {
    goal: { number: 0, rotation: 0 },
    northWest: { number: 0, rotation: 0 },
    north: { number: 0, rotation: 0 },
    northEast: { number: 0, rotation: 0 },
    west: { number: 0, rotation: 0 },
    center: { number: 0, rotation: 0 },
    east: { number: 0, rotation: 0 },
    southWest: { number: 0, rotation: 0 },
    south: { number: 0, rotation: 0 },
    southEast: { number: 0, rotation: 0 },
    start: { number: 0, rotation: 0 },
  },
  edge: {
    northNorthWest: 0,
    northNorthEast: 0,
    eastNorthEast: 0,
    east: 0,
    eastSouthEast: 0,
    southSouthEast: 0,
    south: 0,
    southSouthWest: 0,
    westSouthWest: 0,
    west: 0,
    westNorthWest: 0,
  },
  corner: {
    northWest: 0,
    northEast: 0,
    southEast: 0,
    southWest: 0,
  },
};

const startFixed = (number: number) => ({
  ...map,
  center: { ...map.center, start: { number, rotation: 0 } },
});

type CurrentPos = AreaProps | null;

export const defaultMap = {
  higurashi: { map, current: null as CurrentPos },
  shinen: { map: startFixed(2), current: null as CurrentPos },
  ensou: { map: startFixed(1), current: null as CurrentPos },
  seiiki: { map, current: null as CurrentPos },
  gaien: { map, current: null as CurrentPos },
};

type Size = 'small' | 'medium' | 'large';
const defaultSettings = {
  showAreaName: true,
  showAreaOutline: true,
  isGaienUnderground: false,
  mapSize: 'medium' as Size,
  areaDetailSize: 'medium' as Size,
};

const defaultStorage = {
  stage: 'higurashi' as keyof typeof defaultMap,
  ...defaultMap,
  settings: defaultSettings,
};

type StorageProps = typeof defaultStorage;
type StorageKey = keyof StorageProps;

export const storage = {
  get<T extends StorageKey>(key: T): StorageProps[T] {
    const value = localStorage.getItem(key);
    if (value === null) {
      return defaultStorage[key];
    }
    try {
      return JSON.parse(value);
    } catch {
      return value as never as StorageProps[T];
    }
  },
  set<T extends StorageKey>(key: T, value?: StorageProps[T]) {
    if (value === undefined) {
      value = defaultStorage[key];
    }
    const storageValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, storageValue);
  },
  remove<T extends StorageKey>(key: T) {
    localStorage.removeItem(key);
  },
};
