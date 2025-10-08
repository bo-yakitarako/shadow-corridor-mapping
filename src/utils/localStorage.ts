import type { AreaPos } from '../map/Area';

export const map = {
  center: {
    goal: 0,
    northWest: 0,
    north: 0,
    northEast: 0,
    west: 0,
    center: 0,
    east: 0,
    southWest: 0,
    south: 0,
    southEast: 0,
    start: 0,
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

const startFixed = (start: number) => ({ ...map, center: { ...map.center, start } });

type CurrentPos = AreaPos | null;

export const defaultMap = {
  higurashi: { map, current: null as CurrentPos },
  shinen: { map: startFixed(2), current: null as CurrentPos },
  ensou: { map: startFixed(1), current: null as CurrentPos },
  seiiki: { map, current: null as CurrentPos },
  gaien: { map, current: null as CurrentPos },
};
const defaultStorage = {
  stage: 'higurashi' as keyof typeof defaultMap,
  ...defaultMap,
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
