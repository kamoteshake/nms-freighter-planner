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

// room images
const typeImages = Object.freeze({
  [CORRIDOR]: 'img/corridor.png',
  [CROSS_JUNCTION]: 'img/crossJunction.png',
  [CURVED_CORRIDOR]: 'img/curvedCorridor.png',
  [EMPTY]: 'img/emptyRoom.png',
  [FLEET_COMMAND]: 'img/fleetCommand.png',
  [JUNCTION]: 'img/junction.png',
  [LARGE_ROOM]: 'img/largeRoom.png',
  [ORBITAL_EXOCRAFT_MATERIALIZER]: 'img/orbitalExocraftMaterializer.png',
  [STAIRS_DOWN]: 'img/stairsDown.png',
  [STAIRS_UP]: 'img/stairsUp.png',
  [STORAGE_UNIT]: 'img/storageUnit.png'
});