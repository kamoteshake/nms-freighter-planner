// config
const MAX_ROW = 21;
const MAX_COLUMN = 21;
const MAX_FLOOR = 14;
const MAX_STORAGE_UNIT = 10;
const MAX_ORBITAL_EXOCRAFT_MATERIALIZER = 1;

// rooms
const CORRIDOR = 'corridor';
const CROSS_JUNCTION = 'cross_junction';
const CURVED_CORRIDOR = 'curved_corridor';
const EMPTY = 'empty';
const FLEET_COMMAND = 'fleet_command';
const JUNCTION = 'junction';
const LARGE_ROOM = 'large_room';
const ORBITAL_EXOCRAFT_MATERIALIZER = 'orbital_exocraft_materializer';
const STAIRS_DOWN = 'stairs_down';
const STAIRS_UP = 'stairs_up';
const STORAGE_UNIT = 'storage_unit';

// room limits
const ROOM_LIMITS = Object.freeze([
  Object.freeze({
    type: ORBITAL_EXOCRAFT_MATERIALIZER,
    limit: 1
  }),
  Object.freeze({
    type: STORAGE_UNIT,
    limit: 10
  })
]);