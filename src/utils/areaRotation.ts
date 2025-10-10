import type { Pos } from '../map/Area';

type AreaType = keyof Pos;
type AreaPos = Pos[AreaType];

const edgeRotation = {
  north: 0,
  east: 90,
  south: 180,
  west: 270,
};

const cornerRotation = {
  northWest: 0,
  northEast: 90,
  southEast: 180,
  southWest: 270,
};

export const calcRotation = (type: AreaType, pos: AreaPos) => {
  if (type === 'center') {
    return null;
  }
  if (type === 'edge') {
    const direction = getDirection(pos);
    return edgeRotation[direction];
  }
  return cornerRotation[pos as keyof typeof cornerRotation];
};

type Direction = keyof typeof edgeRotation;
const getDirection = (pos: AreaPos): Direction => {
  if (typeof pos !== 'string') return 'north';
  const match = pos.match(/^[a-z]+/);
  return match ? (match[0] as Direction) : 'north';
};
